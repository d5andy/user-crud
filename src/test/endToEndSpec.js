'use strict';
const app = require('../public/index.js');
const user= require('../public/user.js');
const request = require('request');

describe('EndToEndSpec.Empty_database::', ()=> {

    it('read_all', (done)=> {
        request({
            method: 'get',
            url: 'http://localhost:8055/user'
        }, (err, res, body) => {
            expect(res.statusCode).toBe(204);
            expect(body).toBe('');
            done();
        });
    });

    it('read_one', (done)=> {
        request({
            method: 'get',
            url: 'http://localhost:8055/user/null',
            agent: false
        }, (err, res, body) => {
            expect(res.statusCode).toBe(204);
            expect(body).toBe('');
            done();
        });
    });

    it('update_null', (done)=> {
        request({
            method: 'put',
            url: 'http://localhost:8055/user/null',
            form: {email: 'gibber', forename: 'dada', surname: 'lala'},
            json: true
        }, (err, res, body) => {
            expect(res.statusCode).toBe(404);
            expect(body).toBe('Not Found');
            done();
        });
    });

    it('delete_null', (done)=> {
        request({
            method: 'delete',
            url: 'http://localhost:8055/user/null'
        }, (err, res, body) => {
            expect(res.statusCode).toBe(404);
            expect(body).toBe('Not Found');
            done();
        });
    });


});


describe('EndToEndSpec.cru::', ()=> {
    const email = 'newuser@gmail.com';

    it('create', (done)=> {
        request(
            {
                method: 'post',
                url: 'http://localhost:8055/user',
                form: {email: email, forename: 'first', surname: 'second'},
                json: true
            }, (err, res, body) => {
                expect(err).toBe(null);
                expect(res.statusCode).toBe(201);
                expect(body.email).toBe(email);
                done();
            });
    });

    it('update', (done) => {
        let newuser = user.create(email, 'first', 'second');
        request({
            method: 'put',
            url: `http://localhost:8055/user/${newuser.id}`,
            form: {email: email, forename: 'howard', surname: 'doin'},
            json: true
        }, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(body).toBeDefined();
            done();
        });
    });

    it('read_one', (done) => {
        let newuser = user.create(email, 'first', 'second');
        request({
            method: 'get',
            url: `http://localhost:8055/user/${newuser.id}`
        }, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(body).toBeDefined();
            done();
        });
    });
    
    it('read_all', (done) => {
        user.create(email, 'first', 'second');
        request({
            method: 'get',
            url: 'http://localhost:8055/user'
        }, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(body).toBeDefined();
            done();
        });
    });
    afterEach(() => {user.deleteByEmail(email)});

});

describe('EndToEndSpec.bad_data::', ()=> {
    it('missing_fields', (done)=> {
        request(
            {
                method: 'post',
                url: 'http://localhost:8055/user',
                form: {email: 'newuser@gmail.com', surname: 'second'},
                json: true
            }, (err, res, body) => {
                expect(err).toBe(null);
                expect(res.statusCode).toBe(400);
                done();
            });
    });
});