document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value.trim();
    if (query) {
        buscarImagenesNasa(query);
    }
});

function buscarImagenesNasa(query) {
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { items: resultados } = data.collection; // Desestructuración aquí
            mostrarResultados(resultados);
        })
        .catch(error => {
            console.error('Error al buscar las imágenes:', error);
        });
}

function mostrarResultados(resultados) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; 

    resultados.forEach(item => {
        const { data: [data], links } = item; // Desestructuración del item
        const imageUrl = links ? links[0].href : ''; // No es necesario desestructurar aquí

        const col = document.createElement('div');
        col.classList.add('col-md-4', 'd-flex', 'justify-content-end', 'mb-3');
        
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');
        card.style.width = '18rem';

        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            img.classList.add('card-img-top', 'img-custom');
            img.alt = data.title || 'Imagen NASA';
            card.appendChild(img);
        }

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h2');
        title.classList.add('card-title');
        title.textContent = data.title;
        cardBody.appendChild(title);

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = data.description;
        cardBody.appendChild(description);

        const date = document.createElement('p');
        date.classList.add('text-muted');
        date.textContent = `Fecha: ${data.date_created}`;
        cardBody.appendChild(date);

        card.appendChild(cardBody);
        contenedor.appendChild(card);
    });
}
