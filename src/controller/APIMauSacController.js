var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')

let getAllMauSacs = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from MauSac"

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Lấy thông tin tất cả màu sắc sản phẩm thành công',
        data: rows.recordset
    })
}

let getOneMauSac = async (req, res) => {
    var pool = await sql.connect(config);
    var id = req.params.id;
    var sqlString = "select * from MauSac where ID = " + id;

    const rows = await pool.request().query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin một màu sắc sản phẩm thành công',
            data: rows.recordset[0]
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin màu sắc sản phẩm cần lấy',
            data: null
        })
    }
}

let createNewMauSac = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "insert into MauSac(MauSacSP) values(@MauSacSP)"

    const rows = await pool.request()
        .input('MauSacSP', sql.NVarChar, req.body.MauSacSP)
        .query(sqlString)
    return res.status(200).json({
        message: 'Tạo màu sắc sản phẩm thành công'
    })
}

let updateMauSac = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "UPDATE MauSac SET MauSacSP = @MauSacSP WHERE ID = @ID";

    const rows = await pool.request()
        .input('MauSacSP', sql.NVarChar, req.body.MauSacSP)
        .input('ID', sql.Int, req.body.ID)
        .query(sqlString)
    return res.status(200).json({
        message: 'Sửa thông tin màu sắc sản phẩm thành công'
    })
}

let deleteMauSac = async (req, res) => {
    var id = req.params.id;
    var pool = await sql.connect(config);
    var sqlString = "DELETE FROM MauSac where ID = " + id;

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Xóa thông tin màu sắc sản phẩm thành công',
    })
}

module.exports = {
    getAllMauSacs: getAllMauSacs,
    getOneMauSac: getOneMauSac,
    createNewMauSac: createNewMauSac,
    updateMauSac: updateMauSac,
    deleteMauSac: deleteMauSac

}