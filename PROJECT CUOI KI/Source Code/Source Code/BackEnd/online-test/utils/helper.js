const crypto = require('crypto');
const appKey = 'Group01';
const createHash = (text) => {
    return crypto.createHash('sha256')
        .update(text,'utf8').digest('base64');
};

module.exports = {
    hash: createHash,
    appKey:appKey
}