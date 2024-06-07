// Guardar tarea
export let guardarTarea = async (tarea, estadoCheckbox = "incompleto") => {
    try {
        const response = await fetch("http://localhost:3000/api/task", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: tarea,
                checkbox: estadoCheckbox
            })
        });

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

// Actualiza el API
export let actualizarTarea = async (id, estadoCheckbox) => {
    try {
        const estado = estadoCheckbox ? "completado" : "incompleto";  //esto muestra en el API que si el chek 
        //esta marcado si o no  aunque esto no era necesario creo profe
        const response = await fetch(`http://localhost:3000/api/task/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                checkbox: estado
            })
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// Obtener del tareas del API
export let obtenerTareas = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/task", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Borrar tarea
export let borrarTarea = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/task/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}