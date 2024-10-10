const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

const { users, register, login } = require("../Controller/auth");

router.get("/users", verifyAdmin, users);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
