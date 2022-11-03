var sql = require('mssql/msnodesqlv8')

const config = {
    user: 'sa',
    password: '123456',
    server: 'NAM_KHANG\\SQLEXPRESS',
    database: 'Lipstick2',
    driver: 'msnodesqlv8',
    options: {
        Encrypt: true,
        trustedConnection: true,
    }
}

const conn = new sql.ConnectionPool(config)

module.exports = {
    conn: conn,
    config: config
}