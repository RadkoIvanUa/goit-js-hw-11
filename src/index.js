import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import Notiflix from 'notiflix';

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// https://pixabay.com/api/?key=20762645-ca024ef3775a46c729ffc2665&q=cat&image_type=photo&orientation=horizontal&safesearch=true
