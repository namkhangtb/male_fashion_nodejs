var express = require('express')
var APIUserController = require('../controller/APIUserController.js');
var APILoaiSanPhamController = require('../controller/APILoaiSanPhamController.js');
var ApiChiTietSanPhamController = require('../controller/APIChiTietSanPhamController')


let router = express.Router();
var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8');
const APIChiTietSanPhamController = require('../controller/APIChiTietSanPhamController');


const initAPIRoute = (app) => {
    console.log('initAPIRoute')

    //Nguoi Dung
    router.get('/users', APIUserController.getAllNguoiDungs);
    router.get('/user/:id', APIUserController.getOneNguoiDung);
    router.post('/create-user', APIUserController.createNewNguoiDung);
    router.put('/update-user', APIUserController.updateNguoiDung);
    router.delete('/delete-user/:id', APIUserController.deleteNguoiDung);

    //Loai San Pham
    router.get('/product-type', APILoaiSanPhamController.getAllLoaiSanPhams);
    router.get('/product-type/:id', APILoaiSanPhamController.getOneLoaiSanPham);
    router.post('/create-product-type', APILoaiSanPhamController.createNewLoaiSanPham);
    router.put('/update-product-type', APILoaiSanPhamController.updateLoaiSanPham);
    router.delete('/delete-product-type/:id', APILoaiSanPhamController.deleteLoaiSanPham);

    //Chi Tiet San Pham 
    router.get('/product-details', APIChiTietSanPhamController.getAllChiTietSanPhams);
    router.get('/product-details/:id', APIChiTietSanPhamController.getOneChiTietSanPham);
    router.post('/create-product-details', APIChiTietSanPhamController.createNewChiTietSanPham);
    router.put('/update-product-details', APIChiTietSanPhamController.updateChiTietSanPham);
    router.delete('/delete-product-details/:id', APIChiTietSanPhamController.deleteChiTietSanPham);







    return app.use('/api/v1', router)
}

module.exports = initAPIRoute