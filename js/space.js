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
            const resultados = data.collection.items;
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
        const data = item.data[0];
        const imageUrl = item.links ? item.links[0].href : '';

        const col = document.createElement('div');
        col.classList.add('col-md-4', 'd-flex', 'justify-content-start', 'mb-3');
        
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

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = data.title;
        cardBody.appendChild(title);

        const description = document.createElement('p');
        description.classList.add('card-text');
        description.textContent = data.description || 'No hay descripción disponible';
        cardBody.appendChild(description);

        const date = document.createElement('p');
        date.classList.add('text-muted');
        date.textContent = `Fecha: ${data.date_created}`;
        cardBody.appendChild(date);

        card.appendChild(cardBody);
        contenedor.appendChild(card);
    });
}