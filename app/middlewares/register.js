'use strict';

const _ = require('lodash');

module.exports = function *() {
    delete this.body.admin; // prevent admin registration
    if(_.isArray(this.body)) {
        this.throw(400);
    }
    const createdUsers = yield this.app.context.models
        .users.create(this.body);
        
    this.body = createdUsers;
};
