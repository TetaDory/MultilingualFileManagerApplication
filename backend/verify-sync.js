// verify-sync.js
const { sequelize } = require('./models');

sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized successfully');
  sequelize.close();
}).catch(err => {
  console.error('Unable to synchronize the database:', err);
});
