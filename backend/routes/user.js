const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");

// API to get user data (uses token from cookie)
router.get("/me", verifyToken, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;