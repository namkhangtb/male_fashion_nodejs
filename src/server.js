var express = require('express')
var configViewEngine = require('./configs/viewEngine')
//var initWebRoute = require('./router/web')
var initAPIRoute = require('./router/api')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

//hỗ trợ gửi data từ client lên server dễ hơn
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// setup view engine
configViewEngine(app);

//init web router
//initWebRoute(app);

initAPIRoute(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})