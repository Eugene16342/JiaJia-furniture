const bcrypt = require("bcrypt");
const { customAlphabet } = require("nanoid");
const jwt = require("jsonwebtoken");
const svgCaptcha = require("svg-captcha");
const db = require("../models");

// 加載 .env 文件中的變量
require("dotenv").config();

// 從環境變數中讀取密鑰
const jwt_secret = process.env.JWT_SECRET;

// 使用大小寫字母和數字 隨機生成10碼作為ID
const nanoid = customAlphabet(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  10
);

// 驗證碼暫存
const captcha_storage = new Map();
const CAPTCHA_EXPIRATION = 300000;
// 驗證碼生成
exports.generate_captcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 4,
    noise: 5,
    color: true,
    background: "#b8b6b4",
    charPreset: "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", // 去掉 I 1 O 0
  });

  const captcha_id = nanoid();
  const captcha_text = captcha.text;

  // 暫存驗證碼及生成時間
  captcha_storage.set(captcha_id, {
    text: captcha_text,
    createdAt: Date.now(),
  });

  res.status(200).json({
    captcha_id,
    captchaData: captcha.data, // SVG 圖片的內容
  });
};

// 檢查驗證碼
function verifyCaptcha(
  captcha_storage,
  captcha_id,
  captcha,
  autoDelete = true
) {
  if (!captcha_id || !captcha) {
    return "請提供驗證碼與驗證碼 ID";
  }

  const stored_captcha = captcha_storage.get(captcha_id);

  if (!stored_captcha) {
    return "驗證碼已過期或不存在";
  }

  const isExpired = Date.now() - stored_captcha.createdAt > CAPTCHA_EXPIRATION;

  if (isExpired) {
    return "驗證碼已過期";
  }

  if (stored_captcha.text.toUpperCase() !== captcha.toUpperCase()) {
    return "驗證碼錯誤";
  }
  // 驗證成功
  if (autoDelete) {
    captcha_storage.delete(captcha_id);
  }

  return null; // 驗證成功
}

// 驗證驗證碼 API
exports.check_captcha = (req, res) => {
  const { captcha_id, captcha } = req.body;

  const error = verifyCaptcha(captcha_storage, captcha_id, captcha, false);
  if (error) {
    return res.status(400).json({ error });
  }

  res.status(200).json({ message: "驗證碼正確" });
};

// 每分鐘清理一次過期的驗證碼
setInterval(() => {
  const now = Date.now();
  captcha_storage.forEach((value, key) => {
    if (now - value.createdAt > CAPTCHA_EXPIRATION) {
      captcha_storage.delete(key);
    }
  });
}, 60000);

// 檢查帳號信箱是否重複
exports.check_isRepeat = async (req, res) => {
  const { user_name, email } = req.query;

  try {
    const results = {};

    if (user_name) {
      const existing_user = await db.users.findOne({
        where: { user_name: user_name.trim().toLowerCase() },
      });
      if (existing_user) {
        results.user_name = "帳號已被註冊";
      }
    }

    if (email) {
      const existing_email = await db.users.findOne({
        where: { email: email.trim().toLowerCase() },
      });
      if (existing_email) {
        results.email = "信箱已被註冊";
      }
    }

    // 無論有無重複都返回 200
    return res.status(200).json({
      status: "success",
      details: results, // 包含是否重複的資訊
    });
  } catch (error) {
    console.error("檢查失敗:", error);
    res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
  }
};

// 註冊功能
exports.register = async (req, res) => {
  const { user_name, email, password, captcha, captcha_id } = req.body;

  // 驗證碼校驗
  const error = verifyCaptcha(captcha_storage, captcha_id, captcha);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const user_id = nanoid();
    const user = await db.users.create({
      user_id,
      user_name,
      email,
      password: hashed_password,
    });

    res.status(201).json({ message: "註冊成功", user });
  } catch (error) {
    console.error("註冊失敗:", error);
    res.status(500).json({ error: "註冊失敗，請稍後再試" });
  }
};

// 登入功能
exports.login = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    // 驗證用戶是否存在
    const user = await db.users.findOne({
      where: { user_name },
    });

    if (!user) {
      return res.status(404).json({ error: "用戶不存在" });
    }

    // 驗證密碼
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "密碼錯誤" });
    }

    // 生成 toekn
    const token = jwt.sign(
      { user_id: user.user_id, user_name: user.user_name },
      jwt_secret,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "登入成功",
      token,
    });
  } catch (error) {
    console.error("登入失敗:", error);
    res.status(500).json({ error: "登入失敗" });
  }
};
