import { getForecast } from './API';
import { format } from 'date-fns';
import sunny from '/src/icons/sunny.svg';
import clear from '/src/icons/night.svg';
import rain from '/src/icons/rain.svg';
import partlyCloudy from '/src/icons/partly-cloudy.svg';
import cloudy from '/src/icons/cloudy.svg';

export const perHour = document.querySelector('.per-hour');
export const slider = document.querySelector('.slider');
export const switcher = document.querySelector('.switch-button-checkbox');

export const searchInput = document.querySelector('input[type="search"]');
export const searchBtn = document.querySelector('.search__icon');
export const form = document.querySelector('form');
const location = document.querySelector('.location-date__location');
const date = document.querySelector('.location-date__date');

const currentTemp = document.querySelector('.temperature__number');
const feelTemp = document.querySelector('.feel-number');
const cardImg = document.querySelector('#card-img');
const status = document.querySelector('.icon__status');

const uv = document.querySelector('#uv');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const rainChance = document.querySelector('#rain');
const pressure = document.querySelector('#pressure');

const pictures = {
  sunny: sunny,
  clear: clear,
  rain: rain,
  partlyCloudy: partlyCloudy,
  cloudy: cloudy,
};

export async function findCity(e) {
  let city = 'Zhytomyr';
  if (searchInput.value) {
    city = searchInput.value;
  }
  const data = await getForecast(city);
  return data;
}

export async function loadDataOnPage(e) {
  // if (e.type == 'submit') {
  //   e.preventDefault();
  // }

  const data = await findCity();
  if (!data) {
    return;
  }
  location.textContent = `${data['location']['name']}, ${data['location']['country']}`;

  date.textContent = format(new Date(data.location.localtime), 'dd-MMM-yyy');

  if (!pictures[camelCase(data.current.condition.text)]) {
    cardImg.src = data.current.condition.icon;
  } else {
    cardImg.src = pictures[camelCase(data.current.condition.text)];
  }
  status.textContent = data.current.condition.text.toLowerCase();

  uv.textContent = data.current.uv;
  humidity.textContent = data.current.humidity;
  rainChance.textContent = `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;

  if (!switcher.checked) {
    currentTemp.textContent = `${Math.round(data.current.temp_c)}°`;
    feelTemp.textContent = Math.round(data.current.feelslike_c);
    windSpeed.textContent = `${data.current.wind_kph} km/h`;
    pressure.textContent = `${data.current.pressure_mb} mb`;
  } else if (switcher.checked) {
    currentTemp.textContent = `${Math.round(data.current.temp_f)}°`;
    feelTemp.textContent = Math.round(data.current.feelslike_f);
    windSpeed.textContent = `${data.current.wind_kph} m/h`;
    pressure.textContent = `${data.current.pressure_mb} in`;
  }

  const hours = data.forecast.forecastday[0].hour;
  slider.innerHTML = '';
  hours.forEach((hour) => {
    slider.innerHTML += `
      <div class="info-pill">
          <div class="info-pill__time">${format(
            new Date(hour.time),
            'HH:mm'
          )}</div>
          <div class="info-pill__icon"><img src="${findPicture(
            hour.condition.temp,
            hour
          )}" alt=""></div>
          <div class="info-pill__number">${Math.round(
            switcher.checked ? hour.temp_f : hour.temp_c
          )}</div>
        </div>`;
  });
  searchInput.value = '';
  setColor(Math.round(data.current.temp_c));
}

export function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

function findPicture(condition, hour) {
  if (!pictures[condition]) {
    return hour.condition.icon;
  } else {
    return pictures[condition];
  }
}

function setColor(temp) {
  const initialColor = [128, 166, 128];
  const circle = document.querySelector('.circle');
  circle.style.backgroundColor = `rgba(${initialColor[0] + temp * 5}, 166, ${
    initialColor[2] - temp * 5
  }, 0.4)`;
}
