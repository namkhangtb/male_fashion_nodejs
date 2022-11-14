const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10

module.exports.matchPassword = (hash, password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, same) => {
            if (err)
                return reject(err)
            resolve(same)
        })
    })
}