import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import Notiflix from 'notiflix';

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '20762645-ca024ef3775a46c729ffc2665';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.js-gallery'),
};

refs.form.addEventListener('submit', heandlerOnSubmit);

function heandlerOnSubmit(e) {
  e.preventDefault();

  const searchQuery = e.target.elements.searchQuery.value.trim();

  const searchedObj = searchPhoto(searchQuery);

  searchedObj
    .then(result => (refs.gallery.innerHTML = createMurkup(result.data.hits)))
    .catch(error => {
      if (error.response) {
        // Запит було зроблено, і сервер відповів кодом стану, який
        // виходить за межі 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // Запит було зроблено, але відповіді не отримано
        // `error.request` - це екземпляр XMLHttpRequest у браузері та екземпляр
        // http.ClientRequest у node.js
        console.log(error.request);
      } else {
        // Щось сталося під час налаштування запиту, що викликало помилку
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
}

async function searchPhoto(q) {
  try {
    const response = await axios(
      `${BASE_URL}${API_KEY}&q=${q}}&image_type=photo&orientation=horizontal&safesearch=true&page=2`
    );

    return response;
  } catch {
    throw new Error('Помилка');
  }
}

function createMurkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        ` <div class="photo-card">
          <div class="thumb">
            <a href="${largeImageURL}}"
              ><img src="${webformatURL}" alt="${tags}" loading="lazy"
            /></a>
          </div>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              <span>${likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b>
              <span>${views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b>
              <span>${comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b>
              <span>${downloads}</span>
            </p>
          </div>
        </div>`
    )
    .join('');
}
