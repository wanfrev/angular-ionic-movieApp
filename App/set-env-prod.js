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

fs.writeFileSync('.env', envConfig);
console.log(`.env file created with API_URL=http://${localIp}:5000/api`);
