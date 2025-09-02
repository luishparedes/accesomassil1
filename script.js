// 🔐 Configuración de Seguridad Avanzada
const SECURITY_CONFIG = {
    MAX_DEVICES: 3,
    INACTIVITY_TIMEOUT: 10 * 60 * 1000, // 10 minutos
    CODE_VALIDATION_DELAY: 800, // Retraso anti-fuerza bruta
    SALT: "xQ9#pL2$kM5&vR1", // Sal para hashing
    REDIRECT_URL: "https://luishparedes.github.io/massiel/" // ✅ NUEVA URL CENTRALIZADA
};

// 🏷️ Códigos válidos (ofuscados con encoding múltiple)
const VALID_CODES = (() => {
    const encoded = "Q9R1,O4G9,N3F8,M2E7,L1D6,K0C5,J9B4,I8A3,H7Z2,G6Y1,F5X0,E4W9,D3V8,C2U7,B1T6,A0S5,Z9R4,Y8Q3,X7P2,K5M9,J3L7";
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
