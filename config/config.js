const defaultConfig = {
  username: process.env.DB_USER || 'OpticsMarket',
  password: process.env.DB_PASS || 'dev',
  database: process.env.DB_NAME || 'OpticsMarket',
  host: process.env.DB_HOST || 'winhost',
  dialect: 'postgres'
};

module.exports = {
  development: {
    ...defaultConfig
  },
  test: {
    ...defaultConfig,
  },
  production: {
    ...defaultConfig
  }
};
