


// module.exports.sign = async (user) => {
//     const JWT_SECRET = 'qemsaslvjd-33r3:9i9vis3.'
//     return new Promise((resolve, reject) => {
//         jwt.sign({
//             TenDangNhap: user.TenDangNhap,
//             TenHienThi: user.TenHienThi
//         }, JWT_SECRET, (err, token) => {
//             if (err)
//                 return reject(err)
//             return resolve(token)
//         })
//     })

// }

// module.exports.decode = async (token) => {
//     const JWT_SECRET = 'qemsaslvjd-33r3:9i9vis3.'
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, JWT_SECRET, (err, decoded) => {
//             if (err)
//                 return reject(err)
//             return resolve(decoded)
//         })
//     })
// }