var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')


let getAllHoaDons = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from HoaDon"

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Lấy thông tin tất cả hóa đơn thành công',
        data: rows.recordset
    })
}


let getOneHoaDon = async (req, res) => {
    var pool = await sql.connect(config);
    var id = req.params.id;
    var sqlString = "select * from HoaDon where IDHoaDon = " + id;

    const rows = await pool.request().query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin một hóa đơn thành công',
            data: rows.recordset[0]
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin hóa đơn cần lấy',
            data: null
        })
    }
}


let createNewHoaDon = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "insert into HoaDon(DiaChi, SDT, Gia, UserName, NgayGio, TongGiaNhap) values(@DiaChi, @SDT, @Gia, @UserName, @NgayGio, @TongGiaNhap)"

    const rows = await pool.request()
        .input('DiaChi', sql.NVarChar, req.body.DiaChi)
        .input('SDT', sql.NVarChar, req.body.SDT)
        .input('Gia', sql.Decimal, req.body.Gia)
        .input('UserName', sql.NVarChar, req.body.UserName)
        .input('NgayGio', sql.DateTime, req.body.NgayGio)
        .input('TongGiaNhap', sql.Decimal, req.body.TongGiaNhap)
        .query(sqlString)

    const timetemp = req.body.NgayGio;
    var sqlString1 = "select top 1 * from HoaDon where NgayGio = @NgayGio order by IDHoaDon desc";
    const rows1 = await pool.request()
        .input('NgayGio', sql.DateTime, timetemp)
        .query(sqlString1)

    return res.status(200).json({
        message: 'Tạo hóa đơn thành công',
        data: rows1.recordset[0]
    })

}


let updateHoaDon = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "UPDATE HoaDon SET DiaChi = @DiaChi, SDT = @SDT, Gia = @Gia, UserName = @UserName, NgayGio = @NgayGio, TongGiaNhap = @TongGiaNhap WHERE IDHoaDon = @IDHoaDon";

    const rows = await pool.request()
        .input('DiaChi', sql.NVarChar, req.body.DiaChi)
        .input('SDT', sql.NVarChar, req.body.SDT)
        .input('Gia', sql.Decimal, req.body.Gia)
        .input('UserName', sql.NVarChar, req.body.UserName)
        .input('NgayGio', sql.DateTime, req.body.NgayGio)
        .input('TongGiaNhap', sql.Decimal, req.body.TongGiaNhap)
        .input('IDHoaDon', sql.Int, req.body.IDHoaDon)
        .query(sqlString)
    return res.status(200).json({
        message: 'Sửa hóa đơn thành công'
    })

}


let deleteHoaDon = async (req, res) => {
    var id = req.params.id;
    var pool = await sql.connect(config);
    var sqlString = "DELETE FROM HoaDon where IDHoaDon = " + id;

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Xóa thông tin hóa đơn thành công',
    })
}

let getYearInTableHoaDon = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select distinct YEAR(NgayGio) as Year from HoaDon ";

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Lấy thông tin tất cả các năm có trong hóa đơn thành công',
        data: rows.recordset
    })
}


module.exports = {
    getAllHoaDons: getAllHoaDons,
    getOneHoaDon: getOneHoaDon,
    createNewHoaDon: createNewHoaDon,
    updateHoaDon: updateHoaDon,
    deleteHoaDon: deleteHoaDon,
    getYearInTableHoaDon: getYearInTableHoaDon,
}