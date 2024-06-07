import { guardarTarea, obtenerTareas, borrarTarea } from "./API.js";

let botonAgrega = document.getElementById("boton");
let conteinerDeLasTareas = document.getElementById("conteinerDeLasTareas");
let inputAgre = document.getElementById("inputAgre");
let texCon = document.getElementById("texCon");
let texAlert = document.getElementById("texAlert");

// Función para verificar y actualizar el texto de "texCon"
function actualizarTexCon() {
    let tareas = conteinerDeLasTareas.getElementsByClassName("divDeTarea");
    if (tareas.length === 0) {
        texCon.style.display = "block"; // para mostrar mensaje
    } else {
        texCon.style.display = "none"; // para ocultar mensaje el mensaje
    }
}

// Función para mostrar las tareas que estan en la API
async function mostrarTareas() {
    let tareas = await obtenerTareas();
    tareas.forEach(tareaData => {
        agregarTarea(tareaData.task, tareaData.id);
    });
    // Actualizar el texto de "texCon"
    actualizarTexCon();
}

// Función para agregar la tarea en la página y API
function agregarTarea(textoTarea, idTarea) {
    let tarea = document.createElement("div");
    tarea.className = "divDeTarea";
    tarea.dataset.id = idTarea; 
    conteinerDeLasTareas.insertBefore(tarea, conteinerDeLasTareas.firstChild);

    // Agregar el checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    tarea.appendChild(checkbox);

    // Agregar el texto de la tarea
    let texto = document.createElement("p");
    texto.id = "texto";
    texto.textContent = textoTarea;
    tarea.appendChild(texto);

    // Agregar la imagen de eliminar
    let eliminar = document.createElement("img");
    eliminar.src = "img/basura.png";
    eliminar.id = "elimiar";
    eliminar.addEventListener("click", async () => {
        try {
            await borrarTarea(idTarea);
            tarea.remove();
            actualizarTexCon();
        } catch (error) {
            console.error("Error al borrar la tarea:", error);
        }
    });
    tarea.appendChild(eliminar);

    // Actualizar el texto de "texCon"
    actualizarTexCon();
    
}

// Función para agregar los div de tarea
botonAgrega.addEventListener("click", async function () {
    if (inputAgre.value === "") {
        // Si el usuario intenta agregar una tarea sin texto, se muestra un texto que no puede
        let texAlert2 = document.createElement("p");
        texAlert2.className = "texAlert2";
        texAlert2.textContent = "DEBES DE INGRESAR TEXTO";
        texAlert.appendChild(texAlert2);
        setTimeout(() => {
            texAlert2.remove();
        }, 1000);
    } else {
        // Aquí me agrega la tarea que fue guardada en el API
        let textoTarea = inputAgre.value;
        try {
            let tareaGuardada = await guardarTarea(textoTarea);
            if (tareaGuardada) {
                agregarTarea(textoTarea, tareaGuardada.id);
            } else {
                throw new Error("Error al guardar la tarea en el servidor.");
            }
        } catch (error) {
            console.error(error);
        }
        // Limpiar el input después de agregar la tarea
        inputAgre.value = "";
        location. reload()
    }
});

actualizarTexCon();
mostrarTareas();

inputAgre.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        botonAgrega.click();
    }
});