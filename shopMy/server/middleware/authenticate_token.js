const jwt = require("jsonwebtoken");

// 中間件：驗證 Token
exports.authenticate_token = (req, res, next) => {
  const jwt_secret = process.env.JWT_SECRET; // 從環境變數中讀取密鑰

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "未授權" });

  jwt.verify(token, jwt_secret, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        // Token 過期，返回 401 狀態碼和特定訊息
        return res.status(401).json({ message: "Token 已過期" });
      }
      // 其他錯誤處理
      return res.status(403).json({ message: "Token 無效" });
    }
    req.user = user; // 將解碼後的用戶信息存入請求對象
    next();
  });
};
