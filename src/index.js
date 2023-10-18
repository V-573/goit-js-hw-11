let page = 1; // Valor inicial de la paginación
let totalHits = 0; // Variable para almacenar el total de imágenes encontradas

document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Resetear la página al buscar una nueva palabra clave
  page = 1;

  const searchQuery = document.querySelector('input[name="searchQuery"]').value;

  // Tu clave de acceso de Pixabay
  const apiKey = '40114076-6792fe4ed8fc0cf826901eacd';

  // Construir la URL de la API de Pixabay con paginación
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchQuery)}&page=${page}&per_page=40`;

  // Realizar la solicitud HTTP
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Limpiar la galería antes de mostrar nuevos resultados
      clearGallery();

      // Verificar si hay resultados
      if (data.hits.length > 0) {
        totalHits = data.totalHits; // Almacenar el total de imágenes encontradas
        displayResults(data.hits);

        // Mostrar el botón de carga más
        document.getElementById('load-more').style.display = 'block';
      } else {
        displayNoResults();
      }

      // Verificar si se han alcanzado todos los resultados
      if (data.totalHits <= page * 40) {
        // Ocultar el botón de carga más y mostrar notificación
        document.getElementById('load-more').style.display = 'none';
        document.getElementById('notification').innerHTML = "We're sorry, but you've reached the end of search results.";
      } else {
        // Limpiar la notificación si hay más resultados
        document.getElementById('notification').innerHTML = `Hooray! We found ${totalHits} images.`;
      }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('load-more').addEventListener('click', function () {
  page++;

  const searchQuery = document.querySelector('input[name="searchQuery"]').value;

  // Tu clave de acceso de Pixabay
  const apiKey = '40114076-6792fe4ed8fc0cf826901eacd';

  // Construir la URL de la API de Pixabay con paginación
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchQuery)}&page=${page}&per_page=40`;

  // Realizar la solicitud HTTP
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Verificar si hay resultados
      if (data.hits.length > 0) {
        displayResults(data.hits);
      }

      // Verificar si se han alcanzado todos los resultados
      if (data.totalHits <= page * 40) {
        // Ocultar el botón de carga más y mostrar notificación
        document.getElementById('load-more').style.display = 'none';
        document.getElementById('notification').innerHTML = "We're sorry, but you've reached the end of search results.";
      }
    })
    .catch(error => console.error('Error:', error));
});

function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

function displayResults(images) {

const gallery = document.querySelector('.gallery');

  images.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('photo-card');
    card.innerHTML = `
      <a href="${image.largeImageURL}" data-lightbox="gallery">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    `;
    gallery.appendChild(card);
  });

  // Inicializar SimpleLightbox después de agregar las imágenes
  const lightbox = new SimpleLightbox('[data-lightbox="gallery"]');
}






function displayNoResults() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '<p>Sorry, there are no images matching your search query. Please try again.</p>';
}
