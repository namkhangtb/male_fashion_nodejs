var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')


let getAllLienHes = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from LienHe"

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Lấy thông tin tất cả liên hệ thành công',
        data: rows.recordset
    })
}


let getOneLienHe = async (req, res) => {
    var pool = await sql.connect(config);
    var id = req.params.id;
    var sqlString = "select * from LienHe where ID = " + id;

    const rows = await pool.request().query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin một liên hệ thành công',
            data: rows.recordset[0]
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin liên hệ cần lấy',
            data: null
        })
    }
}


let createNewLienHe = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "insert into LienHe(Name, Email, Mess) values(@Name, @Email, @Mess)"

    const rows = await pool.request()
        .input('Name', sql.NVarChar, req.body.Name)
        .input('Email', sql.NVarChar, req.body.Email)
        .input('Mess', sql.NVarChar, req.body.Mess)
        .query(sqlString)
    return res.status(200).json({
        message: 'Tạo liên hệ thành công'
    })
}



let updateLienHe = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "UPDATE LienHe SET Name = @Name, Email = @Email, Mess = @Mess WHERE ID = @ID";

    const rows = await pool.request()
        .input('Name', sql.NVarChar, req.body.Name)
        .input('Email', sql.NVarChar, req.body.Email)
        .input('Mess', sql.NVarChar, req.body.Mess)
        .input('ID', sql.Int, req.body.ID)
        .query(sqlString)
    return res.status(200).json({
        message: 'Sửa liên hệ thành công'
    })

}


let deleteLienHe = async (req, res) => {
    var id = req.params.id;
    var pool = await sql.connect(config);
    var sqlString = "DELETE FROM LienHe where ID = " + id;

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Xóa thông tin liên hệ thành công',
    })
}


module.exports = {
    getAllLienHes: getAllLienHes,
    getOneLienHe: getOneLienHe,
    createNewLienHe: createNewLienHe,
    updateLienHe: updateLienHe,
    deleteLienHe: deleteLienHe,
}