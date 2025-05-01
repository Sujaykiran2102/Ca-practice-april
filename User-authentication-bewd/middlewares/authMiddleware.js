const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req,res,next) =>{
    const token = req.cookies.accessToken;
    if(!token){
        return res.status(401).json({message : "No token, authorization denied"});
    }

    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        console.error("Error while verifying",error);
        res.status(403).json({message : "Invalid or expired Token"})
    }
}