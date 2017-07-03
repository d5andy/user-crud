'use strict';
var crypto = require('crypto');
var loki = require('lokijs');

var db = new loki('Example');
var users = db.addCollection('users', {unique: ['email', 'id'], index: ['email', 'id']});

function randomUuid() {
    return crypto.randomBytes(48).toString('hex');
}

const 
    create = (email, forename, surname) => {
        if ([email, forename, surname].some(v => !v))  {    
            throw new Error(`Create user failed: Missing values ${[email, forename, surname]}`)
        }

        return users.insert({id: randomUuid(), email: email, forename: forename, surname: surname, created: new Date()});
    },
    update = (updatedUser) => {
        let foundUser = findById(updatedUser.id);
        if (foundUser) {
            Object.assign(foundUser, updatedUser);
            return users.update(foundUser);
        }
        throw new Error(`Update failed no user ${updatedUser.email}`);
    },
    deleteByEmail = (email) => {
        let foundUser = findByEmail(email);
        if (foundUser) {
            return users.remove(foundUser);
        }
        throw new Error(`Delete failed no user ${email}`);
    },
    deleteById = (id) => {
        let foundUser = findById(id);
        if (foundUser) {
            return users.remove(foundUser);
        }
        throw new Error(`Delete failed no user ${id}`);
    },
    findByEmail = (email) => {
        return users.findOne({email: email});
    },
    findById = (id) => {
        return users.findOne({id: id});
    },
    all = () => {
        return users.find();
    };


module.exports = {create, update, deleteByEmail, deleteById, findByEmail, findById, all};