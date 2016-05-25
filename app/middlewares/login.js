'use strict';

module.exports = function *() {
    const email = this.body.email;
    const password = this.body.password;
    
    const user = yield this.app.context.models.users
        .findOne({email: email});
        
    if(user.validatePassword(password)) {
        this.body = user;
    } else {
        this.throw(400);
    }
};
