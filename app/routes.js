'use strict';

const koaRouter = require('koa-router');
const koaBetterBody = require('koa-better-body');

const error = require('./middlewares/error');
const login = require('./middlewares/login');
const register = require('./middlewares/register');
const jwtToken = require('./middlewares/jwt-token');
const isAdmin = require('./middlewares/is-admin');
const restEntity = require('./middlewares/rest-entity');

module.exports = function(app, done) {
    const users = restEntity(app.context.models.users);
    
    app.use(error);
    app.use(koaBetterBody());
    
    const router = new koaRouter();

    router.get('/', function *() {
        this.body = "ROFLMAO";
    });
    
    const adminRouter = new koaRouter({
        prefix: '/admin'
    });
    
    adminRouter.use(jwtToken, isAdmin);
    
    adminRouter.get('/users', users.list);
    adminRouter.post('/users', users.create);
    adminRouter.get('/users/:userid', users.show);
    adminRouter.put('/users/:userid', users.update);
    adminRouter.delete('/users/:userid', users.destroy);
    adminRouter.param('userid', users.param);
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
