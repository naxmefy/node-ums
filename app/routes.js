'use strict';

const koaRouter = require('koa-router');
const koaBetterBody = require('koa-better-body');

const error = require('./middlewares/error');
const login = require('./middlewares/login');
const register = require('./middlewares/register');

module.exports = function(app, done) {
    app.use(error);
    app.use(koaBetterBody());
    
    const router = new koaRouter();

    router.get('/', function *() {
        this.body = "ROFLMAO";
    });
    
    const adminRouter = new koaRouter({
        prefix: '/admin'
    });
    
    adminRouter.get('/users', function *() {});
    adminRouter.post('/users', function *() {});
    adminRouter.get('/users/:userid', function *() {});
    adminRouter.put('/users/:userid', function *() {});
    adminRouter.delete('/users/:userid', function *() {});
    router.use(adminRouter.routes());
    
    const authRouter = new koaRouter({
        prefix: '/auth'
    });
    
    authRouter.post('/login', login);
    authRouter.post('/register', register);
    router.use(authRouter.routes());
    
    app.use(router.routes());
    app.use(router.allowedMethods());
    done();
};
