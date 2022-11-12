var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')


let getAllTinTucs = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "select * from TinTuc"

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Lấy thông tin tất cả tin tức thành công',
        data: rows.recordset
    })
}


let getOneTinTuc = async (req, res) => {
    var pool = await sql.connect(config);
    var id = req.params.id;
    var sqlString = "select * from TinTuc where ID = " + id;

    const rows = await pool.request().query(sqlString)
    if (rows.recordset.length > 0) {
        return res.status(200).json({
            massage: 'Lấy thông tin một tin tức thành công',
            data: rows.recordset[0]
        })
    }
    else {
        return res.status(200).json({
            massage: 'Không có thông tin tin tức cần lấy',
            data: null
        })
    }
}


let createNewTinTuc = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "insert into TinTuc(Image, CreatedDate, TieuDe, NoiDung) values(@Image, @CreatedDate, @TieuDe, @NoiDung)"

    const rows = await pool.request()
        .input('Image', sql.NVarChar, req.body.Image)
        .input('CreatedDate', sql.DateTime, req.body.CreatedDate)
        .input('TieuDe', sql.NVarChar, req.body.TieuDe)
        .input('NoiDung', sql.NVarChar, req.body.NoiDung)
        .query(sqlString)
    return res.status(200).json({
        message: 'Tạo tin tức thành công'
    })
}



let updateTinTuc = async (req, res) => {
    var pool = await sql.connect(config);
    var sqlString = "UPDATE TinTuc SET Image = @Image, CreatedDate = @CreatedDate, TieuDe = @TieuDe, NoiDung = @NoiDung WHERE ID = @ID";

    const rows = await pool.request()
        .input('Image', sql.NVarChar, req.body.Image)
        .input('CreatedDate', sql.DateTime, req.body.CreatedDate)
        .input('TieuDe', sql.NVarChar, req.body.TieuDe)
        .input('NoiDung', sql.NVarChar, req.body.NoiDung)
        .input('ID', sql.Int, req.body.ID)
        .query(sqlString)
    return res.status(200).json({
        message: 'Sửa tin tức thành công'
    })

}


let deleteTinTuc = async (req, res) => {
    var id = req.params.id;
    var pool = await sql.connect(config);
    var sqlString = "DELETE FROM TinTuc where ID = " + id;

    const rows = await pool.request().query(sqlString)
    return res.status(200).json({
        massage: 'Xóa thông tin tin tức thành công',
    })
}


module.exports = {
    getAllTinTucs: getAllTinTucs,
    getOneTinTuc: getOneTinTuc,
    createNewTinTuc: createNewTinTuc,
    updateTinTuc: updateTinTuc,
    deleteTinTuc: deleteTinTuc,
}