import type { CapacitorConfig } from '@capacitor/cli';
import { CAPACITOR_SERVER_URL } from './src/environments/capacitor-env';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'App',
  webDir: 'www',
  server: {
    url: CAPACITOR_SERVER_URL, // URL de tu backend
    cleartext: true
  }
};

export default config;
