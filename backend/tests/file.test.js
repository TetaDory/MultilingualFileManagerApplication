const request = require('supertest');
const app = require('../app');
const { sequelize, User, File } = require('../models');
const jwt = require('jsonwebtoken');

let token;
beforeAll(async () => {
  await sequelize.sync({ force: true });
  const user = await User.create({ username: 'testuser', password: 'testpassword' });
  token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await sequelize.close();
});

describe('File Management', () => {
  it('should upload a file', async () => {
    const res = await request(app)
      .post('/api/files')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'testfile')
      .attach('file', 'path/to/testfile');
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('File created successfully');
  });

  it('should get user files', async () => {
    const res = await request(app)
      .get('/api/files')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should delete a file', async () => {
    const res = await request(app)
      .delete('/api/files/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('File deleted successfully');
  });
});
