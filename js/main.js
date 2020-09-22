const clock = document.querySelector('.statusbar__clock'),
  toggleLogin = document.getElementById('toggleLogin');
let start = Date.now();
let end = Date.now();
let currentTime = null;

const handelToggLogin = () => {
  if (sessionStorage.getItem('userID')) {
    toggleLogin.parentElement.classList.add('login');
    toggleLogin.href = 'logout.html';
  }
};

const startInterval = () => {
  clearInterval(currentTime); // 리사이징 될때마다 오는 구간... 먼저 등록 되어 있을 경우도 있음
  // 꼭 클리어를 먼저 실행
  currentTime = setInterval(handelClock, 100000);
};

const handleSize = () => {
  // console.log(document.documentElement.clientWidth);
  // console.log(window.innerWidth);
  if (window.innerWidth > 768) clearInterval(currentTime);
  else startInterval();
};

// 시간
const handelClock = () => {
  clock.innerText = '';
  const date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();

  if (hour > 12) hour -= 12;
  if (hour < 10) hour = '0' + hour;
  if (minute > 12) minute -= 12;
  if (minute < 10) minute = '0' + minute;

  clock.innerText = `${hour}:${minute}`;
  console.log('시간업데이트');
};

const init = () => {
  // console.log(window.getComputedStyle(footer).display);
  window.addEventListener('load', handelClock);
  window.addEventListener('resize', handleSize);
  window.addEventListener('load', handelToggLogin);
};

init();
handleSize(); // 사용자가 시작시 size 체크를 위해 init이 끝난뒤 실행
