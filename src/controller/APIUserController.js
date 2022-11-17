var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt');

require('dotenv').config();

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

module.exports = {
    getAllNguoiDungs: getAllNguoiDungs,
    getOneNguoiDung: getOneNguoiDung,
    createNewNguoiDung: createNewNguoiDung,
    updateNguoiDung: updateNguoiDung,
    deleteNguoiDung: deleteNguoiDung,
}