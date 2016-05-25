'use strict';

module.exports = function *(next) {
    if(this.request.user && this.request.user.admin) {
        yield next;
    } else {
        this.throw(403);
    }
};