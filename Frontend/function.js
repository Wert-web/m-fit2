document.addEventListener("DOMContentLoaded", function () {
    // Elementos de la interfaz
    const textDisplay = document.querySelector(".texts-display"); // Contenedor de texto completo
    const inputArea = document.querySelector(".input-ingres-text"); // Campo de entrada de texto
    const wpmDisplay = document.querySelector(".stats-display p:nth-child(2)"); // Palabras por minuto
    const timeDisplay = document.querySelector(".stats-display p:nth-child(4)"); // Tiempo restante
    const errorsDisplay = document.querySelector(".stats-display p:nth-child(3)"); // Palabras erróneas
    const totalDisplay = document.querySelector(".stats-display p:nth-child(1)"); // Total de palabras
    const keySpan = document.querySelector(".keyboard .key"); // Elemento que muestra la tecla actual

    const startButton = document.getElementById("btn-Start"); // Botón Iniciar
    const pauseButton = document.getElementById("btn-Resume"); // Botón Pausar
    const restartButton = document.getElementById("btn-Restart"); // Botón Reiniciar

    // Variables para la práctica de mecanografía
    let estado = null; // Estado inicial
    let words = [];
    let currentWordIndex = 0;
    let currentCharIndex = 0; // Índice de la letra actual en la palabra
    let errors = 0;
    let totalWords = 0;
    let wpm = 0;
    let timeLeft = 60; // Tiempo inicial
    let timer = null; // Identificador del temporizador

    // Cargar el texto desde un archivo .txt
    function loadTextFromFile() {
        fetch("text.txt")
            .then((response) => response.text())
            .then((text) => {
                words = text.split(/\s+/); // Separar palabras por espacios y saltos de línea
                displayFullText();
            })
            .catch((error) => console.error("Error al cargar el archivo:", error));
    }

    // Muestra el texto completo y resalta la palabra actual
    function displayFullText() {
        textDisplay.innerHTML = words
            .map((word, index) => `<span ${index === 0 ? 'class="highlight"' : ""}>${word}</span>`)
            .join(" ");
        updateKeyDisplay();
    }

    // Cambiar estado y actualizar la interfaz
    function cambiarEstado(nuevoEstado) {
        estado = nuevoEstado;

        switch (estado) {
            case "inactivo":
                inputArea.disabled = true;
                startButton.disabled = false;
                pauseButton.disabled = true;
                restartButton.disabled = true;
                clearInterval(timer); // Detener cualquier temporizador
                timer = null;
                timeDisplay.textContent = `Tiempo restante: 60 s`;
                break;

            case "iniciado":
                inputArea.disabled = false;
                inputArea.focus();
                startButton.disabled = true;
                pauseButton.disabled = false;
                restartButton.disabled = false;
                iniciarTiempo();
                break;

            case "pausado":
                inputArea.disabled = true;
                pauseButton.textContent = "Reanudar";
                clearInterval(timer); // Pausar temporizador
                timer = null;
                break;

            case "finalizado":
                inputArea.disabled = true;
                startButton.disabled = false;
                pauseButton.disabled = true;
                restartButton.disabled = false;
                clearInterval(timer); // Detener temporizador
                timer = null;
                break;

            default:
                console.error("Estado desconocido:", nuevoEstado);
        }
    }

    // Iniciar el temporizador
    function iniciarTiempo() {
        timer = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = `Tiempo restante: ${timeLeft} s`;

            if (timeLeft <= 0) {
                cambiarEstado("finalizado");
                alert("¡Tiempo finalizado!");
            }
        }, 1000);
    }

    // Iniciar la práctica
    startButton.addEventListener("click", function () {
        cambiarEstado("iniciado");
    });

    // Pausar y reanudar la práctica
    pauseButton.addEventListener("click", function () {
        if (estado === "iniciado") {
            cambiarEstado("pausado");
        } else if (estado === "pausado") {
            cambiarEstado("iniciado");
        }
    });

    // Reiniciar la práctica
    restartButton.addEventListener("click", function () {
        resetPractice();
        cambiarEstado("inactivo");
    });

    // Reiniciar estadísticas y texto
    function resetPractice() {
        clearInterval(timer); // Asegurarse de detener cualquier temporizador activo
        timer = null;
        timeLeft = 60; // Reiniciar el tiempo al valor inicial
        currentWordIndex = 0;
        currentCharIndex = 0;
        errors = 0;
        totalWords = 0;
        inputArea.value = "";
        timeDisplay.textContent = `Tiempo restante: 60 s`;
        displayFullText();
        updateStats();
        pauseButton.textContent = "Pausar";
    }

    // Verificar la entrada del usuario
    inputArea.addEventListener("input", function () {
        if (estado !== "iniciado") return;

        const inputText = inputArea.value.trim();
        const currentWord = words[currentWordIndex];
        const currentChar = currentWord[currentCharIndex];

        if (inputText === currentWord) {
            // Palabra completada
            document.querySelectorAll(".texts-display span")[currentWordIndex].classList.remove("highlight");
            currentWordIndex++;
            totalWords++;
            currentCharIndex = 0;

            if (currentWordIndex < words.length) {
                document.querySelectorAll(".texts-display span")[currentWordIndex].classList.add("highlight");
            } else {
                cambiarEstado("finalizado");
                alert("¡Has completado el texto!");
            }

            inputArea.value = "";
        } else if (inputText.endsWith(currentChar)) {
            // Letra correcta
            currentCharIndex++;
            updateKeyDisplay();
        } else {
            // Letra incorrecta
            errors++;
        }

        updateStats();
    });

    // Actualizar la tecla que debe presionarse
    function updateKeyDisplay() {
        const currentWord = words[currentWordIndex] || "";
        const currentChar = currentWord[currentCharIndex] || "";
        keySpan.textContent = currentChar.toUpperCase(); // Mostrar la letra actual
    }

    // Actualizar estadísticas de la práctica
    function updateStats() {
        errorsDisplay.textContent = `Palabras erróneas: ${errors}`;
        totalDisplay.textContent = `Total de palabras: ${totalWords}`;
        wpm = Math.floor((totalWords / (60 - timeLeft)) * 60);
        wpmDisplay.textContent = `Palabras por minuto: ${isNaN(wpm) ? 0 : wpm}`;
    }

    // Cargar el texto inicial
    loadTextFromFile();

    // Estado inicial
    cambiarEstado("inactivo");

const itemList = document.getElementById('itemlist');
const toggleButton = document.getElementById("toggleButton");

        // Agregar evento al botón
        toggleButton.addEventListener("click", function () {
            // Alternar el estilo de visibilidad
            if (itemList.style.display === "none") {
                 itemList.style.display = "block"; // Mostrar el menú
            } else {
                itemList.style.display = "none"; // Ocultar el menú
            }
            });

});