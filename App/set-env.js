const fs = require('fs');
const os = require('os');

const networkInterfaces = os.networkInterfaces();
let localIp = 'localhost';

for (const interfaceDetails of Object.values(networkInterfaces)) {
  for (const details of interfaceDetails) {
    if (details.family === 'IPv4' && !details.internal) {
      localIp = details.address;
      break;
    }
  }
}

const envConfig = `API_URL=http://${localIp}:5000/api\n`;
const capacitorConfig = `
export const CAPACITOR_SERVER_URL = 'http://${localIp}:5000';
`;

fs.writeFileSync('.env', envConfig);
fs.writeFileSync('src/environments/capacitor-env.ts', capacitorConfig);
console.log(`.env file created with API_URL=http://${localIp}:5000/api`);
console.log(`capacitor-env.ts file created with CAPACITOR_SERVER_URL=http://${localIp}:5000`);
