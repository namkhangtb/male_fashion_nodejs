var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt');
var hashPassword = require('../utils/hashPassword');
const e = require('express');
let getAllNguoiDungs = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from NguoiDung"

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Lấy thông tin tất cả người dùng thành công',
        data: rows.recordset
    })
}

let getOneNguoiDung = async (req, res) => {
    var pool = await sql.connect(config);
    var id = req.params.id;
    var sqlString = "select * from NguoiDung where ID = " + id;

    const rows = await pool.request().query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin một người dùng thành công',
            data: rows.recordset[0]
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin người dùng cần lấy',
            data: null
        })
    }
}

let createNewNguoiDung = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "insert into NguoiDung(UserName, PassWord, Email, Phone, DiaChi, Image) values(@UserName, @PassWord, @Email, @Phone, @DiaChi, @Image)"

    let salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(req.body.PassWord, salt);

    const rows = await pool.request()
        .input('UserName', sql.NVarChar, req.body.UserName)
        .input('PassWord', sql.NVarChar, hashPass)
        .input('Email', sql.NVarChar, req.body.Email)
        .input('Phone', sql.NVarChar, req.body.Phone)
        .input('DiaChi', sql.NVarChar, req.body.DiaChi)
        .input('Image', sql.NVarChar, req.body.Image)
        .query(sqlString)
    return res.status(200).json({
        message: 'Tạo một người dùng thành công',
    })
}

let updateNguoiDung = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "UPDATE NguoiDung SET UserName = @UserName, PassWord = @PassWord, Email = @Email, Phone = @Phone, DiaChi = @DiaChi, Image = @Image WHERE ID = @ID";

    let salt = bcrypt.genSaltSync(10)
    const hashPass = bcrypt.hashSync(req.body.PassWord, salt);

    const rows = await pool.request()
        .input('UserName', sql.NVarChar, req.body.UserName)
        .input('PassWord', sql.NVarChar, hashPass)
        .input('Email', sql.NVarChar, req.body.Email)
        .input('Phone', sql.NVarChar, req.body.Phone)
        .input('DiaChi', sql.NVarChar, req.body.DiaChi)
        .input('Image', sql.NVarChar, req.body.Image)
        .input('ID', sql.Int, req.body.ID)
        .query(sqlString)
    return res.status(200).json({
        message: 'Sửa thông tin người dùng thành công',
    })
}

let deleteNguoiDung = async (req, res) => {
    var id = req.params.id;
    var pool = await sql.connect(config);
    var sqlString = "DELETE FROM NguoiDung where ID = " + id;

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Xóa thông tin người dùng thành công',
    })

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

    const data = rows.recordset[0]
    console.log(rows)
    if (data == null) {
        return res.status(401).json({ message: 'Không tồn tại tài khoản' })
    }
    else {
        const passwordMatch = await hashPassword.matchPassword(rows.recordset[0].PassWord, req.body.PassWord);
        if (!passwordMatch) return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' })
        else return res.status(200).json({ message: 'Đăng nhập thành công' })
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

module.exports = {
    getAllNguoiDungs: getAllNguoiDungs,
    getOneNguoiDung: getOneNguoiDung,
    createNewNguoiDung: createNewNguoiDung,
    updateNguoiDung: updateNguoiDung,
    deleteNguoiDung: deleteNguoiDung,
    signin: signin,
    signup: signup,
}