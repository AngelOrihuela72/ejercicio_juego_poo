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
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; //uso el json parse para transformar el texto en un objeto
        this.usuarioActual = null; //valor desconocido
    }

    guardarUsuarios() {
        // guardo usuarios en localStorage
        localStorage.setItem('usuarios', JSON.stringify(this.usuarios)); // uso json stringify para convertir el objeto es un texto
        // y uso el localstorage.setitem para guardar o actualizar
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
        this.opcionUsuario = ''; // Para guardar la elección del usuario
    }

    jugar() {
        if (!this.opcionUsuario) {
            alert('¡Por favor, selecciona una opción!');
            return;
        }
        
        // obtengo la opcion de la maquina de forma aleatoria
        const opcionMaquina = this.opciones[Math.floor(Math.random() * 3)];
        const resultado = this.determinarGanador(this.opcionUsuario, opcionMaquina);
        
        // Actualizamos el resultado en el HTML
        document.getElementById('resultado').innerText = `Tu elegiste ${this.opcionUsuario}. La máquina eligió ${opcionMaquina}. ${resultado}`;
        document.getElementById('eleccionComputadora').innerText = `La máquina eligió: ${opcionMaquina}`;
        document.getElementById('eleccionUsuarioTexto').innerText = `Tu elección fue: ${this.opcionUsuario}`;
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

// Se crea una instancia de juego
const juego = new Juego();

// Asignamos la elección del usuario cuando hace click en los botones
if (document.querySelectorAll('.game-btn').length > 0) {
    document.querySelectorAll('.game-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const opcionUsuario = event.target.dataset.choice;
            juego.opcionUsuario = opcionUsuario;
            document.getElementById('eleccionUsuario').value = opcionUsuario;  // Actualizamos el input con la elección
        });
    });
}

// Eventos para iniciar el juego cuando el usuario haga clic en el botón "Jugar"
document.querySelector('button[onclick="juego.iniciar()"]').addEventListener('click', () => {
    juego.jugar(); // Llama al método jugar() para iniciar la partida
});
