var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')


let getAllSanPhams = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from SanPham"

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Lấy thông tin tất cả sản phẩm thành công',
        data: rows.recordset
    })
}


let getOneSanPham = async (req, res) => {
    var pool = await sql.connect(config);
    var id = req.params.id;
    var sqlString = "select * from SanPham where IDSanPham  = " + id;

    const rows = await pool.request().query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin một sản phẩm thành công',
            data: rows.recordset[0]
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin sản phẩm cần lấy',
            data: null
        })
    }
}


let createNewSanPham = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "insert into SanPham(Ten, IDLoaiSanPham, Images, Gia, Mota, Rating ,GiaNhap) values(@Ten, @IDLoaiSanPham, @Images, @Gia, @Mota, @Rating, @GiaNhap)"

    const rows = await pool.request()
        .input('Ten', sql.NVarChar, req.body.Ten)
        .input('IDLoaiSanPham', sql.Int, req.body.IDLoaiSanPham)
        .input('Images', sql.NVarChar, req.body.Images)
        .input('Gia', sql.Decimal, req.body.Gia)
        .input('Mota', sql.NVarChar, req.body.Mota)
        .input('Rating', sql.Int, req.body.Rating)
        .input('GiaNhap', sql.Decimal, req.body.GiaNhap)
        .query(sqlString)
    return res.status(200).json({
        message: 'Tạo sản phẩm thành công'
    })
}


let updateSanPham = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "UPDATE SanPham SET Ten = @Ten, IDLoaiSanPham = @IDLoaiSanPham, Images = @Images, Gia = @Gia, Mota = @Mota, Rating = @Rating, GiaNhap = @GiaNhap WHERE IDSanPham = @IDSanPham";

    const rows = await pool.request()
        .input('Ten', sql.NVarChar, req.body.Ten)
        .input('IDLoaiSanPham', sql.Int, req.body.IDLoaiSanPham)
        .input('Images', sql.NVarChar, req.body.Images)
        .input('Gia', sql.Decimal, req.body.Gia)
        .input('Mota', sql.NVarChar, req.body.Mota)
        .input('Rating', sql.Int, req.body.Rating)
        .input('GiaNhap', sql.Decimal, req.body.GiaNhap)
        .input('IDSanPham', sql.Int, req.body.IDSanPham)
        .query(sqlString)
    return res.status(200).json({
        message: 'Sửa sản phẩm thành công'
    })

}


let deleteSanPham = async (req, res) => {
    var id = req.params.id;
    var pool = await sql.connect(config);
    var sqlString = "DELETE FROM SanPham where IDSanPham = " + id;

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Xóa thông tin sản phẩm thành công',
    })
}


module.exports = {
    getAllSanPhams: getAllSanPhams,
    getOneSanPham: getOneSanPham,
    createNewSanPham: createNewSanPham,
    updateSanPham: updateSanPham,
    deleteSanPham: deleteSanPham,
}