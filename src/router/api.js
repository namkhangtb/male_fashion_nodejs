var express = require('express')
var APIUserController = require('../controller/APIUserController');
var APILoaiSanPhamController = require('../controller/APILoaiSanPhamController');
var APIChiTietSanPhamController = require('../controller/APIChiTietSanPhamController')
var APIMauSacController = require('../controller/APIMauSacController')
var APIKichCoController = require('../controller/APIKichCoController')
var APIHoaDonController = require('../controller/APIHoaDonController')
var APIChiTietHoaDonController = require('../controller/APIChiTietHoaDon')
var APITinTucController = require('../controller/APITinTucController')
var APILienHeController = require('../controller/APILienHeController')
var APISanPhamController = require('../controller/APISanPhamController')

let router = express.Router();
var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8');



const initAPIRoute = (app) => {
    console.log('initAPIRoute')

    //Nguoi Dung
    router.get('/users', APIUserController.getAllNguoiDungs);
    router.get('/user/:id', APIUserController.getOneNguoiDung);
    router.post('/create-user', APIUserController.createNewNguoiDung);
    router.put('/update-user', APIUserController.updateNguoiDung);
    router.delete('/delete-user/:id', APIUserController.deleteNguoiDung);
    router.put('/signin', APIUserController.signin);
    router.put('/signup', APIUserController.signup);

    //Loai San Pham
    router.get('/product-type', APILoaiSanPhamController.getAllLoaiSanPhams);
    router.get('/product-type/:id', APILoaiSanPhamController.getOneLoaiSanPham);
    router.post('/create-product-type', APILoaiSanPhamController.createNewLoaiSanPham);
    router.put('/update-product-type', APILoaiSanPhamController.updateLoaiSanPham);
    router.delete('/delete-product-type/:id', APILoaiSanPhamController.deleteLoaiSanPham);

    // San Pham
    router.get('/list-product/:id', APISanPhamController.getListSanPhamByIDLoaiSanPham);
    router.get('/product', APISanPhamController.getAllSanPhams);
    router.get('/product/:id', APISanPhamController.getOneSanPham);
    router.post('/create-product', APISanPhamController.createNewSanPham);
    router.put('/update-product', APISanPhamController.updateSanPham);
    router.delete('/delete-product/:id', APISanPhamController.deleteSanPham);

    //Chi Tiet San Pham 
    router.get('/product-details', APIChiTietSanPhamController.getAllChiTietSanPhams);
    router.get('/product-details/:id', APIChiTietSanPhamController.getOneChiTietSanPham);
    router.post('/create-product-details', APIChiTietSanPhamController.createNewChiTietSanPham);
    router.put('/update-product-details', APIChiTietSanPhamController.updateChiTietSanPham);
    router.delete('/delete-product-details/:id', APIChiTietSanPhamController.deleteChiTietSanPham);
    router.put('/colorbysize', APIChiTietSanPhamController.getMauSacByKichCo);
    router.put('/product-details-by-condition', APIChiTietSanPhamController.getChiTietSanPhamByConditionID_MS_KC_SL);
    router.put('/product-details-by-idsanpham', APIChiTietSanPhamController.getChiTietSanPhamByIDSanPham);

    //Mau Sac
    router.get('/color', APIMauSacController.getAllMauSacs);
    router.get('/color/:id', APIMauSacController.getOneMauSac);
    router.post('/create-color', APIMauSacController.createNewMauSac);
    router.put('/update-color', APIMauSacController.updateMauSac);
    router.delete('/delete-color/:id', APIMauSacController.deleteMauSac);

    //Kich Co
    router.get('/size', APIKichCoController.getAllKichCos);
    router.get('/size/:id', APIKichCoController.getOneKichCo);
    router.post('/create-size', APIKichCoController.createNewKichCo);
    router.put('/update-size', APIKichCoController.updateKichCo);
    router.delete('/delete-size/:id', APIKichCoController.deleteKichCo);

    //Hoa Don
    router.get('/bill', APIHoaDonController.getAllHoaDons);
    router.get('/bill/:id', APIHoaDonController.getOneHoaDon);
    router.post('/create-bill', APIHoaDonController.createNewHoaDon);
    router.put('/update-bill', APIHoaDonController.updateHoaDon);
    router.delete('/delete-bill/:id', APIHoaDonController.deleteHoaDon);

    //Chi Tiet Hoa Don
    router.get('/bill-details', APIChiTietHoaDonController.getAllChiTietHoaDons);
    router.get('/bill-details/:id', APIChiTietHoaDonController.getOneChiTietHoaDon);
    router.post('/create-bill-details', APIChiTietHoaDonController.createNewChiTietHoaDon);
    router.put('/update-bill-details', APIChiTietHoaDonController.updateChiTietHoaDon);
    router.delete('/delete-bill-details/:id', APIChiTietHoaDonController.deleteChiTietHoaDon);
    router.put('/bill-details-byidhoadon', APIChiTietHoaDonController.getListChiTietHoaDonByIDHoaDon);

    //Tin Tuc
    router.get('/news', APITinTucController.getAllTinTucs);
    router.get('/news/:id', APITinTucController.getOneTinTuc);
    router.post('/create-news', APITinTucController.createNewTinTuc);
    router.put('/update-news', APITinTucController.updateTinTuc);
    router.delete('/delete-news/:id', APITinTucController.deleteTinTuc);

    //Lien He
    router.get('/contact', APILienHeController.getAllLienHes);
    router.get('/contact/:id', APILienHeController.getOneLienHe);
    router.post('/create-contact', APILienHeController.createNewLienHe);
    router.put('/update-contact', APILienHeController.updateLienHe);
    router.delete('/delete-contact/:id', APILienHeController.deleteLienHe);



    return app.use('/api/v1', router)
}

module.exports = initAPIRoute