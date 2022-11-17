var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt');
var hashPassword = require('../utils/hashPassword');
const { sign, decode } = require('../utils/jwt')
const jwt = require('jsonwebtoken')


let generateToken = payload => {
    const { UserName } = payload
    const accessToken = jwt.sign({ UserName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
    const refreshToken = jwt.sign({ UserName }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1h' })

    return { accessToken, refreshToken }
    //return { accessToken }
}

let updateRefreshToken = async (username, refreshToken) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from NguoiDung where  UserName = @UserName ";
    const dataUser = await pool.request()
        .input('UserName', sql.NVarChar, username)
        .query(sqlString)

    if (!dataUser.recordset[0]) return username
    else {
        var sqlString1 = "update NguoiDung set RefreshToken = @RefreshToken where  UserName = @UserName";
        const dataUserUpdated = await pool.request()
            .input('UserName', sql.NVarChar, username)
            .input('RefreshToken', sql.NVarChar, refreshToken)
            .query(sqlString1)
        return { username, refreshToken }
    }

}

let remakeAccessToken = async (req, res) => {
    const refreshToken = req.body.RefreshToken
    if (!refreshToken) return res.status(401).json({ message: "không có refreshToken" })

    var pool = await sql.connect(config);
    var sqlString = "select * from NguoiDung where  RefreshToken = @RefreshToken ";
    const dataUser = await pool.request()
        .input('RefreshToken', sql.NVarChar, refreshToken)
        .query(sqlString)
    console.log(dataUser)

    const checkUser = dataUser.recordset[0]
    if (!checkUser) return res.status(403).json({ message: "không tồn tại user có refreshToken cần tìm" })
    else {
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

            const tokens = generateToken(dataUser.recordset[0])
            console.log(tokens)
            const username = dataUser.recordset[0].UserName;
            console.log(username)
            updateRefreshToken(username, tokens.refreshToken)

            return res.status(200).json({ message: "tạo lại Token mới thành công", newToken: tokens })
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: error })
        }
    }
}

let signin = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from NguoiDung where  UserName = @UserName";

    if (!req.body.PassWord && !req.body.UserName) return res.status(401).json({ message: 'Yêu cầu nhập tài khoản và mật khẩu' })
    if (!req.body.UserName) return res.status(401).json({ message: 'Yêu cầu nhập tài khoản' })
    if (!req.body.PassWord) return res.status(401).json({ message: 'Yêu cầu nhập mật khẩu' })

    const rows = await pool.request()
        .input('UserName', sql.NVarChar, req.body.UserName)
        .query(sqlString)

    const dataUser = rows.recordset[0]
    if (dataUser == null) {
        return res.status(401).json({ message: 'Không tồn tại tài khoản' })
    }
    else {
        const passwordMatch = await hashPassword.matchPassword(rows.recordset[0].PassWord, req.body.PassWord);
        if (!passwordMatch) return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' })
        else {
            const tokens = generateToken(dataUser)
            const username = req.body.UserName
            updateRefreshToken(username, tokens.refreshToken)

            return res.status(200).json({ message: 'Đăng nhập thành công', data: rows.recordset, token: tokens })
        }
    }

}

let signup = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from NguoiDung where  UserName = @UserName";

    if (!req.body.PassWord || !req.body.UserName || !req.body.Email) return res.status(401).json({ message: 'Yêu cầu nhập đủ các trường dữ liệu' })

    const rows = await pool.request()
        .input('UserName', sql.NVarChar, req.body.UserName)
        .query(sqlString)
    const data = rows.recordset[0]
    console.log(rows)
    if (data != null) {
        return res.status(401).json({ message: 'Tài khoản đã tồn tại' })
    }
    else {
        var sqlString1 = "insert into NguoiDung(UserName, PassWord, Email) values(@UserName, @PassWord, @Email)"

        //hash Password
        let salt = bcrypt.genSaltSync(10)
        const hashPass = bcrypt.hashSync(req.body.PassWord, salt);

        const rows1 = await pool.request()
            .input('UserName', sql.NVarChar, req.body.UserName)
            .input('PassWord', sql.NVarChar, hashPass)
            .input('Email', sql.NVarChar, req.body.Email)
            .query(sqlString1)
        return res.status(200).json({
            message: 'Đăng ký thành công',
        })
    }

}

let logout = async (req, res) => {
    var pool = await sql.connect(config);

    const username = req.UserName;
    console.log("username logout:" + username)

    var sqlString = "select * from NguoiDung where  UserName = @UserName";
    const rows = await pool.request()
        .input('UserName', username)
        .query(sqlString)

    updateRefreshToken(username, null)

    return res.status(200).json({ message: "logout thành công" })
}


module.exports = {
    signin: signin,
    signup: signup,
    remakeAccessToken: remakeAccessToken,
    logout: logout,
} 