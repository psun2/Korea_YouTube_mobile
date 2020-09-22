const printWeather = (temperature) => {
  document.querySelector(
    '.statusbar__weather',
  ).innerText = `현재날씨: ${temperature}도`;
};

// study 테스트
const requestXML = (url) => {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.status === 200 && xhr.readyState === 4) {
      //   console.log(xhr.responseURL);
      //   console.log(xhr.responseText);
      //   console.log(JSON.parse(xhr.responseText));
      //   console.log(xhr.responseXML);
      //   console.log(xhr.timeout);
      //   console.log(
      //     new window.DOMParser().parseFromString(xhr.responseText, 'text/xml'),
      //   );
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
};

const getWeather = async () => {
  const position = JSON.parse(localStorage.getItem('coords'));
  const latitude = position.latitude;
  const longitude = position.longitude;
  const API_KEY = 'bbc6229f5e4d98c82e1e4918cfa841a3';

  // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
  // 기본: 화씨
  // units=metri 옵션추가: 섭씨

  const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

  const response = await fetch(url);

  const json = await response.json();

  const temperature = await json.main.temp;

  requestXML(url);
  printWeather(temperature);
};

const saveCoords = (coordsObj) => {
  localStorage.setItem('coords', JSON.stringify(coordsObj));
};

const geoFail = () => {
  console.error('위치정보를 가져오는데 실패 했습니다.');
};

const geoSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather();
};

const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(geoSuccess, geoFail);
};

const loadedCoords = () => {
  const loadedCoords = localStorage.getItem('coords');
  if (loadedCoords) {
    getWeather();
  } else {
    askForCoords();
  }
};

const weatherInit = () => {
  loadedCoords();
};
weatherInit();
