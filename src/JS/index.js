import { guardarTarea, obtenerTareas, borrarTarea, actualizarTarea, actualizarTextoTarea } from "./API.js";

let botonAgrega = document.getElementById("boton");
let conteinerDeLasTareas = document.getElementById("conteinerDeLasTareas");
let inputAgre = document.getElementById("inputAgre");
let texCon = document.getElementById("texCon");
let texAlert = document.getElementById("texAlert");
let numDeconta = document.getElementById("num");

// Función para verificar y actualizar el texto de "texCon"
function actualizarTexCon() {
    let tareas = conteinerDeLasTareas.getElementsByClassName("divDeTarea");
    if (tareas.length === 0) {
        texCon.style.display = "block"; // para mostrar mensaje
    } else {
        texCon.style.display = "none"; // para ocultar mensaje el mensaje
    }
}

// Funcion para verificar bien los checkbox
function actualizarContador() {
    let checkboxes = conteinerDeLasTareas.getElementsByClassName("checkbox");
    let contador = 0;
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            contador++;
        }
    }
    numDeconta.textContent = contador;
}

// Función para mostrar las tareas que están en la API
async function mostrarTareas() {
    let tareas = await obtenerTareas();
    tareas.forEach(tareaData => {
        agregarTarea(tareaData.task, tareaData.id, tareaData.checkbox === 'completado');        
    });
    actualizarTexCon();
    actualizarContador();
}

// Función para agregar la tarea en la página y API
function agregarTarea(textoTarea, idTarea, boxtare) {
    let tarea = document.createElement("div");
    tarea.className = "divDeTarea";
    tarea.dataset.id = idTarea;
    conteinerDeLasTareas.appendChild(tarea, conteinerDeLasTareas);

    // Agregar el checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = boxtare;
    tarea.appendChild(checkbox);
    checkbox.addEventListener("change", async () => {
        try {
            await actualizarTarea(idTarea, checkbox.checked);
            actualizarContador();
        } catch (error) {
        }
    });
    // Agregar el texto de la tarea
    let texto = document.createElement("p");
    texto.id = "texto";
    texto.textContent = textoTarea;
    tarea.appendChild(texto);

    // Aqui creo el input que ayuda a sobreescribir la tarea
    let InputDesobre = document.createElement("input");
    InputDesobre.type = "text";
    InputDesobre.className = "InputDesobre"
   
    InputDesobre.style.display = "none" // Aqui lo oculto 
    tarea.appendChild(InputDesobre)

    // Aqui para que cuando le di click al texto aparezca el input y desaparezca el texto
    texto.addEventListener("dblclick", () => {
         InputDesobre.placeholder = "INGRESE TEXTO PARA SOBRESCRIBIR LA TAREA"
        texto.style.display = "none";
        InputDesobre.style.display = "block";
        InputDesobre.focus(); //
    });

    // Esta funcion es para que al darle enter se guarde el cambio
    InputDesobre.addEventListener("keypress", async (event) => {
        if (event.key == "Enter") {
            let nuevoTexto = InputDesobre.value;
            try {
                await actualizarTextoTarea(idTarea, nuevoTexto);
                texto.textContent = nuevoTexto;
                texto.style.display = "block"; // Mostrar el texto
                InputDesobre.style.display = "none"; // Ocultar el input
            } catch (error) {
                console.error(error);
            }
        }
    });

    // Agregar la imagen de eliminar
    let eliminar = document.createElement("img");
    eliminar.src = "img/basura.png";
    eliminar.id = "elimiar";

    // Aqui para eliminar la tarea con la img
    eliminar.addEventListener("click", async () => {
        try {
            await borrarTarea(idTarea);
            tarea.remove();
            actualizarTexCon();
            actualizarContador();
        } catch (error) {
        }
    });

    // Esto para actualizar alguna cosa que hubo 
    tarea.appendChild(eliminar);
    actualizarTexCon();
    actualizarContador();
}

// Boton para agregar los div de tarea y agregar todo en la API 
botonAgrega.addEventListener("click", async function () {
    if (inputAgre.value === "") {
        let texAlert2 = document.createElement("p");
        texAlert2.className = "texAlert2";
        texAlert2.textContent = "DEBES DE INGRESAR TEXTO";
        texAlert.appendChild(texAlert2);
        setTimeout(() => {
            texAlert2.remove();
        }, 1000);
    } else {
        let textoTarea = inputAgre.value;
        try {
            let tareaGuardada = await guardarTarea(textoTarea);
            if (tareaGuardada) {
                agregarTarea(textoTarea, tareaGuardada.id, tareaGuardada.checkbox);
            }
        } catch (error) {
            console.error(error);
        }
        inputAgre.value = "";
        location.reload();
    }
});

// Muestra las cosas en la pag
mostrarTareas();

// Esta funcion para que el input me pueda leer el "enter"
inputAgre.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        botonAgrega.click();
    }
});