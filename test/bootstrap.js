'use strict';

const app = require('..');
const sailsMemory = require('sails-memory');

before(function(done) {
   app.bootstrap({
       waterline: {
           adapters: {
               test: sailsMemory
           },
           
           connections: {
               test: {
                   adapter: 'test'
               }
           },
           
           modelDefaults: {
               connection: 'test'
           }
       }
   }, err => {
       if(err) {
           return done(err)
       };
       
       this.app = app;
       done();
   });
});

describe('Application', function() {
    it('should bootstrap', function() {
        this.app.isBootstrapped.should.be.true();
    });
});