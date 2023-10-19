import axios, { isCancel, AxiosError } from 'axios';

let page = 1; // Valor inicial de la paginación
let totalHits = 0; // Variable para almacenar el total de imágenes encontradas

// Manejar el envío del formulario
  document.getElementById('search-form').addEventListener('submit', function (event) {
      event.preventDefault(); // Evitar el envío del formulario tradicional
        // Resetear la página al buscar una nueva palabra clave
  page = 1;


    // Obtener la consulta de búsqueda
    const searchQuery = document.querySelector('input[name="searchQuery"]').value;

    // Realizar la solicitud a la API de Pixabay utilizando Axios
    axios.get(`https://pixabay.com/api/?key=40114076-6792fe4ed8fc0cf826901eacd&q=${searchQuery}&page=${page}&per_page=40`)
      .then(function (response) {
        // Limpiar la galería antes de agregar nuevas tarjetas de imagen
        document.querySelector('.gallery').innerHTML = '';

        // Verificar si se encontraron imágenes
        if (response.data.hits.length === 0) {
          // Mostrar notificación si no se encontraron imágenes
          document.querySelector('.gallery').innerHTML = '<p>Sorry, there are no images matching your search query. Please try again.</p>';
        } else {
          // Mostrar las tarjetas de imagen
          response.data.hits.forEach(function (image) {
            const cardHtml = `
              <div class="photo-card">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
                <div class="info">
                  <p class="info-item"><b>Likes:</b> ${image.likes}</p>
                  <p class="info-item"><b>Views:</b> ${image.views}</p>
                  <p class="info-item"><b>Comments:</b> ${image.comments}</p>
                  <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
                </div>
              </div>
            `;
            document.querySelector('.gallery').insertAdjacentHTML('beforeend', cardHtml);
          });
        }
      })
      .catch(function (error) {
        console.error('Error en la solicitud:', error);
      });
  });