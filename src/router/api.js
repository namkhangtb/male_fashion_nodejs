var express = require('express')
var APIUserController = require('../controller/APIUserController.js');
let router = express.Router();
var { conn, config } = require('../configs/connectDB')
var sql = require('mssql/msnodesqlv8')


const initAPIRoute = (app) => {
    console.log('initAPIRoute')
    router.get('/users', APIUserController.getAllNguoiDungs);
    router.get('/user/:id', APIUserController.getOneNguoiDung);
    router.post('/create-user', APIUserController.createNewNguoiDung);
    router.put('/update-user', APIUserController.updateNguoiDung);
    router.delete('/delete-user/:id', APIUserController.deleteNguoiDung);
    return app.use('/api/v1', router)
}

module.exports = initAPIRoute