document.addEventListener("DOMContentLoaded", function () {
    // Elementos de la interfaz
    const textDisplay = document.querySelector(".texts-display"); // Contenedor de texto completo
    const inputArea = document.querySelector(".input-ingres-text"); // Campo de entrada de texto
    const wpmDisplay = document.querySelector(".stats-display p:nth-child(2)"); // Palabras por minuto
    const timeDisplay = document.querySelector(".stats-display p:nth-child(4)"); // Tiempo restante
    const errorsDisplay = document.querySelector(".stats-display p:nth-child(3)"); // Palabras erróneas
    const totalDisplay = document.querySelector(".stats-display p:nth-child(1)"); // Total de palabras
    const pauseButton = document.querySelector(".stats-display button:nth-child(1)"); // Botón Pausar
    const endButton = document.querySelector(".stats-display button:nth-child(2)"); // Botón Reiniciar

    // Variables para la práctica de mecanografía
    let words = [];
    let currentWordIndex = 0;
    let errors = 0;
    let totalWords = 0;
    let wpm = 0;
    let timeLeft = 60;
    let timer;
    let isPaused = false;

    // Cargar el texto desde un archivo .txt
    function loadTextFromFile() {
        fetch("text.txt")
            .then(response => response.text())
            .then(text => {
                words = text.split(/\s+/); // Separar palabras por espacios y saltos de línea
                displayFullText();
                startPractice();
            })
            .catch(error => console.error("Error al cargar el archivo:", error));
    }

    // Muestra el texto completo y resalta la palabra actual
    function displayFullText() {
        textDisplay.innerHTML = words
            .map((word, index) => `<span ${index === 0 ? 'class="highlight"' : ''}>${word}</span>`)
            .join(" ");
    }

    // Iniciar la práctica
    function startPractice() {
        resetPractice();
        timer = setInterval(updateTime, 1000); // Actualizar cada segundo
    }

    // Verificar la entrada del usuario
    inputArea.addEventListener("input", function () {
        if (isPaused) return;

        const inputText = inputArea.value.trim();
        const currentWord = words[currentWordIndex];

        if (inputText === currentWord) {
            document.querySelectorAll(".display-text-area span")[currentWordIndex].classList.remove("highlight");
            currentWordIndex++;
            totalWords++;

            if (currentWordIndex < words.length) {
                document.querySelectorAll(".display-text-area span")[currentWordIndex].classList.add("highlight");
            } else {
                clearInterval(timer);
                inputArea.disabled = true;
                alert("¡Has completado el texto!");
                return; 
            }

            inputArea.value = ""; 
        } else if (!currentWord.startsWith(inputText)) {
            errors++;
        }

        updateStats();
    });

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
            }
        }
    }

    // Pausar y reanudar la práctica
    pauseButton.addEventListener("click", function () {
        isPaused = !isPaused;
        inputArea.disabled = isPaused;
        pauseButton.textContent = isPaused ? "Reanudar" : "Pausar";
    });

    // Terminar la práctica
    endButton.addEventListener("click", function () {
        clearInterval(timer);
        inputArea.disabled = true;
        alert("Práctica terminada.");
    });

    // Reiniciar la práctica
    function resetPractice() {
        currentWordIndex = 0;
        errors = 0;
        totalWords = 0;
        timeLeft = 60;
        inputArea.disabled = false;
        inputArea.focus();
        updateStats();
        displayFullText();
    }

   // Cargar el texto y empezar práctica
   loadTextFromFile();

   const toggleButton = document.getElementById('toggleButton');

   toggleButton?.addEventListener('click', function () {
    if (itemList.style.display === 'none' || itemList.style.display === '') {
        itemList.style.display = 'block';
    } else {
        itemList.style.display = 'none';
    }
});
});