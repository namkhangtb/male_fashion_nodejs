var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')

let getAllKichCos = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from KichCo"

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Lấy thông tin tất cả kích cỡ sản phẩm thành công',
        data: rows.recordset
    })
}

let getOneKichCo = async (req, res) => {
    var pool = await sql.connect(config);
    var id = req.params.id;
    var sqlString = "select * from KichCo where ID = " + id;

    const rows = await pool.request().query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin một kích cỡ sản phẩm thành công',
            data: rows.recordset[0]
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin kích cỡ sản phẩm cần lấy',
            data: null
        })
    }
}

let createNewKichCo = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "insert into KichCo(KichCoSP) values(@KichCoSP)"

    const rows = await pool.request()
        .input('KichCoSP', sql.NVarChar, req.body.KichCoSP)
        .query(sqlString)
    return res.status(200).json({
        message: 'Tạo kích cỡ sản phẩm thành công'
    })
}

let updateKichCo = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "UPDATE KichCo SET KichCoSP = @KichCoSP WHERE ID = @ID";

    const rows = await pool.request()
        .input('KichCoSP', sql.NVarChar, req.body.KichCoSP)
        .input('ID', sql.Int, req.body.ID)
        .query(sqlString)
    return res.status(200).json({
        message: 'Sửa thông tin kích cỡ sản phẩm thành công'
    })
}

let deleteKichCo = async (req, res) => {
    var id = req.params.id;
    var pool = await sql.connect(config);
    var sqlString = "DELETE FROM KichCo where ID = " + id;

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Xóa thông tin kích cỡ sản phẩm thành công',
    })
}

module.exports = {
    getAllKichCos: getAllKichCos,
    getOneKichCo: getOneKichCo,
    createNewKichCo: createNewKichCo,
    updateKichCo: updateKichCo,
    deleteKichCo: deleteKichCo

}