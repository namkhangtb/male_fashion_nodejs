const jwt = require('jsonwebtoken')
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ message: "không có token" })

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.UserName = decoded.UserName
        console.log("decoded username: " + decoded.UserName)
        console.log("req user: " + req.UserName)
        next()
    } catch (error) {
        console.log(error)
        return res.status(403).json({ message: "lỗi" })
    }
}

module.exports = verifyToken