const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const Queue = require('bull');

chai.use(chaiHttp);

describe('Queue System'), () => {
    let token;
}