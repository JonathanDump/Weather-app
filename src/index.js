import './index.html';
import { getForecast } from './modules/API';
import {
  camelCase,
  form,
  loadDataOnPage,
  searchBtn,
  searchInput,
  slider,
  switcher,
  dragging,
  dragStart,
  dragStop,
} from './modules/dom-controls';
import './scss/index.scss';

console.log(getForecast('london'));
loadDataOnPage();

searchBtn.addEventListener('click', loadDataOnPage);
switcher.addEventListener('change', loadDataOnPage);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  loadDataOnPage();
});
