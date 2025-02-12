const jwt = require("jsonwebtoken");

// 驗證 Token
exports.authenticate_token = (req, res, next) => {
  // 從環境變數中讀取密鑰
  const jwt_secret = process.env.JWT_SECRET;

  const auth_header = req.headers["authorization"];
  const token = auth_header && auth_header.split(" ")[1];
  if (!token) return res.status(401).json({ message: "token 不存在" });

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) {
      if (err.name === "token_expired") {
        return res.status(401).json({ message: "token 已過期" });
      }
      // 其他
      return res.status(403).json({ message: "token 無效" });
    }
    // 將解碼後的使用者資訊存入請求對象
    req.user = user;
    next();
  });
};
