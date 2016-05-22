'use strict';

const async = require('async');
const http = require('http');
const koa = require('koa');
const damnUtils = require('damn-utils');

const app = module.exports = koa();
app.server = http.createServer(app.callback());

const config = require('./config');
const context = require('./context');
const routes = require('./routes');
const waterline = require('./waterline');

app.isBootstrapped = false;
app.bootstrap = function (customConfig, done) {
    damnUtils.define(customConfig, {});
    damnUtils.define(done, x => x);
    
    app.context.config = Object.assign({}, config, customConfig);
    
    async.series([
        next => context(app, next),
        next => waterline(app, next),
        next => routes(app, next),
        next => {
            app.isBootstrapped = true;
            next();
        }
    ], done);
};

app.start = function (customConfig, done) {
    damnUtils.define(done, err => {
        if(err) {
            throw err;
        }
    });
    
    async.series([
        next => app.bootstrap(customConfig, next),
        next => app.server.listen(
            app.context.config.port,
            app.context.config.ip,
            damnUtils.define.types.koaRunCallback(app, next)
        )
    ], done);
};

if (!module.parent) {
    app.start();
}
