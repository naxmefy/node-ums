'use strict';

const bcrypt = require('bcrypt-nodejs');

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
            required: true,
            minLength: 8
        },
        
        admin: {
            type: 'boolean',
            defaultsTo: false
        },
        
        validatePassword: function(password) {
            return bcrypt.compareSync(password, this.password);
        },
        
        changePassword: function(newPassword, done) {
            bcrypt.hash(newPassword, null, null, (err, result) => {
                if(err) {
                    return done(err);
                }
                
                this.password = result;
                done();
            });
        },
        
        // Override toJSON instance method to remove password value
        toJSON: function() {
            const obj = this.toObject();
            delete obj.password;
            return obj;
        }
    },
    
    beforeCreate: function(values, done) {
        bcrypt.hash(values.password, null, null, (err, result) => {
            if(err) {
                return done(err);
            }
            
            values.password = result;
            done();
        });
    },
    
    beforeUpdate: function(values, done) {
        if(values.newPassword) {
            return bcrypt.hash(values.newPassword, null, null, (err, result) => {
                if(err) {
                    return done(err);
                }
                
                values.password = result;
                done();
            });
        }
        
        return done();
    }
};