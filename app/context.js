'use strict';

const damnSupport = require('damn-support');

module.exports = function(app, done) {
    app.log = damnSupport.Log.bunyan(app.context.config.log);
    
    done();
};
