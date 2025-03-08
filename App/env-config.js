const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const envConfig = {
  production: false,
  apiUrl: process.env.API_URL
};

fs.writeFileSync('./src/environments/environment.ts', `export const environment = ${JSON.stringify(envConfig)};`);
