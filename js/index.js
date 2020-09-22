const footer = document.querySelector('.footer'),
  main = document.querySelector('.index'),
  scroll = document.querySelector('.scroll'),
  scrollTop = document.querySelector('.scroll__top'),
  scrollBottom = document.querySelector('.scroll__bottom');
const src = [
  'https://cdn.videvo.net/videvo_files/video/premium/video0227/small_watermarked/07_Ozero_Naumova_45_follow_preview.webm',
  'https://www.videvo.net/videvo_files/converted/2013_12/preview/CROWD_JUMPS_LIGHTS_PULSE.mov15296.webm',
  'https://cdn.videvo.net/videvo_files/video/free/2017-06/small_watermarked/160409_A_017_preview.webm',
];
let maxScrollTop = 0;
let startScrollInterval = null;
let avatarNum = 4;

const handelResize = () => {
  const width = document.documentElement.clientWidth;
  // console.log('width: ' + width);
  // console.log(document.documentElement.clientWidth);
  if (width > 768) window.removeEventListener('scroll', handelScroll);
  else window.addEventListener('scroll', handelScroll);
};

const scrollInterval = () => {
  clearInterval(startScrollInterval); // 인터벌을 바로 지움으로써 한번만 연산하고 인터벌 종료
  scroll.classList.add('hide');
  footer.classList.remove('hide');
};

const handelClickScrollDown = () => {
  window.scrollTo(0, maxScrollTop);
};

const handelClickScrollUp = () => {
  window.scrollTo(0, 0);
};

const sleep = (ms) => {
  start = Date.now();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, ms);
  });
};

const inputData = () => {
  window.removeEventListener('scroll', handelScroll);
  for (let i = 0; i < 3; i++) {
    let num = Math.floor(Math.random() * 4);
    main.innerHTML +=
      '<div class="index__content">' +
      ' <div class="content__video">' +
      '<video' +
      ' src="' +
      src[num] +
      '"' +
      'controls ' +
      'autoplay' +
      '></video>' +
      '</div>' +
      ' <div class="content__description">' +
      ' <div class="description__img">' +
      '<img src="https://placeimg.com/128/128/' +
      avatarNum +
      '" alt="프로필 사진" />' +
      '</div>' +
      '<div class="description__column">' +
      ' <div class="clamp__wrapper">' +
      '<div class="description__content clamp">' +
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit' +
      'quaerat porro excepturi vel velit quae architecto, totam eaque a' +
      'doloribus cum laboriosam magni tempora maiores nulla facilis' +
      'saepe cupiditate perspiciatis.Odit, rerum dolorum sit odio' +
      'repudiandae, ratione esse qui, repellat similique optio ipsam' +
      'porro. Nesciunt sint deserunt quia veritatis, id dignissimos et' +
      'possimus libero, recusandae, ipsum magnam animi excepturi' +
      'delectus!' +
      '</div>' +
      '<div class="description__clamp">' +
      '<i id="clamp" class="fas fa-angle-down"></i>' +
      '</div>' +
      '</div>' +
      '<div class="description__info">' +
      '영화의 형제 &middot; 조회수 31만회 &middot; 1개월 전' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    sleep(1000).then((result) => {
      end = Date.now();
      console.log(result + ', ' + (end / 1000 - start / 1000));
    });
    avatarNum++;
  }
  clampBtnEventFunction();
  window.addEventListener('scroll', handelScroll);
};

// 스크롤에 따른 데이터 추가
const handelScroll = (event) => {
  clearInterval(startScrollInterval);

  // 현재 화면에 보이는 화면 높이
  const clientHeight = document.documentElement.clientHeight;

  // 현재 시작하는 스크롤의 위치
  const scrollTop = document.documentElement.scrollTop;

  // 문서의 총 높이 (: 스크롤의 크기)
  const scrollHeight = document.documentElement.scrollHeight;

  if (clientHeight + scrollTop >= scrollHeight) {
    maxScrollTop = clientHeight + scrollTop;
    if (
      location.pathname === '/Korea_YouTube_mobile/index.html' ||
      location.pathname === '/Korea_YouTube_mobile/'
    )
      inputData();
  }

  if (scrollTop != 0) {
    const scrollList = Array.from(scroll.classList);
    if (scrollList[scrollList.length - 1] === 'hide')
      scroll.classList.remove('hide');
    // scroll.style.top = scrollTop + clientHeight - 150 + 'px';

    const footerList = Array.from(footer.classList);
    if (footerList[footerList.length - 1] === 'footer')
      footer.classList.add('hide');
  } else {
    scroll.classList.add('hide');
    footer.classList.remove('hide');
  }

  startScrollInterval = setInterval(scrollInterval, 3000);
};

// clamp
const handelClamp = (event) => {
  event.target.classList.toggle('click');
  event.target.parentElement.parentElement
    .querySelector('.description__content')
    .classList.toggle('clamp');
};

const clampBtnEventFunction = () => {
  const clampBtns = document.querySelectorAll('#clamp');
  Array.from(clampBtns).forEach((index) => {
    index.addEventListener('click', handelClamp);
  });
};

const indexInit = () => {
  clampBtnEventFunction();
  window.addEventListener('scroll', handelScroll);
  scrollTop.addEventListener('click', handelClickScrollUp);
  scrollBottom.addEventListener('click', handelClickScrollDown);
};
indexInit();
