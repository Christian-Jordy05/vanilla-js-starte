let botonAgrega = document.getElementById("boton")
let contador = document.getElementById("contador")
let conteinerDeLasTareas = document.getElementById("conteinerDeLasTareas")
let inputAgre = document.getElementById("inputAgre")
let texCon = document.getElementById("texCon")
let texAlert = document.getElementById("texAlert")

// Funcion para agregar los div de tarea
botonAgrega.addEventListener("click", function () {
    if (inputAgre.value === "") {
        // Si el usuario intenta agregar una tarea sin texto, se muestra una alerta
        let texAlert2 = document.createElement("p")
        texAlert2.className = "texAlert2"
        texAlert2.textContent = "NO LO PUEDES AGREGAR SIN TEXTO"
        texAlert.appendChild(texAlert2)
        setTimeout(() => {
            texAlert2.innerHTML = ""
        }, 1000);
    } else {
        let tarea = document.createElement("div")
        tarea.className = "divDeTarea"
        conteinerDeLasTareas.insertBefore(tarea, conteinerDeLasTareas.firstChild);
  

        // Agregar el checkbox
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        tarea.appendChild(checkbox)

        // Agregar el texto de la tarea
        let texto = document.createElement("p")
        texto.id = "texto"
        texto.textContent = inputAgre.value
        tarea.appendChild(texto)

        // Agregar la imagen de eliminar
        let eliminar = document.createElement("img");
        eliminar.src = "/img/basura.png"; // Reemplaza con la ruta de tu imagen
        eliminar.id = "elimiar";
        eliminar.addEventListener("click", function () {
            tarea.remove();
        });
        tarea.appendChild(eliminar);

        // Limpiar el input después de agregar la tarea
        inputAgre.value = "";
    }
})