'use strict';

const jwt = require('jwt-simple');

module.exports = function *(next) {
    if(this.headers.authorization) {
        
        const parts = this.headers.authorization.split(' ');
        const scheme = parts[0];
        const token = parts[1];
        
        if(/^Bearer$/i.test(scheme)) {
            this.request.token = token;
            try {
                this.request.decodedToken = jwt.decode(
                    token, 
                    this.app.context.config.secret
                );
            } catch(e) {
                console.error('Error on decoding an token. (%s)', token);
                console.error(e);
                this.throw(401);
            }
            
            this.request.user = yield this.app.context.models.users
                .findOne({
                    id: this.request.decodedToken.user
                });
            return yield next;
        }
    }
    
    this.throw(401);
};