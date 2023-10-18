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
      // Verificar si hay resultados
      if (data.hits.length > 0) {
        displayResults(data.hits);
      } else {
        displayNoResults();
      }
    })
    .catch(error => console.error('Error:', error));
});

function displayResults(images) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  images.forEach(image => {
    const card = document.createElement('div');
    card.innerHTML = `
      <img src="${image.webformatURL}" alt="${image.tags}">
      <p>Likes: ${image.likes}</p>
      <p>Views: ${image.views}</p>
      <p>Comments: ${image.comments}</p>
      <p>Downloads: ${image.downloads}</p>
    `;
    resultsContainer.appendChild(card);
  });
}

function displayNoResults() {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '<p>Sorry, there are no images matching your search query. Please try again.</p>';
}