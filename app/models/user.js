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
            requried: true
        },
        password: {
            type: 'string',
            required: true
        }
    }
};