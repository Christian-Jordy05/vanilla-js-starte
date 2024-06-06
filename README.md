### Iniciar la aplicación

```
npm start
```

// Opcional: Mostrar un mensaje de error al usuario
            let texAlert2 = document.createElement("p");
            texAlert2.className = "texAlert2";
            texAlert2.textContent = "No se pudo guardar la tarea en el servidor.";
            texAlert.appendChild(texAlert2);
            setTimeout(() => {
                texAlert2.remove();
            }, 1000);