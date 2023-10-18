document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const searchQuery = document.querySelector('input[name="searchQuery"]').value;

  // Tu clave de acceso de Pixabay
  const apiKey = '40114076-6792fe4ed8fc0cf826901eacd';

  // Construir la URL de la API de Pixabay
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchQuery)}`;

  // Realizar la solicitud HTTP
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Limpiar la galería antes de mostrar nuevos resultados
      clearGallery();

      // Verificar si hay resultados
      if (data.hits.length > 0) {
        displayResults(data.hits);
      } else {
        displayNoResults();
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
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    `;
    gallery.appendChild(card);
  });
}

function displayNoResults() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '<p>Sorry, there are no images matching your search query. Please try again.</p>';
}
