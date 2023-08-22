import crypto from 'crypto';

const SECRET = 'API-SECRET-PHASE';

export const random = function() {
    return crypto.randomBytes(128).toString('base64');
};

export const authentication = function (salt: String, password: String) {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(SECRET).digest('hex');
};
