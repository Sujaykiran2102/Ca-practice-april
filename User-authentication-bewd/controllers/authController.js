const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const generateAccessToken = (userId) =>{
    return jwt.sign(userId, JWT_SECRET, {expiresIn : "15m"});
}

const generateRefreshToken = (userId) =>{
    return jwt.sign(userId, JWT_REFRESH_SECRET, {expiresIn : "7d"});
}

exports.register = async (req,res) =>{
    try {
        const { email, password} = req.body;

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message : "User already exists"});
        }
        user = await User.create({ email, password});
        res.send({message : "Registration successfull"})
    } catch (error) {
        console.error("Registration failed",error)
        res.status(500).json({message : "Registration failed", error : error.message});
    }
}

exports.login = async (req,res) =>{
    try {
        const  { email, password} = req.body;

        const user = await User.findOne({email});
        if(!user || !user.matchPassword(password)){
            return res.status(400).json({message : "Invalid email or password"});
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        res.cookie("accessToken",accessToken,{
            httpOnly : true,
            maxAge : 1000 * 60 * 15
        });
        res.cookie("refreshToken",refreshToken,{
            httpOnly : true,
            maxAge : 1000 * 60 * 60 * 24 * 7
        });

        res.json({message : "Login successfull"})
    } catch (error) {
        console.error("Login failed",error);
        res.status(500).json({ message : "Login failed", error : error.message });
    }
}

exports.refreshToken = async(req,res) =>{
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken){
        return res.status(401).json({message : "No refresh token provided"});
    }
    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const newAccessToken = generateAccessToken(decoded._id);

        res.cookie("accessToken",newAccessToken,{
            httpOnly : true,
            maxAge : 1000 * 60 * 15
        });
        res.send({message : "Access Token refreshed"});
    } catch (error) {
        console.error("Error refreshing token",error);
        res.status(403).json({message : "Invalid or expired token"});
    }
}