

const guardarTarea = async (tarea) =>{
    try{
        const response = await fetch('http://localost:3000/api/task',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({

                task : tarea,
            })
        });
        const data = await response.json();

        console.log(data);
    }catch(error){
        console.log(data);
    }
}

export {guardarTarea}