const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection successful.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;
