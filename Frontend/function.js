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
    let words = [];
    let currentWordIndex = 0;
    let currentCharIndex = 0; // Índice de la letra actual en la palabra
    let errors = 0;
    let totalWords = 0;
    let wpm = 0;
    let timeLeft = 60;
    let timer;
    let isPaused = false;
    let isStarted = false;

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

    // Iniciar la práctica
    function startPractice() {
        resetPractice();
        isStarted = true;
        inputArea.disabled = false;
        timer = setInterval(updateTime, 1000); // Actualizar cada segundo
        startButton.disabled = true; // Desactivar el botón Start
    }

    // Verificar la entrada del usuario
    inputArea.addEventListener("input", function () {
        if (!isStarted || isPaused) return;

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
                clearInterval(timer);
                inputArea.disabled = true;
                alert("¡Has completado el texto!");
                startButton.disabled = false; // Reactivar Start tras completar
                return;
            }

            inputArea.value = "";
        } else if (inputText.endsWith(currentChar)) {
            // Letra correcta
            currentCharIndex++;
            updateKeyDisplay(); // Actualizar el contenido de la tecla
        } else if (!currentChar.startsWith(inputText.slice(-1))) {
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

    // Actualizar el tiempo restante
    function updateTime() {
        if (!isPaused) {
            timeLeft--;
            timeDisplay.textContent = `Tiempo restante: ${timeLeft} s`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                inputArea.disabled = true;
                alert("Tiempo finalizado!");
                startButton.disabled = false; // Reactivar Start cuando el tiempo termine
                isStarted = false;
            }
        }
    }

    // Pausar y reanudar la práctica
    pauseButton.addEventListener("click", function () {
        if (!isStarted) return;
        isPaused = !isPaused;
        inputArea.disabled = isPaused;
        pauseButton.textContent = isPaused ? "Reanudar" : "Pausar";
    });

    // Reiniciar la práctica
    restartButton.addEventListener("click", function () {
        clearInterval(timer);
        resetPractice();
        isStarted = false;
        inputArea.disabled = true;
        startButton.disabled = false; // Reactivar Start tras reiniciar
    });

    // Reiniciar estadísticas y texto
    function resetPractice() {
        currentWordIndex = 0;
        currentCharIndex = 0;
        errors = 0;
        totalWords = 0;
        timeLeft = 60;
        isPaused = false;
        pauseButton.textContent = "Pausar";
        inputArea.value = "";
        updateStats();
        displayFullText();
    }

    // Iniciar práctica al presionar Start
    startButton.addEventListener("click", function () {
        startPractice();
    });

    // Cargar el texto inicial
    loadTextFromFile();

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