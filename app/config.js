'use strict';

const sailsDisk = require('sails-disk');
// const sailsMysql = require('sails-mysql');
const sailsPostgresql = require('sails-postgresql');

module.exports = {
    ip: process.env.IP || '',
    port: process.env.PORT || 3000,

    log: {
        name: process.env.LOG_NAME || 'ums',
        level: process.env.LOG_LEVEL || 'debug'
    },

    waterline: {
        adapters: {
            disk: sailsDisk,
            // mysql: sailsMysql,
            postgre: sailsPostgresql
        },

        connections: {
            disk: {
                adapter: 'disk'
            },

            // mysql: {
            //     adapter: 'mysql',
            //     url: process.env.DATABASE_URL
            // },

            postgre: {
                adapter: 'postgre',
                url: process.env.DATABASE_URL
            }
        },

        defaults: {
            migrate: process.env.NODE_ENV !== 'production' ? 'alter' : 'safe'
        },

        modelDefaults: {
            connection: process.env.NODE_ENV !== 'production' ? 'disk' : 'postgre'
        }
    }
};
