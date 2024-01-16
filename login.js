document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-button");
    const forgotPasswordLink = document.getElementById("forgot-password");
    const registerLink = document.getElementById("register");
    const usersTable = document.getElementById("users-table");

    const createHash = (text) => {
        return md5(text); // Función para crear un hash MD5 de una cadena
    };

    // Variable para almacenar los datos del archivo "datos.json"
    let usuariosValidos = [];

    // Crear una nueva instancia de XMLHttpRequest
    const xhr = new XMLHttpRequest();

    // Configurar la solicitud
    xhr.open('GET', 'datos.json', true);

    // Manejar la carga de datos
    xhr.onload = function () {
        if (xhr.status === 200) {
            const jsonText = xhr.responseText;
            usuariosValidos = JSON.parse(jsonText);
            console.log("Datos cargados correctamente:", usuariosValidos); // Verificar en la consola si los datos se cargan correctamente
        } else {
            console.error('Error al cargar datos.json:', xhr.statusText);
        }
    };

    // Manejar errores de red
    xhr.onerror = function () {
        console.error('Error de red al cargar datos.json');
    };

    // Enviar la solicitud
    xhr.send();



    
    loginButton.addEventListener("click", function () {
        const username = document.getElementById("username").value;
        const password = createHash(document.getElementById("password").value);

        // Verificar si el usuario y la contraseña coinciden con los datos del JSON
        const usuarioValido = usuariosValidos.find(user => user.user === username && user.passwd === password);

        if (usuarioValido) {
            alert("Inicio de sesión exitoso");

            // Mostrar la tabla de usuarios
            mostrarTablaUsuarios(usuariosValidos);
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });

    // Event listener para el vínculo "Olvidé mi contraseña"
    forgotPasswordLink.addEventListener("click", function () {
        // Ocultar el formulario de inicio de sesión
        loginForm.style.display = "none";
        
        // Mostrar el formulario de recuperación de contraseña
        const recoveryFormContainer = document.getElementById("recovery-form-container");
        recoveryFormContainer.style.display = "block";
    });

    // Event listener para el botón "Buscar" en el formulario de recuperación de contraseña
    const searchQuestionButton = document.getElementById("search-question-button");
    searchQuestionButton.addEventListener("click", function () {
        const recoveryEmail = document.getElementById("recovery-email").value;
        const recoveryAnswer = createHash(document.getElementById("recovery-answer").value); // Nueva línea
        
        // Buscar el usuario correspondiente en el JSON
        const usuario = usuariosValidos.find(user => user.email === recoveryEmail);
        
        if (usuario) {
            // Mostrar la pregunta de seguridad y el campo de respuesta
            const recoveryQuestionText = document.getElementById("recovery-question-text");
            recoveryQuestionText.textContent = usuario.question;
            const recoveryQuestionContainer = document.getElementById("recovery-question-container");
            recoveryQuestionContainer.style.display = "block";


            if (usuario.answer === recoveryAnswer) {
                alert("Respuesta correcta. Tu contraseña es: " + usuario.passwd);
                const recoveryFormContainer = document.getElementById("recovery-form-container");
                recoveryFormContainer.style.display = "none";
    
                const newPasswordFormContainer = document.getElementById("new-password-form-container");
                newPasswordFormContainer.style.display = "block";

                const usernameText = document.getElementById("username-text");
                usernameText.textContent = `Usuario: ${usuario.user}`;
                
            // Event listener para el botón "Contraseña Actualizada"
            const updatePasswordButton = document.getElementById("send-new-password-button");
            updatePasswordButton.addEventListener("click", function () {
                const newPassword = createHash(document.getElementById("new-password").value);
                const confirmPassword = createHash(document.getElementById("confirm-password").value);

                if (newPassword === confirmPassword) {
                    // Actualizar la contraseña en el JSON
                    usuario.passwd = newPassword;
                    alert("Contraseña actualizada con éxito.");
                    
                    // Redirigir al primer formulario de inicio de sesión
                    newPasswordFormContainer.style.display = "none";
                    loginForm.style.display = "block";
                } else {
                    alert("Las contraseñas no coinciden. Inténtalo de nuevo.");
                }
            });
            }
        } else {
            alert("No se encontró ningún usuario con ese correo electrónico.");
        }
    });


    registerLink.addEventListener("click", function () {
        // Ocultar el formulario de inicio de sesión
        loginForm.style.display = "none";
        // Mostrar el formulario de recuperación de contraseña
        const registrationFormContainer = document.getElementById("registration-form-container");
        registrationFormContainer.style.display = "block";


        const CreateUsrButton = document.getElementById("create-user-button");
        CreateUsrButton.addEventListener("click", function(){
    
            const newUsername = document.getElementById("newusr-username").value;
            const newEmail = document.getElementById("newusr-email").value;
            const newPassword = createHash(document.getElementById("newusr-password").value);
            const confirmNewPassword = createHash(document.getElementById("confirm-newusr-password").value);
            const securityQuestion = document.getElementById("newusr-security-question").value;
            const securityAnswer = createHash(document.getElementById("newusr-security-answer").value);
            const userType = document.getElementById("user-type").value;
        
        
        
            // Validar que las contraseñas coincidan
            if (newPassword !== confirmNewPassword) {
                alert("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
                return;
            }
        
            // Crear un nuevo usuario y agregarlo al array
            const newUser = {
                user: newUsername,
                email: newEmail,
                passwd: newPassword,
                question: securityQuestion,
                answer: securityAnswer,
                admin: userType === "admin"
            };
        
            usuariosValidos.push(newUser);
        
            // Limpiar los campos del formulario
            document.getElementById("newusr-username").value = "";
            document.getElementById("newusr-email").value = "";
            document.getElementById("newusr-password").value = "";
            document.getElementById("confirm-newusr-password").value = "";
            document.getElementById("newusr-security-answer").value = "";
        
            // Mostrar mensaje de éxito
            alert("Usuario registrado con éxito."); 
         
            // Ocultar el formulario de registro
            registrationFormContainer.style.display = "none";
        
            // Mostrar la tabla de usuarios actualizada
            mostrarTablaUsuarios(usuariosValidos);     
        });        
    });


// Función para mostrar la tabla de usuarios
function mostrarTablaUsuarios(usuarios) {
    // Crear una tabla para mostrar los usuarios
    let tableHTML = '<table><thead><tr><th>Nombre</th><th>Correo</th><th>Acción</th></tr></thead><tbody>';

    usuarios.forEach(usuario => {
        tableHTML += `<tr><td>${usuario.user}</td><td>${usuario.email}</td><td><button class="borrar-usuario-button" data-username="${usuario.user}">Borrar</button></td></tr>`;
    });

    tableHTML += '</tbody></table>';
    usersTable.innerHTML = tableHTML;

    // Agregar event listener a los botones de borrar usuario
    const borrarUsuarioButtons = document.querySelectorAll(".borrar-usuario-button");
    borrarUsuarioButtons.forEach(button => {
        button.addEventListener("click", function () {
            const username = button.getAttribute("data-username");
            borrarUsuario(username);
        });
    });
}

// Función para borrar un usuario
function borrarUsuario(nombreUsuario) {
    const indiceUsuario = usuariosValidos.findIndex(user => user.user === nombreUsuario);
    if (indiceUsuario !== -1) {
        usuariosValidos.splice(indiceUsuario, 1);
        mostrarTablaUsuarios(usuariosValidos);
    }
}
});
