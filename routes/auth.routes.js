const { Router, request } = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/Users");
const router = Router();

// /api/auth
router.post(
  "/register",
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоректные данные при регистрации",
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email: email });
      if (candidate) {
        return res.status(400).json({ message: "Пользователь существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "Пользователь создан" });
    } catch {
      res.status(500).json({ message: "Error Server" });
    }
  }
);

// /api/login
router.post(
  "/login",
  [
    check("email", "Введите коректный меил").isEmail(),
    check("password", "некоректный пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоректные данные при входе в систему",
        });
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Пользователь ненайден" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });

      res.json({ token, userId: user.id });
    } catch {
      res.status(500).json({ message: "Error Server" });
    }
  }
);

module.exports = router;
