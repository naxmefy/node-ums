'use strict';

const koaRouter = require('koa-router');

const error = require('./middlewares/error');

module.exports = function(app, done) {
    app.use(error);
    const router = new koaRouter();

    router.get('/', function *() {
        this.body = "ROFLMAO";
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
    done();
};
