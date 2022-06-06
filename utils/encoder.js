const jwt = require('jsonwebtoken')
// generate jwt
let GenerateJwt = (data) => {
    let options = {
        algorithm: 'HS256',
        expiresIn: "7d",
        issuer: 'onf',
    }
    let token = jwt.sign(data, 'L1n+@N9w15es4Jwt', options)
    return token
}



module.exports = { GenerateJwt }