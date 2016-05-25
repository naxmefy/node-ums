'use strict';

const _ = require('lodash');

module.exports = function(entity) {
    return {
        list: function *() {
            this.body = yield entity.find(this.query);
        },
        
        create: function *() {
            this.body = yield entity.create(this.body);
        },
        
        show: function *() {
            
        },
        
        update: function *() {
            _.merge(this.state.entityItem, this.body);
            yield this.state.entityItem.save();
        },
        
        destroy: function *() {
            yield this.state.entityItem.destroy();
        },
        
        param: function *(id, next) {
            this.state.entityItem = yield entity.findOne({id: id});
            yield next;
            this.body = this.state.entityItem;
        }
    };
};