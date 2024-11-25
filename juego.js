class Juego {
    constructor() {
        this.opciones = ['piedra', 'papel', 'tijera'];
    }

    obtenerEleccionComputadora() {
        const indiceAleatorio = Math.floor(Math.random() * this.opciones.length);
        return this.opciones[indiceAleatorio];
    }

    determinarGanador(eleccionUsuario, eleccionComputadora) {
        if (eleccionUsuario === eleccionComputadora) {
            return 'empate';
        }
        if (
            (eleccionUsuario === 'piedra' && eleccionComputadora === 'tijera') ||
            (eleccionUsuario === 'papel' && eleccionComputadora === 'piedra') ||
            (eleccionUsuario === 'tijera' && eleccionComputadora === 'papel')
        ) {
            return 'gana';
        }
        return 'pierde';
    }

    iniciar() {
        const eleccionUsuario = document.getElementById('eleccionUsuario').value.toLowerCase();
        const eleccionComputadora = this.obtenerEleccionComputadora();

        if (!this.opciones.includes(eleccionUsuario)) {
            alert('Por favor, ingresa "piedra", "papel" o "tijera"');
            return;
        }

        const resultado = this.determinarGanador(eleccionUsuario, eleccionComputadora);
        this.mostrarResultado(eleccionUsuario, eleccionComputadora, resultado);
    }

    mostrarResultado(eleccionUsuario, eleccionComputadora, resultado) {
        const divResultado = document.getElementById('resultado');
        const divEleccionComputadora = document.getElementById('eleccionComputadora');
        const divEleccionUsuarioTexto = document.getElementById('eleccionUsuarioTexto');

        divEleccionUsuarioTexto.textContent = `Tu elección: ${eleccionUsuario.charAt(0).toUpperCase() + eleccionUsuario.slice(1)}`;
        divEleccionComputadora.textContent = `Elección de la computadora: ${eleccionComputadora.charAt(0).toUpperCase() + eleccionComputadora.slice(1)}`;

        switch (resultado) {
            case 'empate':
                divResultado.textContent = '¡Es un empate!';
                divResultado.className = 'empate';
                break;
            case 'gana':
                divResultado.textContent = '¡Ganaste!';
                divResultado.className = 'ganador';
                break;
            case 'pierde':
                divResultado.textContent = 'Perdiste!';
                divResultado.className = 'perdedor';
                break;
        }
    }
}

const juego = new Juego();
