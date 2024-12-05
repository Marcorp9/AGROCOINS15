// Conectar a MetaMask
async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('Conectado:', accounts[0]);
            alert('Conectado a MetaMask: ' + accounts[0]);
        } catch (error) {
            console.error('Error al conectar con MetaMask', error);
            alert('Error al conectar con MetaMask');
        }
    } else {
        alert('Por favor, instala MetaMask!');
    }
}
// Consultar el saldo del usuario
async function consultarSaldo() {
    try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const balance = await ethereum.request({
            method: 'eth_getBalance',
            params: [accounts[0], 'latest']
        });
        const etherBalance = parseFloat(balance) / 1e18;
        alert('Saldo: ' + etherBalance + ' AGROCOIN');
    } catch (error) {
        console.error('Error al consultar saldo', error);
        alert('Error al consultar el saldo');
    }
}

// Consultar saldo de Agrocoin
async function consultarSaldoAgrocoin() {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        try {
            // Conecta con la cuenta del usuario
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            const agrocoinContract = new web3.eth.Contract(agrocoinABI, contratoAgrocoin);

            // Obtiene el saldo del token y ajusta según los decimales del token
            const balance = await agrocoinContract.methods.balanceOf(accounts[0]).call();
            const decimals = await agrocoinContract.methods.decimals().call();
            const formattedBalance = balance / (10 ** decimals);

            // Obtiene el símbolo del token
            const symbol = await agrocoinContract.methods.symbol().call();

            alert(`Saldo en ${symbol}: ${formattedBalance}`);
        } catch (error) {
            console.error('Error al consultar el saldo de Agrocoin', error);
            alert('Error al consultar el saldo de Agrocoin');
        }
    } else {
        alert('MetaMask no está instalado.');
    }
}
// Función para mostrar notificación personalizada
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.innerText = mensaje;
    document.body.appendChild(notificacion);

    // Ocultar notificación después de 3 segundos
    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

// Modificar las funciones para mostrar notificaciones
async function consultarSaldoAgrocoin() {
    // Código existente de consultar saldo
    // ...
    mostrarNotificacion(`Saldo en ${symbol}: ${formattedBalance}`);
}

async function solicitarTokens() {
    // Código existente de solicitar tokens
    // ...
    mostrarNotificacion('Solicitud de tokens enviada');
}

async function quemarTokens() {
    // Código existente de quemar tokens
    // ...
    mostrarNotificacion('Solicitud de quema de tokens enviada');
}

// Cambia el event listener del botón para consultar el saldo de Agrocoin
document.getElementById('consultarSaldo').addEventListener('click', consultarSaldoAgrocoin);


// Solicitar tokens
async function solicitarTokens() {
    try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const tx = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: accounts[0],
                    to: '0xCE50581e485FC8E276b2EBB3cA53c0b402c6aBE7', // Dirección del contrato para solicitar tokens
                    value: '0x0', // Valor si aplica
                    data: '0xTuDataDeTransaccion', // Data en caso de que aplique para solicitar tokens
                },
            ],
        });
        console.log('Transacción de solicitud de tokens:', tx);
        alert('Solicitud de tokens enviada');
    } catch (error) {
        console.error('Error al solicitar tokens', error);
        alert('Error al solicitar tokens');
    }
}

// Solicitar quema de tokens
async function quemarTokens() {
    try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        const tx = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: accounts[0],
                    to: '0xCE50581e485FC8E276b2EBB3cA53c0b402c6aBE7', // Dirección del contrato para quema de tokens
                    value: '0x0', // Valor si aplica
                    data: '0xTuDataDeQuema', // Data en caso de que aplique para quemar tokens
                },
            ],
        });
        console.log('Transacción de quema de tokens:', tx);
        alert('Solicitud de quema de tokens enviada');
    } catch (error) {
        console.error('Error al quemar tokens', error);
        alert('Error al solicitar quema de tokens');
    }
}
// Lógica para acordeón interactivo
document.querySelectorAll('.acordeon-btn').forEach(button => {
    button.addEventListener('click', () => {
        const contenido = button.nextElementSibling;
        contenido.classList.toggle('acordeon-contenido-activo');
    });
});

// Event listeners para los botones
document.getElementById('connectWallet').addEventListener('click', connectWallet);
document.getElementById('consultarSaldo').addEventListener('click', consultarSaldo);
document.getElementById('solicitarTokens').addEventListener('click', solicitarTokens);
document.getElementById('quemarTokens').addEventListener('click', quemarTokens);

// Manejo del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
// Enviar datos a Google Sheets
async function enviarFormulario(event) {
    event.preventDefault(); // Evitar el envío por defecto

    const url = 'https://script.google.com/macros/s/AKfycbwfIZ8ZHm_xUvMMJrgk2itQfPbHM6LmJaolKyYTeh0kQPA8xuxEvItQ7fostQ84wMyj/exec'; // URL del webhook
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (name && surname && phone && email) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, surname, phone, email })
            });
            const result = await response.json();

            if (result.result === 'success') {
                document.getElementById('formMessage').innerText = 'Formulario enviado con éxito!';
                document.getElementById('formMessage').style.color = '#388e3c'; // Verde
                document.getElementById('formMessage').classList.remove('hidden');
            } else {
                document.getElementById('formMessage').innerText = 'Hubo un error al enviar el formulario.';
                document.getElementById('formMessage').style.color = '#d32f2f'; // Rojo
            }
        } catch (error) {
            console.error('Error al enviar el formulario', error);
            document.getElementById('formMessage').innerText = 'Hubo un error al enviar el formulario.';
            document.getElementById('formMessage').style.color = '#d32f2f'; // Rojo
        }
    } else {
        document.getElementById('formMessage').innerText = 'Por favor, completa todos los campos.';
    }
}

// Event listener para el envío del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', enviarFormulario);

    // Validar campos
    if (name && surname && phone && email) {
        document.getElementById('formMessage').innerText = 'Formulario enviado con éxito!';
        document.getElementById('formMessage').style.color = '#388e3c'; // Verde
    } else {
        document.getElementById('formMessage').innerText = 'Por favor, completa todos los campos.';
    }
});