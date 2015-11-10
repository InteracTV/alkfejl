var expect = require("chai").expect;
var bcrypt = require("bcrypt");
var Waterline = require('waterline');
var waterlineConfig = require('../config/waterline');
var userCollection = require('./user');
var taskCollection = require('./task');

var User;

before(function (done) {
    // ORM indítása
    var orm = new Waterline();

    orm.loadCollection(Waterline.Collection.extend(userCollection));
    orm.loadCollection(Waterline.Collection.extend(taskCollection));
    waterlineConfig.connections.default.adapter = 'disk';

    orm.initialize(waterlineConfig, function(err, models) {
        if(err) throw err;
        User = models.collections.user;
        done();
    });
});

describe('UserModel', function () {
    
    function getUserData() {
        return {
            username: 'abcdef',
            password: 'jelszo',
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
            expect(user.username).to.equal('abcdef');
            expect(bcrypt.compareSync('jelszo', user.password)).to.be.true;
            expect(user.avatar).to.equal('');
        });
    });

});