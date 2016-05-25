'use strict';

const jwt = require('jwt-simple');

module.exports = function *() {
    const email = this.body.email;
    const password = this.body.password;
    
    const user = yield this.app.context.models.users
        .findOne({email: email});
    
    if(user.validatePassword(password)) {
        this.body = {
            token: jwt.encode({
                user: user.id
            }, this.app.context.config.secret),
            user: user
        };
    } else {
        this.throw(400);
    }
};
