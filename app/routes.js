'use strict';

const koaRouter = require('koa-router');

module.exports = function(app, done) {
    const router = new koaRouter();
    
    router.get('/', function *() {
        this.body = "ROFLMAO";
    });
    
    app.use(router.routes());
    app.use(router.allowedMethods());
    done();
};
