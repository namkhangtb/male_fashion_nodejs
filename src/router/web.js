var express = require('express');
let router = express.Router();

const initWebRoute = (app) => {

    return app.use('/', router)
}

export default initWebRoute;