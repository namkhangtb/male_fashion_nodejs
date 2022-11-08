var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')


let getAllLoaiSanPhams = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from LoaiSanPham"

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Lấy thông tin tất cả loại sản phẩm thành công',
        data: rows.recordset
    })
}


let getOneLoaiSanPham = async (req, res) => {
    var pool = await sql.connect(config);
    var id = req.params.id;
    var sqlString = "select * from LoaiSanPham where IDLoaiSanPham = " + id;

    const rows = await pool.request().query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin một loại sản phẩm thành công',
            data: rows.recordset[0]
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin loại sản phẩm cần lấy',
            data: null
        })
    }
}


let createNewLoaiSanPham = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "insert into LoaiSanPham(Ten, Alias, TrangThai) values(@Ten, @Alias, @TrangThai)"

    const rows = await pool.request()
        .input('Ten', sql.NVarChar, req.body.Ten)
        .input('Alias', sql.NVarChar, req.body.Alias)
        .input('TrangThai', sql.Bit, req.body.TrangThai)
        .query(sqlString)
    return res.status(200).json({
        message: 'Tạo loại sản phẩm thành công'
    })
}


let updateLoaiSanPham = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "UPDATE LoaiSanPham SET Ten = @Ten, Alias = @Alias, TrangThai = @TrangThai WHERE IDLoaiSanPham = @ID";

    const rows = await pool.request()
        .input('Ten', sql.NVarChar, req.body.Ten)
        .input('Alias', sql.NVarChar, req.body.Alias)
        .input('TrangThai', sql.Bit, req.body.TrangThai)
        .input('ID', sql.Int, req.body.ID)
        .query(sqlString)
    return res.status(200).json({
        message: 'Sửa thông tin loại sản phẩm thành công'
    })
}


let deleteLoaiSanPham = async (req, res) => {
    var id = req.params.id;
    var pool = await sql.connect(config);
    var sqlString = "DELETE FROM LoaiSanPham where IDLoaiSanPham = " + id;

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Xóa thông tin loại sản phẩm thành công',
    })
}

module.exports = {
    getAllLoaiSanPhams: getAllLoaiSanPhams,
    getOneLoaiSanPham: getOneLoaiSanPham,
    createNewLoaiSanPham: createNewLoaiSanPham,
    updateLoaiSanPham: updateLoaiSanPham,
    deleteLoaiSanPham: deleteLoaiSanPham,
}