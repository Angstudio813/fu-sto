document.addEventListener("DOMContentLoaded", function() {
    // Cargar el archivo JSON correspondiente a esta página
    fetch('remontadasHistoricas.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("contenido-historias");

            // Iterar sobre las historias en el JSON
            data.historias.forEach(historia => {
                // Crear el contenedor para cada historia
                const historiaElement = document.createElement("section");
                historiaElement.classList.add("historia");

                // Título de la historia
                const tituloElement = document.createElement("h2");
                tituloElement.textContent = historia.titulo;
                historiaElement.appendChild(tituloElement);

                // Fecha de la historia
                const fechaElement = document.createElement("p");
                fechaElement.textContent = `Fecha: ${historia.fecha}`;
                historiaElement.appendChild(fechaElement);

                // Imagen de la historia
                const imagenElement = document.createElement("img");
                imagenElement.src = historia.imagen;
                imagenElement.alt = historia.titulo;
                imagenElement.classList.add("imagen-historia");
                historiaElement.appendChild(imagenElement);

                // Descripción de la historia
                const descripcionElement = document.createElement("p");
                descripcionElement.textContent = historia.descripcion;
                historiaElement.appendChild(descripcionElement);

                // Contenido completo de la historia
                const contenidoElement = document.createElement("p");
                contenidoElement.textContent = historia.contenido;
                historiaElement.appendChild(contenidoElement);

                // Agregar el enlace al video con lazy loading
                const videoContainer = document.createElement("div");
                const videoId = getVideoId(historia.videoUrl);
                const videoThumbnail = document.createElement("img");
                videoThumbnail.src = `https://img.youtube.com/vi/${videoId}/0.jpg`;  // Miniatura de YouTube
                videoThumbnail.alt = "Ver video";
                videoThumbnail.classList.add("video-thumbnail");
                videoContainer.appendChild(videoThumbnail);

                // Al hacer clic en la miniatura, cargamos el video
                videoThumbnail.addEventListener("click", function() {
                    const iframe = document.createElement("iframe");
                    iframe.width = "560";
                    iframe.height = "315";
                    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                    iframe.frameBorder = "0";
                    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
                    iframe.allowFullscreen = true;
                    videoContainer.innerHTML = "";  // Elimina la miniatura
                    videoContainer.appendChild(iframe);  // Añade el iframe del video
                });

                historiaElement.appendChild(videoContainer);

                // Añadir la historia al contenedor principal
                container.appendChild(historiaElement);
            });
        })
        .catch(error => {
            console.error("Error al cargar el archivo JSON:", error);
        });
});

// Función para obtener el ID del video de YouTube
function getVideoId(url) {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/)|https?:\/\/youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    if (match) {
        return match[1];
    }
    return null;
}
