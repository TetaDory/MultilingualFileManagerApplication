const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('User Management', () => {
    it('should register a user', done => {
        chai.request(server)
            .post('/register')
            .send({ username: 'test', password: 'password' })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal('User registered successfully!');
                done();
            });
    });

    it('should login a user', done => {
        chai.request(server)
            .post('/login')
            .send({ username: 'test', password: 'password' })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('token');
                done();
            });
    });
});
