function getBackendUrl() {
  const isLocalhost = window.location.hostname === 'localhost';
  const isAndroid = /android/i.test(navigator.userAgent);
  const isEmulator = window.location.hostname === '10.0.2.2'; // Android Emulator default
  const currentHost = window.location.hostname;

  // 1. Si estás en navegador (localhost), usa el mismo host con puerto 5000
  if (isLocalhost) {
    return 'http://localhost:5000';
  }

  // 2. Si estás en emulador de Android (usa 10.0.2.2 para acceder a PC)
  if (isEmulator) {
    return 'http://10.0.2.2:5000';
  }

  // 3. Si estás en dispositivo Android físico, intenta usar la IP de la red (misma subred)
  // window.location.hostname tendrá la IP del dispositivo → reemplaza con IP del backend (PC)
  const backendIp = '192.168.1.100'; // ⚠️ PON AQUÍ LA IP DE TU PC
  return `http://${backendIp}:5000`;
}

export const environment = {
  apiUrl: getBackendUrl()
};
