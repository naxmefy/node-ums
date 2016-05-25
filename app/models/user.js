'use strict';

module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        email: {
            type: 'email',
            unique: true,
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        
        admin: {
            type: 'boolean',
            defaultsTo: false
        },
        
        validatePassword: function(password) {
            return this.password === password;
        }
    }
};