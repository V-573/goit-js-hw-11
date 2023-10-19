import axios, { isCancel, AxiosError } from 'axios';
import SimpleLightbox from 'simplelightbox';

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
        totalHits = response.data.totalHits;
        // Verificar si se encontraron imágenes
          if (response.data.hits.length === 0) {
            
          // Mostrar notificación si no se encontraron imágenes
          document.querySelector('.gallery').innerHTML = '<p>Sorry, there are no images matching your search query. Please try again.</p>';
      
      
      
          } else {
              console.log(response.data.hits);
              totalHits=response.data.totalHits

                if (response.data.totalHits  > 40 ) {
    
                 
                    document.getElementById('notification').textContent = `guaw! We found ${totalHits} images`;

                    // aparece el boton para cargar mas: 
                
                    document.getElementsByClassName('load-more')[0].style.display = 'block';  
                

              };
              
              displayResults(response.data.hits);
              


       
            
        
          
           
            
            
          }
          

   
            
         

      })
        
        
      .catch(function (error) {
        console.error('Error en la solicitud:', error);
      });




  });






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
