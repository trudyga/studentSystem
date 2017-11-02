const crypto = require('crypto');

function getRandomString (length) {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0, length);
}

function sha512(password, salt) {
    // Hashing algorithm
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt: salt,
        hash: value
    }
}

/**
 * Hash password by sha512 algorithm
 * @param {String} password - password to encrypt
 * @param {String} [salt]   - salt, if specified will be used to encrypt password, otherwise will be generated automatically
 */
function hashPassword(password, salt) {
    if (!salt)
        salt = getRandomString(16);
    return sha512(password, salt);
}


module.exports = {
    hashPassword,
};