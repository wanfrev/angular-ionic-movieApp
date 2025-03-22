function getBackendUrl() {
  const isLocalhost = window.location.hostname === 'localhost';
  const isAndroid = /android/i.test(navigator.userAgent);
  const isEmulator = window.location.hostname === '10.0.2.2'; 
  const currentHost = window.location.hostname;

  if (isLocalhost) {
    return 'http://localhost:5000';
  }

  if (isEmulator) {
    return 'http://10.0.2.2:5000';
  }

  const backendIp = '192.168.1.100';
  return `http://${backendIp}:5000`;
}

export const environment = {
  apiUrl: getBackendUrl()
};
