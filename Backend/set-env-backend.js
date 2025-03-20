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

const envConfig = `LOCAL_IP=${localIp}\n`;

fs.writeFileSync('.env', envConfig, { flag: 'a' });
console.log(`.env file updated with LOCAL_IP=${localIp}`);