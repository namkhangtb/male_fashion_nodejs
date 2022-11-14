var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')


let getAllChiTietSanPhams = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from ChiTietSanPham"

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Lấy thông tin tất cả chi tiết sản phẩm thành công',
        data: rows.recordset
    })
}


let getOneChiTietSanPham = async (req, res) => {
    var pool = await sql.connect(config);
    var id = req.params.id;
    var sqlString = "select * from ChiTietSanPham where ID = " + id;

    const rows = await pool.request().query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin một chi tiết sản phẩm thành công',
            data: rows.recordset[0]
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin chi tiết sản phẩm cần lấy',
            data: null
        })
    }
}


let createNewChiTietSanPham = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "insert into ChiTietSanPham(IDSanPham, Ten, IDLoaiSanPham, Images, Gia, Mota, MauSacSP, KichCoSP, SoLuong, LuotXem, GiaNhap) values(@IDSanPham, @Ten, @IDLoaiSanPham, @Images, @Gia, @Mota, @MauSacSP, @KichCoSP, @SoLuong, @LuotXem, @GiaNhap)"

    const rows = await pool.request()
        .input('IDSanPham', sql.Int, req.body.IDSanPham)
        .input('Ten', sql.NVarChar, req.body.Ten)
        .input('IDLoaiSanPham', sql.Int, req.body.IDLoaiSanPham)
        .input('Images', sql.NVarChar, req.body.Images)
        .input('Gia', sql.Decimal, req.body.Gia)
        .input('Mota', sql.NVarChar, req.body.Mota)
        .input('MauSacSP', sql.NVarChar, req.body.MauSacSP)
        .input('KichCoSP', sql.NVarChar, req.body.KichCoSP)
        .input('SoLuong', sql.Int, req.body.SoLuong)
        .input('LuotXem', sql.Int, req.body.LuotXem)
        .input('GiaNhap', sql.Decimal, req.body.GiaNhap)
        .query(sqlString)
    return res.status(200).json({
        message: 'Tạo chi tiết sản phẩm thành công'
    })
}


let updateChiTietSanPham = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "UPDATE ChiTietSanPham SET IDSanPham = @IDSanPham, Ten = @Ten, IDLoaiSanPham = @IDLoaiSanPham, Images = @Images, Gia = @Gia,"
        + "Mota = @Mota, MauSacSP = @MauSacSP, KichCoSP = @KichCoSP, SoLuong = @SoLuong, LuotXem = @LuotXem, GiaNhap = @GiaNhap WHERE ID = @ID";

    const rows = await pool.request()
        .input('IDSanPham', sql.Int, req.body.IDSanPham)
        .input('Ten', sql.NVarChar, req.body.Ten)
        .input('IDLoaiSanPham', sql.Int, req.body.IDLoaiSanPham)
        .input('Images', sql.NVarChar, req.body.Images)
        .input('Gia', sql.Decimal, req.body.Gia)
        .input('Mota', sql.NVarChar, req.body.Mota)
        .input('MauSacSP', sql.NVarChar, req.body.MauSacSP)
        .input('KichCoSP', sql.NVarChar, req.body.KichCoSP)
        .input('SoLuong', sql.Int, req.body.SoLuong)
        .input('LuotXem', sql.Int, req.body.LuotXem)
        .input('GiaNhap', sql.Decimal, req.body.GiaNhap)
        .input('ID', sql.Int, req.body.ID)
        .query(sqlString)
    return res.status(200).json({
        message: 'Sửa chi tiết sản phẩm thành công'
    })

}


let deleteChiTietSanPham = async (req, res) => {
    var id = req.params.id;
    var pool = await sql.connect(config);
    var sqlString = "DELETE FROM ChiTietSanPham where ID = " + id;

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Xóa thông tin chi tiết sản phẩm thành công',
    })
}

let getMauSacByKichCo = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select MauSacSP from ChiTietSanPham where KichCoSP = @KichCoSP";

    const rows = await pool.request()
        .input('KichCoSP', sql.NVarChar, req.body.KichCoSP)
        .query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin danh sách màu sắc thành công',
            data: rows.recordset
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin danh sách màu sắc cần lấy',
            data: null
        })
    }
}

let getChiTietSanPhamByConditionID_MS_KC_SL = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from ChiTietSanPham where IDSanPham = @IDSanPham  and KichCoSP = @KichCoSP and MauSacSP = @MauSacSP and SoLuong > 0 ";

    const rows = await pool.request()
        .input('IDSanPham', sql.Int, req.body.IDSanPham)
        .input('KichCoSP', sql.NVarChar, req.body.KichCoSP)
        .input('MauSacSP', sql.NVarChar, req.body.MauSacSP)
        .query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin chi tiết sản phẩm đạt đủ điều kiện thành công',
            data: rows.recordset[0]
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin chi tiết sản phẩm đạt đủ điều kiện cần lấy',
            data: null
        })
    }
}

let getChiTietSanPhamByIDSanPham = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from ChiTietSanPham where IDSanPham = @IDSanPham";

    const rows = await pool.request()
        .input('IDSanPham', sql.Int, req.body.IDSanPham)
        .query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin chi tiết sản phẩm đạt đủ điều kiện thành công',
            data: rows.recordset
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin chi tiết sản phẩm đạt đủ điều kiện cần lấy',
            data: null
        })
    }
}

module.exports = {
    getAllChiTietSanPhams: getAllChiTietSanPhams,
    getOneChiTietSanPham: getOneChiTietSanPham,
    createNewChiTietSanPham: createNewChiTietSanPham,
    updateChiTietSanPham: updateChiTietSanPham,
    deleteChiTietSanPham: deleteChiTietSanPham,
    getMauSacByKichCo: getMauSacByKichCo,
    getChiTietSanPhamByConditionID_MS_KC_SL: getChiTietSanPhamByConditionID_MS_KC_SL,
    getChiTietSanPhamByIDSanPham: getChiTietSanPhamByIDSanPham,
}