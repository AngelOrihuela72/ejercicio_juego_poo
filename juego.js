class Usuario {
    constructor(nombre, correo, contraseña) {
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
    }
}

class SistemaUsuarios {
    constructor() {
        // cargo usuarios desde localStorage
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        this.usuarioActual = null;
    }

    guardarUsuarios() {
        // guardo usuarios en localStorage
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
    }

    registrar(nombre, correo, contraseña) {
        // verifico si el correo ya existe
        const usuarioExistente = this.usuarios.find(usuario => usuario.correo === correo);
        if (!usuarioExistente) {
            // Si no existe, lo agregamos al array de usuarios
            this.usuarios.push(new Usuario(nombre, correo, contraseña));
            this.guardarUsuarios(); // guardo los usuarios en localStorage
            alert('Registro exitoso');
            window.location.href = 'index.html'; // redirigo a la pagina de inicio de sesion
        } else {
            // Si ya existe se muestra un mensaje
            alert('El correo ya está registrado');
        }
    }

    iniciarSesion(correo, contraseña) {
        // busco al usuario por correo y contraseña
        const usuario = this.usuarios.find(usuario => usuario.correo === correo && usuario.contraseña === contraseña);
        if (usuario) {
            this.usuarioActual = usuario;
            localStorage.setItem('usuarioActual', JSON.stringify(usuario)); // guardo usuario en localStorage
            window.location.href = 'game.html'; // redirigo al juego
        } else {
            alert('Correo o contraseña incorrectos');
        }
    }

    cerrarSesion() {
        this.usuarioActual = null;
        localStorage.removeItem('usuarioActual'); // elimino el usuario actual de localStorage
        window.location.href = 'index.html'; // redirigo al inicio de sesión
    }
}

class Juego {
    constructor() {
        this.opciones = ['piedra', 'papel', 'tijeras'];
    }

    jugar(opcionUsuario) {
        // obtengo la opcion de la maquina de forma aleatoria
        const opcionMaquina = this.opciones[Math.floor(Math.random() * 3)];
        const resultado = this.determinarGanador(opcionUsuario, opcionMaquina);
        return `Tu elegiste ${opcionUsuario}. La máquina eligió ${opcionMaquina}. ${resultado}`;
    }

    determinarGanador(opcionUsuario, opcionMaquina) {
        // logica de las reglas del juego
        if (opcionUsuario === opcionMaquina) return '¡Es un empate!';
        if (
            (opcionUsuario === 'piedra' && opcionMaquina === 'tijeras') ||
            (opcionUsuario === 'papel' && opcionMaquina === 'piedra') ||
            (opcionUsuario === 'tijeras' && opcionMaquina === 'papel')
        ) {
            return '¡Ganaste!';
        } else {
            return '¡Perdiste!';
        }
    }
}

const sistemaUsuarios = new SistemaUsuarios();
const juego = new Juego();

// Eventos para el registro de usuario
if (document.getElementById('register-btn')) {
    document.getElementById('register-btn').addEventListener('click', (event) => {
        event.preventDefault(); // Evita el comportamiento por defecto del boton
        const nombre = document.getElementById('register-name').value.trim();
        const correo = document.getElementById('register-username').value.trim();
        const contraseña = document.getElementById('register-password').value.trim();

        // verifico que los campos no estén vacios
        if (nombre && correo && contraseña) {
            sistemaUsuarios.registrar(nombre, correo, contraseña);
        } else {
            alert('Por favor, completa todos los campos');
        }
    });
}

// Eventos para iniciar sesion
if (document.getElementById('login-btn')) {
    document.getElementById('login-btn').addEventListener('click', () => {
        const correo = document.getElementById('login-username').value.trim();
        const contraseña = document.getElementById('login-password').value.trim();

        // verifico que los campos no esten vacios
        if (correo && contraseña) {
            sistemaUsuarios.iniciarSesion(correo, contraseña);
        } else {
            alert('Por favor, completa todos los campos');
        }
    });
}

// Eventos para el juego
if (document.querySelectorAll('.game-btn').length > 0) {
    document.querySelectorAll('.game-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const opcionUsuario = event.target.dataset.choice;
            const resultado = juego.jugar(opcionUsuario);
            document.getElementById('resultado').innerText = resultado;
        });
    });
}

// Evento de cerrar sesion
if (document.getElementById('logout-btn')) {
    document.getElementById('logout-btn').addEventListener('click', () => {
        sistemaUsuarios.cerrarSesion();
    });
}
