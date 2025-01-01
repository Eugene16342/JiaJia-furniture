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

// 驗證碼生成
exports.generate_captcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 4,
    noise: 2,
    color: true,
    background: "#b8b6b4",
    charPreset: "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", // 去掉易混淆的字符
  });

  if (!req.session) {
    return res.status(500).json({ error: "Session 未正確配置" });
  }

  req.session.captcha = captcha.text; // 儲存到 session
  res.type("svg").status(200).send(captcha.data); // 返回 SVG
};

// 驗證驗證碼
exports.check_captcha = async (req, res) => {
  const { captcha } = req.body;

  if (!captcha || captcha.toUpperCase() !== req.session.captcha.toUpperCase()) {
    return res.status(400).json({ error: "驗證碼錯誤" });
  }

  res.status(200).json({ message: "驗證碼正確" });
};

// 檢查帳號信箱是否重複
exports.check_isRepeat = async (req, res) => {
  const { user_name, email } = req.query;

  try {
    const results = {};

    if (user_name) {
      const existingUser = await db.users.findOne({
        where: { user_name: user_name.trim() },
      });
      if (existingUser) {
        results.user_name = "帳號已被註冊";
      }
    }

    if (email) {
      const existingEmail = await db.users.findOne({
        where: { email: email.trim() },
      });
      if (existingEmail) {
        results.email = "信箱已被註冊";
      }
    }

    if (Object.keys(results).length > 0) {
      return res.status(400).json(results);
    }

    res.status(200).json({ message: "可用" });
  } catch (error) {
    console.error("檢查失敗:", error);
    res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
  }
};

// 註冊功能
exports.register = async (req, res) => {
  const { user_name, email, password, captcha } = req.body;

  // 驗證碼校驗
  if (captcha.toUpperCase() !== req.session.captcha.toUpperCase()) {
    return res.status(400).json({ error: "驗證碼錯誤" });
  }

  // 清除驗證碼，避免重複使用
  req.session.captcha = null;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user_id = nanoid();
    const user = await db.users.create({
      user_id,
      user_name,
      email,
      password: hashedPassword,
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

    // 生成 JWT
    const token = jwt.sign(
      { user_id: user.user_id, user_name: user.user_name }, // payload
      jwt_secret, // 密鑰
      { expiresIn: "24h" } // Token 有效期
    );

    res.status(200).json({
      message: "登入成功",
      token, // 返回 JWT 給用戶
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("登入失敗:", error);
    res.status(500).json({ error: "登入失敗" });
  }
};
