var expect = require("chai").expect;
var bcrypt = require("bcrypt");
var Waterline = require('waterline');
var waterlineConfig = require('../config/waterline');
var userCollection = require('./user');
var errorCollection = require('./error');

var User;

before(function (done) {
    // ORM indítása
    var orm = new Waterline();

    orm.loadCollection(Waterline.Collection.extend(userCollection));
    orm.loadCollection(Waterline.Collection.extend(errorCollection));
    waterlineConfig.connections.default.adapter = 'memory';

    orm.initialize(waterlineConfig, function(err, models) {
        if(err) throw err;
        User = models.collections.user;
        done();
    });
});

describe('UserModel', function () {
    
    function getUserData() {
        return {
            neptun: 'abcdef',
            password: 'jelszo',
            surname: 'Gipsz',
            forename: 'Jakab',
            avatar: '',
        };
    }

    beforeEach(function (done) {
        User.destroy({}, function (err) {
            done();
        });
    });
    
    it('should be able to create a user', function () {
        return User.create(getUserData())
        .then(function (user) {
            expect(user.neptun).to.equal('abcdef');
            expect(bcrypt.compareSync('jelszo', user.password)).to.be.true;
            expect(user.surname).to.equal('Gipsz');
            expect(user.forename).to.equal('Jakab');
            expect(user.avatar).to.equal('');
        });
    });

});