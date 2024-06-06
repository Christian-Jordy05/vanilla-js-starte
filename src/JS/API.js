 export let guardarTarea = async (tarea) => {
    try {
        const response = await fetch("http://localhost:3000/api/task", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task: tarea
            })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


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
        return data; // Retornar las tareas obtenidas
    } catch (error) {
        console.log(error);
        return [];
    }
};

