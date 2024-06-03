// Inserte el código aquí
let botonAgrega = document.getElementById("boton")
let contador = document.getElementById("contador")
let conteinerDeLasTareas = document.getElementById("conteinerDeLasTareas")
let inputAgre = document.getElementById("inputAgre")
let texCon = document.getElementById("texCon")
let texAlert = document.getElementById("texAlert")

//funcion para agregar los div de tarea
botonAgrega.addEventListener("click" , function(){
    if (inputAgre.value === "")  {
        /*aqui por si el usurio el da ingresar tarea y si no tiene texto le manda un alert 
        diciendo que no se puede dejar blanco*/
        let texAlert2 = document.createElement("h2")
        texAlert2.style.color = "red"
        texAlert2.textContent = "no se puede dejar sin texto"
        texAlert.appendChild(texAlert2)
    } else {
        let tarea = document.createElement("div")
        let hola = conteinerDeLasTareas.appendChild(tarea)
        tarea.appendChild(texCon)
        tarea.innerHTML = inputAgre.value
        console.log(hola);
    }
})