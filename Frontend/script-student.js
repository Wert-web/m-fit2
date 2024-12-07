document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleButton");
    const itemList = document.getElementById("itemlist");
    const btnNavContainer = document.querySelector(".btn-nav-container");
    const cardContainer = document.querySelector(".card-container");
    const btnPerfil = document.getElementById("btn-perfil");
    const btnAddClass = document.getElementById("btn-add-class");
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");
    const formContainer = document.getElementById("form-container");

    const forms = {
        registerClass: `
            <form class="register-form" id="register-class-form" method="POST">
                <h3>Registrarse a una clase:</h3>
                <label>Clase:</label>
                <select id="class_id" name="class_id" required>
                    <option value="" disabled selected>Elige una opción</option>
                </select>
                <button type="submit">Enviar</button>
            </form>
        `
    };

    // Botón de toggle para mostrar/ocultar el itemlist
    if (toggleButton && itemList) {
        toggleButton.addEventListener("click", function () {
            if (itemList.style.display === "none") {
                itemList.style.display = "block";
            } else {
                itemList.style.display = "none";
            }
            console.log("Botón de toggle presionado"); // Depuración
        });
    }

    // Función para redirigir a una página específica
    function redirectTo(url) {
        window.location.href = url;
    }

    // Botón de Perfil
    if (btnPerfil) {
        btnPerfil.addEventListener("click", function () {
            redirectTo("pagina-perfil.html"); // Cambia "pagina-perfil.html" a la URL de la página de perfil
        });
    } else {
        console.error("Botón de Perfil no encontrado");
    }

    // Botón de Registrarse a una clase
    if (btnAddClass) {
        btnAddClass.addEventListener("click", function () {
            renderForm("registerClass");
            modal.style.display = "block";
            console.log("Botón de Registrarse a una clase presionado");
            fetchClassesForSelect("class_id"); // Llenar el select con todas las clases disponibles
        });
    } else {
        console.error("Botón de Registrarse a una clase no encontrado");
    }

    // Cerrar el modal
    if (closeModal) {
        closeModal.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    // Cerrar el modal si se hace clic fuera del modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Función para mostrar el formulario según la vista actual
    function renderForm(view) {
        formContainer.innerHTML = forms[view] || `<p>Formulario no disponible.</p>`;
        const registerForm = document.getElementById("register-class-form");

        if (registerForm) {
            registerForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevenir el envío del formulario

                const classId = document.getElementById("class_id").value;

                // Aquí puedes añadir la lógica para registrarse a una clase
                fetch('../backend/php/register_class.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ class_id: classId })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Registrado exitosamente.");
                        modal.style.display = "none";
                        // Actualizar la lista de clases después de registrarse
                        fetchUserClasses();
                    } else {
                        alert("Error al registrarse: " + data.message);
                    }
                })
                .catch(error => console.error("Error al registrarse:", error));
            });
        } else {
            console.error("Formulario de registro no encontrado");
        }
    }

    // Función para llenar el select de clases en el formulario
    function fetchClassesForSelect(selectId) {
        fetch('../backend/php/get_all_class.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            if (!Array.isArray(data.classes)) {
                throw new Error('La respuesta no es un array válido');
            }
            console.log('Clases obtenidas:', data.classes);
            const select = document.getElementById(selectId);
            select.innerHTML = '<option value="" disabled selected>Elige una opción</option>';
            data.classes.forEach(classItem => {
                const option = document.createElement('option');
                option.value = classItem.id_class;
                option.textContent = classItem.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener las clases:', error));
    }

    // Botón de Cerrar Sesión
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function () {
            fetch('../backend/php/logout.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    alert("Sesión cerrada exitosamente.");
                    redirectTo("login-index.php"); // Cambia "pagina-login.html" a la URL de la página de inicio de sesión
                } else {
                    alert("Error al cerrar la sesión: " + data.error);
                }
            })
            .catch(error => {
                console.error("Error al cerrar la sesión:", error);
                alert("Ocurrió un error al cerrar la sesión.");
            });
        });
    } else {
        console.error("Botón de Cerrar Sesión no encontrado");
    }

    // Función para obtener clases del usuario
    function fetchUserClasses() {
        fetch('../backend/php/get_user_class.php')
        .then(response => {
            console.log(response); // Añadir esto para depuración
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            if (!Array.isArray(data.classes)) {
                throw new Error('La respuesta no es un array válido');
            }
            console.log('Clases del usuario obtenidas:', data.classes);
            populateClassButtons(data.classes);
        })
        .catch(error => console.error('Error al obtener las clases:', error));
    }
    

    // Función para rellenar los botones de clases
    function populateClassButtons(classes) {
        btnNavContainer.innerHTML = "";
        classes.forEach(classItem => {
            const btn = document.createElement("button");
            btn.className = "btn-nav";
            btn.textContent = classItem.name;
            btn.dataset.idClass = classItem.id_class;
            btn.addEventListener("click", function () {
                localStorage.setItem("classId", classItem.id_class);
                fetchClassBlocks(classItem.id_class);
            });
            btnNavContainer.appendChild(btn);
        });
    }

    // Función para obtener bloques de una clase
    function fetchClassBlocks(idClass) {
        fetch('../backend/php/get_class_blocks.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_class: idClass })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Bloques obtenidos para la clase:', data.blocks); // Depuración
            if (data.success) {
                populateClassBlocks(data.blocks);
            } else {
                alert("Error al obtener los bloques: " + data.message);
            }
        })
        .catch(error => console.error("Error al obtener los bloques:", error));
    }

    // Función para rellenar las cartas de bloques
    function populateClassBlocks(blocks) {
        cardContainer.innerHTML = "";
        blocks.forEach(block => {
            const card = document.createElement("div");
            card.className = "item-card";
            card.innerHTML = `
                <div class="item-info-card">
                    <h3>${block.name}</h3>
                    <p>${block.description}</p>
                    <div>
                        <button class="generic-button"><span>Entrar</span></button>
                    </div>
                </div>
            `;
            card.querySelector(".generic-button").addEventListener("click", function () {
                // Aquí puedes añadir la lógica para entrar a los detalles del bloque
                console.log(`Entrar al bloque ${block.id_class_block}`);
            });
            cardContainer.appendChild(card);
        });
    }

    // Llamar a la función para obtener las clases del usuario
    fetchUserClasses();

    function populateClassBlocks(blocks) {
        const cardContainer = document.querySelector(".card-container");
        cardContainer.innerHTML = "";
        blocks.forEach(block => {
            const card = document.createElement("div");
            card.className = "item-card";
            card.innerHTML = `
                <div class="item-info-card">
                    <h3>${block.name}</h3>
                    <p>${block.description}</p>
                    <div>
                        <button class="generic-button" data-id-block="${block.id_block}"><span>Entrar</span></button>
                    </div>
                </div>
            `;
            card.querySelector(".generic-button").addEventListener("click", function () {
                const blockId = this.getAttribute("data-id-block");
                console.log(`Entrar al bloque ${blockId}`); // Depuración
                localStorage.setItem("blockId", blockId);
                window.location.href = "index.html"; // Redirige a index.html
            });
            cardContainer.appendChild(card);
        });
    }
    
    
});
