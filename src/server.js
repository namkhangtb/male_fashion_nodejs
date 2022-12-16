var express = require('express')
var configViewEngine = require('./configs/viewEngine')
//var initWebRoute = require('./router/web')
var initAPIRoute = require('./router/api')
require('dotenv').config();

const https = require('https');
const fs = require('fs');

const options = {
    key: fs.readFileSync('src/certificates/key.pem'),
    cert: fs.readFileSync('src/certificates/cert.pem')
};

const app = express();
const port = process.env.PORT || 8080;

//hỗ trợ gửi data từ client lên server dễ hơn
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// setup view engine
configViewEngine(app);

//init web router
//initWebRoute(app);

var httpsServer = https.createServer(options, app);
httpsServer.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

initAPIRoute(app);
// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })

// https.createServer(options, function (req, res) {
//     res.writeHead(200);
//     res.end("hello world\n");
// }).listen(8000);