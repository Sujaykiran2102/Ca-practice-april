const {register, login, refreshToken} = require("../controllers/authController");
const {verifyToken} = require("../middlewares/authMiddleware");
const express = require("express");

const router = express.Router();

router.post("/register",register);
router.post("/login",login);

router.post("/refresh",refreshToken);

router.get("/profile",verifyToken,(req,res)=>{
    res.json({message : `Welcome to your profile, userId : ${req.user}`});
});

// router.post("/logout", (req,res)=>{
//     res.clearCookie("accessToken");
//     res.clearCookie("refreshToken");
//     res.send({message : "Logout Successfull"});
// })

module.exports = router;