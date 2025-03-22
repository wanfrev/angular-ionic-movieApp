function getBackendUrl() {
  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
  const isEmulator = hostname === '10.0.2.2'; // Emulador Android
  const isAndroid = /android/i.test(navigator.userAgent);

  // 1. Si estás en navegador local (localhost)
  if (isLocalhost) {
    return 'http://localhost:5000';
  }

  // 2. Si estás en emulador Android (Accede a tu PC usando 10.0.2.2)
  if (isEmulator) {
    return 'http://10.0.2.2:5000';
  }

  // 3. Si estás en Android físico, usa la IP local de tu PC (reemplaza esto 👇 con tu IP real)
  const pcLocalIp = 'http://192.168.1.100:5000'; // ← Cambia esto solo UNA VEZ
  if (isAndroid) {
    return pcLocalIp;
  }

  // 4. Por defecto, usar el mismo host donde corre el frontend
  return `${window.location.protocol}//${hostname}:5000`;
}

export const environment = {
  apiUrl: getBackendUrl()
};
