'use strict';

const path = require('path');
const _ = require('lodash');
const waterline = require('waterline');
const requireDir = require('require-dir');
const pluralize = require('pluralize');

module.exports = function(app, done) {
    app.context.ORM = new waterline();
    
    // Load Models
    const models = requireDir(path.resolve(__dirname, 'models'));
    _.forEach(models, (model, key) => {
        const modelConf = Object.assign({
            identity: _.camelCase(pluralize(key)),
            tableName: _.camelCase(pluralize(key))
        }, app.context.config.waterline.modelDefaults, model);
        
        const waterlineModel = waterline.Collection.extend(modelConf);
        app.context.ORM.loadCollection(waterlineModel);
    });
    
    // Initialize Waterline ORM
    app.context.ORM.initialize(app.context.config.waterline, (err, models) => {
        if(err) {
           return done(err);
        }
        
        app.context.models = models.collections;
        app.context.connections = models.connections;
        done();
    });
};
