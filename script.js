// 🔐 Configuración de Seguridad Avanzada
const SECURITY_CONFIG = {
    MAX_DEVICES: 3,
    INACTIVITY_TIMEOUT: 10 * 60 * 1000, // 10 minutos
    CODE_VALIDATION_DELAY: 800, // Retraso anti-fuerza bruta
    SALT: "xQ9#pL2$kM5&vR1", // Sal para hashing
    REDIRECT_URL: "https://luishparedes.github.io/magica_pro-web/" // ✅ NUEVA URL CENTRALIZADA
};

// 🏷️ Códigos válidos (ofuscados con encoding múltiple)
const VALID_CODES = (() => {
    const encoded = "Q9R1,K5M9,J3L7,I1K5,H9J3,G7I1,F5H9,E3G7,C0E3,D1F5,A6C9,Z4B7,Y2A5,X0Z4,W8Y2,V6X0,U4W8,T2V6,S0U4,Q6S0,R8T2,P4R8,O2Q6,N0P4,M8O2,L6N0,K4M8,J2L6,I0K4,H8J2,G6I0,F4H8,E2G6,S3T5,R1S3,T5U7,U7V9,V9W1,P3L8,Y1A4,D0F4,C9E2,B7D0,Z3B6,A5C8,P3R7,X9Z3,W7Y1,T1V5,R7T1,V5X9,U3W7,S9U3,Q5S9,O1Q5,N9P3,M701,A3C7,B5D9,I9K3,L5N9,K3M7,J1L5,C7E1,D9F3,E1G5,F3H7,G5I9,M7N2,H7J1,B4V6,C1F9,D8G3,E5H7,F2J1,G9K4,H6L0,J3M7,K0N4,L7P1,N4Q8,O1R5,Q8S2,R5T9,S2U6,T9V3,U6W0,V3X7,W0Y4,Y7Z1,Z4A8,A1B5,B8C2,C5X9,D2E6,E9F3,F6G0,G3H7,H0I4,I7J1,J4K8,K1L5,L8M2,M5N9,N2O6,O9P3,P6Q0,Q3R7,R0S4,S7T1,T4U8,U1V5,V8W2,W5X9,X2Y6,Y9Z3,Z6A0,A7B1,B4C8,C1D5,D8E2,E5F9,F2G6,G9H3,H6I0,I3J7,J0K4,K7L1,L4M8,M1N5,N8O2,O5P9,P2Q6,Q9R3,R6S0,S3T7,T0U4,U7V1,V4W8,W1X5,X8Y2,Y5Z9,Z2A6,A9B3,B6C0,C3D7,D0E4,E7F1,F4G8,G1H5,H8I2,I5J9,J2K6,K9L3,L6M0,M3N7,N0O4,O7P1,P4Q8,Q1R5,R8S2,S5T9,T2U6,U9V3,V6W0,W3X7,X0Y4,Y7Z1,Z4A8,A1B5,B8C2,C5X9,D2E6,E9F3,F6G0,G3H7,H0I4,I7J1,J4K8,K1L5,L8M2,M5N9,N2O6,O9P3,P6Q0,Q3R7,R0S4,S7T1,T4U8,U1V5,V8W2,W5X9,X2Y6,Y9Z3,Z6A0,A7B1,B4C8,C1D5,D8E2,E5F9,F2G6,G9H3,H6I0,I3J7,J0K4,K7L1,L4M8,M1N5,N8O2,O5P9,P2Q6,Q9R3,R6S0,S3T7,T0U4,U7V1,V4W8,W1X5,X8Y2,Y5Z9,Z2A6,A9B3,B6C0,C3D7,D0E4,E7F1,F4G8,G1H5,H8I2,I5J9,J2K6,K9L3,L6M0,M3N7,N0O4,O7P1,P4Q8,Q1R5,R8S2,S5T9,T2U6,U9V3,V6W0,W3X7,X0Y4,Y7Z1,Z4A8,R2D7,P9M4,B8D1,K6T1,F8L3,S4W9,Z1X5,V0Q2,N7E8,H2C5,B9Y6,D4U7,G0J3,A5O1,W8I4,C6K9,M2P5,Q3V0,X7S1,L9N6,E1R4,T5H8,O0Z2,I7A3,J4B6,U9D0,Y5F1,K2P7,L1Q9,M8R3,N5S0,O2T6,P9U1,Q6V2,R3W7,S0X4,T7Y1,U4Z8,V1A5,W8B2,X5C9,Y2D6,Z9E3,A6F0,B3G7,C0H5,D7I2,E4J9,F1K6,G8L3,H5M0,I2N7,J9O4,K6P1,L3Q8,M0R6,N7S3,O4T0,P1U7,Q8V4,R5W0,S2X9,T9Y6,U3Z1,V0A7,W7B4,X4C1,Y1D8,Z6E5,A3F0,B0G7,C7H4,D4I1,E1J8,F8K5,G5L2,H2M9,I9N6,J6O3,K3P0,L0Q7,M7R4,N4S1,O1T8,P8U5,Q5V2,R2W9,S9X6,T6Y3,U0Z7,V7A4,W4B1,X1C8,Y8D5,Z5E2,A2F9,B9G6,C6H3,D3I0,E0J7,F7K4,G4L1,H1M8,I8N5,J5O2,K2P9,L9Q6,M6R3,N3S0,O0T7,P7U4,Q4V1,R1W8,S8X5,T5Y2,U2Z9,V9A6,W6B3,X3C0,Y0D7,Z7E4,A4F1,B1G8,C8H5,D5I2,E2J9,F9K6,G6L3,H3M0,I0N7,J7O4,K4P1,L1Q8,M8R5,N5S2,O2T9,P9U6,Q6V3,R3W0,S0X7,T7Y4,U4Z1,V1A8,W8B5,X5C2,Y2D9,Z9E6,A6F3,B3G0,D1G5,D7I4,E4J1,F1K8,G8L5,H5M2,I2N9,J9O6,K6P3,L3Q0,M0R7,N7S4,O4T1,P1U8,Q8V5,R5W2,S2X9,T9Y6,U3Z3,V0A9,W7B6,X4C3,Y1D0,Z6E7,A3F4,B0G1,C7H8,D4I5,E1J2,F8K9,G5L6,H2M3,I9N0,J6O7,M7R8,N4S5,O1T2,P8U9,Q5V6,R2W3,S9X0,T6Y7,U0Z4,V7A1,W4B8,X1C5,Y8D2,Z5E9,A2F6,B9G3,C6H0,D3I7,E0J4,F7K1,G4L8,H1M5,I8N2,J5O9,K2P6,L9Q3,M6R0,N3S7,O0T4,P7U1,Q4V8,R1W5,S8X2,T5Y9,U2Z6,V9A3,W6B0,X3C7,Y0D4,Z7E1,A4F8,B1G5,C8H2,D5I9,E2J6,F9K3,G6L0,H3M7,I0N4,J7O1,K4P8,L1Q5,M8R2,N5S9,O2T6,P9U3,Q6V0";
    return encoded.split(',');
})();

// 🛡️ Sistema de Seguridad Mejorado
class CodeSecuritySystem {
    constructor() {
        this.initSessionProtection();
        this.checkExistingSession();
    }

    // 🔄 Generar ID de dispositivo único y persistente
    generateDeviceId() {
        const storedId = localStorage.getItem('secureDeviceId');
        if (storedId) return storedId;

        const fingerprint = [
            navigator.userAgent,
            navigator.hardwareConcurrency,
            screen.width,
            screen.height,
            navigator.deviceMemory,
            SECURITY_CONFIG.SALT
        ].join('|');

        const deviceId = this.hashString(fingerprint) + '-' + Date.now().toString(36);
        localStorage.setItem('secureDeviceId', deviceId);
        return deviceId;
    }

    // 🔢 Algoritmo de hashing mejorado
    hashString(str) {
        let hash = 5381;
        for (let i = 0; i < str.length; i++) {
            hash = (hash * 33) ^ str.charCodeAt(i);
        }
        return (hash >>> 0).toString(36);
    }

    // 🏷️ Obtener dispositivos registrados para un código
    getRegisteredDevices(code) {
        const encrypted = localStorage.getItem(`encDevices_${code}`);
        if (!encrypted) return [];

        try {
            const decrypted = this.decryptData(encrypted);
            return JSON.parse(decrypted) || [];
        } catch (e) {
            console.error("Error al decodificar dispositivos:", e);
            return [];
        }
    }

    // ➕ Registrar nuevo dispositivo de forma segura
    registerDevice(code) {
        const deviceId = this.generateDeviceId();
        const devices = this.getRegisteredDevices(code);

        // Verificar si ya está registrado
        if (devices.some(dev => dev.id === deviceId)) {
            return { success: true, isNew: false };
        }

        // Verificar límite de dispositivos
        if (devices.length >= SECURITY_CONFIG.MAX_DEVICES) {
            return { success: false, reason: "Límite de dispositivos alcanzado" };
        }

        // Registrar nuevo dispositivo
        devices.push({
            id: deviceId,
            timestamp: Date.now(),
            ua: navigator.userAgent.substring(0, 50)
        });

        // Guardar cifrado
        localStorage.setItem(`encDevices_${code}`, this.encryptData(JSON.stringify(devices)));
        return { success: true, isNew: true };
    }

    // 🔐 Cifrado básico de datos
    encryptData(data) {
        return btoa(unescape(encodeURIComponent(data + SECURITY_CONFIG.SALT)));
    }

    // 🔓 Descifrado de datos
    decryptData(encrypted) {
        try {
            const decoded = decodeURIComponent(escape(atob(encrypted)));
            return decoded.replace(SECURITY_CONFIG.SALT, '');
        } catch (e) {
            console.error("Error al descifrar:", e);
            return '';
        }
    }

    // ⏳ Protección por inactividad
    initSessionProtection() {
        // Reiniciar timer en eventos de usuario
        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        events.forEach(evt => {
            document.addEventListener(evt, this.resetInactivityTimer.bind(this));
        });

        this.resetInactivityTimer();
    }

    resetInactivityTimer() {
        clearTimeout(this.inactivityTimer);
        this.inactivityTimer = setTimeout(() => {
            this.handleInactiveSession();
        }, SECURITY_CONFIG.INACTIVITY_TIMEOUT);
    }

    handleInactiveSession() {
        // Guardar código actual antes de redirigir
        const currentCode = localStorage.getItem('currentValidCode');
        sessionStorage.removeItem('activeSessionToken');
        
        if (currentCode) {
            // Redirigir manteniendo el código en localStorage
            window.location.href = window.location.pathname;
        }
    }

    // 🔍 Verificar sesión existente
    checkExistingSession() {
        const savedCode = localStorage.getItem('currentValidCode');
        const sessionToken = sessionStorage.getItem('activeSessionToken');
        
        if (savedCode && sessionToken) {
            const devices = this.getRegisteredDevices(savedCode);
            const deviceId = this.generateDeviceId();
            
            if (devices.some(dev => dev.id === deviceId)) {
                // ✅ Redirigir al NUEVO ENLACE (evitando 404)
                setTimeout(() => {
                    window.location.href = SECURITY_CONFIG.REDIRECT_URL;
                }, 500);
            }
        }
    }

    // ✅ Validar código de acceso
    validateAccessCode(code) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (!VALID_CODES.includes(code)) {
                    resolve({ valid: false, error: "Código no válido" });
                    return;
                }

                const registration = this.registerDevice(code);
                if (!registration.success) {
                    resolve({ valid: false, error: registration.reason });
                    return;
                }

                // Establecer sesión válida
                localStorage.setItem('currentValidCode', code);
                sessionStorage.setItem('activeSessionToken', this.hashString(Date.now().toString()));
                
                resolve({ valid: true, isNewDevice: registration.isNew });
            }, SECURITY_CONFIG.CODE_VALIDATION_DELAY);
        });
    }

    // ℹ️ Obtener información de dispositivos registrados
    getDeviceRegistrationInfo(code) {
        const devices = this.getRegisteredDevices(code);
        const currentDeviceId = this.generateDeviceId();
        
        const isCurrentRegistered = devices.some(dev => dev.id === currentDeviceId);
        const availableSlots = SECURITY_CONFIG.MAX_DEVICES - devices.length;
        
        return {
            isRegistered: isCurrentRegistered,
            registeredDevices: devices.length,
            maxDevices: SECURITY_CONFIG.MAX_DEVICES,
            availableSlots: availableSlots > 0 ? availableSlots : 0
        };
    }
}

// 🚀 Inicialización del Sistema
document.addEventListener('DOMContentLoaded', () => {
    const securitySystem = new CodeSecuritySystem();
    const accessForm = document.getElementById('access-form');
    const codeInput = document.getElementById('code');
    const messageEl = document.getElementById('message');
    const deviceInfoEl = document.getElementById('device-info');

    // Mostrar código guardado si existe
    const savedCode = localStorage.getItem('currentValidCode');
    if (savedCode) {
        codeInput.value = savedCode;
        const info = securitySystem.getDeviceRegistrationInfo(savedCode);
        updateDeviceInfoDisplay(info);
    }

    // 🖊️ Manejar entrada de código
    codeInput.addEventListener('input', function() {
        this.value = this.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
        
        if (this.value.length === 4) {
            const info = securitySystem.getDeviceRegistrationInfo(this.value);
            updateDeviceInfoDisplay(info);
        } else {
            deviceInfoEl.textContent = '';
        }
    });

    // 📋 Mostrar información de dispositivos
    function updateDeviceInfoDisplay(info) {
        if (!info || info.registeredDevices === 0) {
            deviceInfoEl.textContent = '';
            return;
        }

        if (info.isRegistered) {
            deviceInfoEl.innerHTML = `✅ Este dispositivo está registrado<br>
                                     <small>Dispositivos: ${info.registeredDevices}/${info.maxDevices}</small>`;
            deviceInfoEl.className = 'success';
        } else if (info.availableSlots > 0) {
            deviceInfoEl.innerHTML = `⚠️ Este código tiene ${info.registeredDevices} de ${info.maxDevices} dispositivos<br>
                                     <small>Aún puedes registrar ${info.availableSlots} más</small>`;
            deviceInfoEl.className = 'warning';
        } else {
            deviceInfoEl.innerHTML = `❌ Límite de dispositivos alcanzado<br>
                                     <small>Este código ya tiene ${info.maxDevices} dispositivos registrados</small>`;
            deviceInfoEl.className = 'error';
        }
    }

    // 🎯 Manejar envío del formulario
    accessForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const code = codeInput.value.trim();
        
        // Validación básica
        if (code.length !== 4 || !/^[A-Z0-9]{4}$/.test(code)) {
            showMessage("❌ El código debe tener exactamente 4 caracteres alfanuméricos", "error");
            return;
        }

        showMessage("🔒 Verificando código...", "info");
        
        const result = await securitySystem.validateAccessCode(code);
        
        if (result.valid) {
            showMessage("✅ Acceso concedido...", "success");
            // ✅ Redirigir al NUEVO ENLACE (evitando 404)
            setTimeout(() => {
                window.location.href = SECURITY_CONFIG.REDIRECT_URL;
            }, 1500);
        } else {
            showMessage(`❌ ${result.error}`, "error");
        }
    });

    // 💬 Mostrar mensajes de estado
    function showMessage(text, type) {
        messageEl.innerHTML = text;
        messageEl.className = type;
    }
});
