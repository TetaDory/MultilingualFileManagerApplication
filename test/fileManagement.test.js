const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const fs = require('fs');
const path = require('path');

chai.use(chaiHttp);

describe('File Management', () => {
    let token;
    let userId;

    before(done => {
        chai.request(server)
            .post('/register')
            .send({ username: 'testfile', password: 'password' })
            .end((err, res) => {
                chai.request(server)
                    .post('/login')
                    .send({ username: 'testfile', password: 'password' })
                    .end((err, res) => {
                        token = res.body.token;
                        userId = jwt.decode(token).id;
                        done();
                    });
            });
    });

    it('should create a file', done => {
        chai.request(server)
            .post('/file')
            .set('Authorization', token)
            .send({ filename: 'test.txt', content: 'Hello, world!' })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal('File created');
                done();
            });
    });

    it('should read a file', done => {
        chai.request(server)
            .get('/file/test.txt')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal('Hello, world!');
                done();
            });
    });

    it('should update a file', done => {
        chai.request(server)
            .put('/file/test.txt')
            .set('Authorization', token)
            .send({ content: 'Updated content' })
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal('File updated');
                done();
            });
    });

    it('should delete a file', done => {
        chai.request(server)
            .delete('/file/test.txt')
            .set('Authorization', token)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.equal('File deleted');
                done();
            });
    });

    after(done => {
        const userDir = path.join(__dirname, '..', 'files', userId.toString());
        if (fs.existsSync(userDir)) {
            fs.rmdirSync(userDir, { recursive: true });
        }
        done();
    });
});
