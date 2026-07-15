


// Este texto será reemplazado automáticamente por GitHub en cada despliegue
const SCRIPT_URL = "PROD_SCRIPT_URL_PLACEHOLDER";

function openInvitation() {
    document.getElementById('envelope').classList.add('opened');
    document.getElementById('card').classList.add('opened');
    document.getElementById('btnConfirmar').classList.add('opened');

    // 1. Reproducir la canción de cuna
    const musica = document.getElementById('musicaCuna');
    musica.volume = 0.5; // Ajusta el volumen a la mitad para que sea suave
    musica.play().catch(error => {
        // Los navegadores modernos a veces bloquean el audio automático si el usuario no interactúa primero.
        // Al dar clic en el sobre para abrirlo, el navegador ya permite reproducir sonido con éxito.
        console.log("El audio se activó tras la interacción del usuario.");
    });

    // 2. Iniciar la lluvia de ositos flotantes
    startFloatingBears();
}

// Función que genera ositos en nubes de forma aleatoria
function startFloatingBears() {
    const container = document.getElementById('bears-container');
    const bearTypes = ['🧸☁️', '🐻🌟', '☁️🎈', '🧸🎈']; // Diferentes combinaciones de emojis tiernos

    // Generamos 10 ositos a lo largo de unos segundos
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const bear = document.createElement('div');
            bear.className = 'floating-bear';
            
            // Elegimos un emoji aleatorio
            bear.innerText = bearTypes[Math.floor(Math.random() * bearTypes.length)];
            
            // Posición horizontal aleatoria (entre 5% y 85% de la pantalla)
            bear.style.left = `${Math.random() * 80 + 5}%`;
            
            // Variación en el tamaño del emoji para dar profundidad
            const scale = Math.random() * 0.5 + 0.8; // Escala entre 0.8 y 1.3
            bear.style.transform = `scale(${scale})`;
            
            // Duraciones de animación aleatorias para que no suban todos al mismo ritmo (entre 7s y 11s)
            const duration = Math.random() * 4 + 7;
            bear.style.animationDuration = `${duration}s`;

            container.appendChild(bear);

            // Limpiamos el elemento después de que termine de flotar para no saturar el navegador
            setTimeout(() => {
                bear.remove();
            }, duration * 1000);

        }, i * 1200); // Aparecen espaciados uno tras otro
    }

    // Volver a iniciar el ciclo de ositos para que sigan saliendo mientras la carta esté abierta
    setInterval(() => {
        const bear = document.createElement('div');
        bear.className = 'floating-bear';
        bear.innerText = bearTypes[Math.floor(Math.random() * bearTypes.length)];
        bear.style.left = `${Math.random() * 80 + 5}%`;
        const duration = Math.random() * 4 + 7;
        bear.style.animationDuration = `${duration}s`;
        container.appendChild(bear);
        setTimeout(() => bear.remove(), duration * 1000);
    }, 3000);
}

function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.getElementById('rsvpForm').reset();
}

function openSuccessModal() {
    document.getElementById('successOverlay').classList.add('active');
}

function closeSuccessModal() {
    document.getElementById('successOverlay').classList.remove('active');
}

function submitRSVP(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const nombre = document.getElementById('nombre').value;
    const acompanantes = document.getElementById('acompanantes').value;

    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    fetch(`${SCRIPT_URL}?nombre=${encodeURIComponent(nombre)}&acompanantes=${encodeURIComponent(acompanantes)}`, {
        method: 'POST',
        mode: 'no-cors'
    })
    .then(() => {
        closeModal(); 
        openSuccessModal(); 
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Hubo un error al guardar tu asistencia. Inténtalo de nuevo.");
    })
    .finally(() => {
        submitBtn.textContent = "Enviar";
        submitBtn.disabled = false;
    });
}