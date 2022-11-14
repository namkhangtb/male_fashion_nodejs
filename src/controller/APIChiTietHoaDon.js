var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')


let getAllChiTietHoaDons = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from ChiTietHoaDon"

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Lấy thông tin tất cả chi tiết hóa đơn thành công',
        data: rows.recordset
    })
}


let getOneChiTietHoaDon = async (req, res) => {
    var pool = await sql.connect(config);
    var id = req.params.id;
    var sqlString = "select * from ChiTietHoaDon where ID = " + id;

    const rows = await pool.request().query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin một chi tiết hóa đơn thành công',
            data: rows.recordset[0]
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin chi tiết hóa đơn cần lấy',
            data: null
        })
    }
}


let createNewChiTietHoaDon = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "insert into ChiTietHoaDon(Images, Gia, MauSacSP, KichCoSP, IDHoaDon, Soluong) values(@Images, @Gia, @MauSacSP, @KichCoSP, @IDHoaDon, @Soluong)"

    const rows = await pool.request()
        .input('Images', sql.NVarChar, req.body.Images)
        .input('Gia', sql.Decimal, req.body.Gia)
        .input('MauSacSP', sql.NVarChar, req.body.MauSacSP)
        .input('KichCoSP', sql.NVarChar, req.body.KichCoSP)
        .input('IDHoaDon', sql.Int, req.body.IDHoaDon)
        .input('Soluong', sql.Int, req.body.Soluong)
        .query(sqlString)
    return res.status(200).json({
        message: 'Tạo chi tiết hóa đơn thành công'
    })
}


let updateChiTietHoaDon = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "UPDATE ChiTietHoaDon SET Images = @Images, Gia = @Gia, MauSacSP = @MauSacSP, KichCoSP = @KichCoSP, IDHoaDon = @IDHoaDon, Soluong = @Soluong WHERE ID = @ID";

    const rows = await pool.request()
        .input('Images', sql.NVarChar, req.body.Images)
        .input('Gia', sql.Decimal, req.body.Gia)
        .input('MauSacSP', sql.NVarChar, req.body.MauSacSP)
        .input('KichCoSP', sql.NVarChar, req.body.KichCoSP)
        .input('IDHoaDon', sql.Int, req.body.IDHoaDon)
        .input('Soluong', sql.Int, req.body.Soluong)
        .input('ID', sql.Int, req.body.ID)
        .query(sqlString)
    return res.status(200).json({
        message: 'Sửa chi tiết hóa đơn thành công'
    })

}


let deleteChiTietHoaDon = async (req, res) => {
    var id = req.params.id;
    var pool = await sql.connect(config);
    var sqlString = "DELETE FROM ChiTietHoaDon where ID = " + id;

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Xóa thông tin chi tiết hóa đơn thành công',
    })
}

let getListChiTietHoaDonByIDHoaDon = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from ChiTietHoaDon where IDHoaDon = @IDHoaDon";

    const rows = await pool.request()
        .input('IDHoaDon', sql.NVarChar, req.body.IDHoaDon)
        .query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin danh sách chi tiết hóa đơn thành công',
            data: rows.recordset
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin danh sách chi tiết hóa đơn cần lấy',
            data: null
        })
    }
}


module.exports = {
    getAllChiTietHoaDons: getAllChiTietHoaDons,
    getOneChiTietHoaDon: getOneChiTietHoaDon,
    createNewChiTietHoaDon: createNewChiTietHoaDon,
    updateChiTietHoaDon: updateChiTietHoaDon,
    deleteChiTietHoaDon: deleteChiTietHoaDon,
    getListChiTietHoaDonByIDHoaDon: getListChiTietHoaDonByIDHoaDon,
}