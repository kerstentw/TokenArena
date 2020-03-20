const crypto = require('crypto')

module.exports.hashpassword = function (_password) {
    const salt = process.env.HASH_SALT
    const hash = crypto.createHmac('sha256',salt)
                     .update(_password)
                     .digest('hex');
    return hash;
}

module.exports.genToken = function (_content){
    const salt = new Date().toISOString()
    const hash = crypto.createHmac('sha256', salt)
                     .update(_content)
                     .digest('hex')
    return hash


}
