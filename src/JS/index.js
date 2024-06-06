import { guardarTarea,obtenerTareas } from "./API.js";

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
        agregarTarea(tareaData.task);
    });
    // Actualizar el texto de "texCon"
    actualizarTexCon();
}

// funcion para agregar la tarea en la pag y API
function agregarTarea(textoTarea) {
    let tarea = document.createElement("div");
    tarea.className = "divDeTarea";

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
    eliminar.addEventListener("click", function () {
        tarea.remove();
        actualizarTexCon();
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
        // aqui me agrega la tarea que fue guardada en el API
        let textoTarea = inputAgre.value;
        agregarTarea(textoTarea);

        // Limpiar el input después de agregar la tarea
        inputAgre.value = "";

        // aqui me indica que hubo un error en guardar la tarea pero si se guardo no muestra
        try {
            let tareaGuardada = await guardarTarea(textoTarea);
            if (tareaGuardada) {
                throw new Error("Error al guardar la tarea en el servidor.");
            }
        } catch (error) {
            console.error(error);
            
        }
    }
});
actualizarTexCon();

document.addEventListener("DOMContentLoaded", function() {
   
    mostrarTareas();
});