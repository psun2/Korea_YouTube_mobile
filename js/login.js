const kakaoBtn = document.getElementById('kakao__login'),
  naverIdLogin = document.getElementById('naverIdLogin');
const modalTitle = document.querySelector('.modal__title');
const modalContent = document.querySelector('.moda__content');
const modalView = document.querySelector('.modal');
const modalheaderChange = document.querySelector('.modal__header');
const submitBtn = document.getElementById('submit');
const passwordInput = document.getElementById('password');

Kakao.init('338df56db7f560e32dc8cd733f939b92');
Kakao.isInitialized();

const handleEnter = (event) => {
  if (event.keyCode === 13) {
    handleLogin();
  }
};

const handleLogin = () => {
  const form = document.forms.loginForm;

  const userID = document.getElementById('id'),
    userPassword = document.getElementById('password');

  userID.value = encodeURIComponent(userID.value);
  userPassword.value = encodeURIComponent(userPassword.value);

  form.submit();
};

const handleNaverLogin = new naver.LoginWithNaverId({
  clientId: 'Ms42ScpKiYcTt7u4sU5u',
  callbackUrl:
    'https://psun2.github.io/Korea_YouTube_mobile/naverCallback.html',
  isPopup: false /* 팝업을 통한 연동처리 여부 */,
  loginButton: {
    color: 'green',
    type: 3,
    height: 60,
  } /* 로그인 버튼의 타입을 지정 */,
});

const handleKakaoLogin = () => {
  Kakao.Auth.login({
    // redirectUri: 'http://127.0.0.1:5500/myweb/index.html',
    throughTalk: false,
    success: (result) => {
      sessionStorage.setItem('userID', result.access_token);
      location.href = './index.html';
    },
    fail: (error) => {
      modalTitle.innerText = '오류 메시지';
      modalContent.innerText = '접근 할 수 없습니다.';
      modalView.classList.toggle('show');
      modalheaderChange.classList.toggle('warning');
      console.error(error);
      return;
    },
  });
};

const handleLoad = () => {
  if (sessionStorage.getItem('loginError')) {
    modalTitle.innerText = '오류 메시지';
    modalContent.innerText = '로그인에 실패 했습니다.';
    modalView.classList.toggle('show');
    modalheaderChange.classList.toggle('warning');
    return;
  }

  if (sessionStorage.getItem('kakao')) {
    // 이부분은 css로 잡기
    kakaoBtn.style.display = 'none';
  } else {
    kakaoBtn.style.display = 'inline';
  }
};

const loginInit = () => {
  window.addEventListener('DOMContentLoaded', handleLoad);
  kakaoBtn.addEventListener('click', handleKakaoLogin);
  naverIdLogin.addEventListener('click', handleNaverLogin);
  submitBtn.addEventListener('click', handleLogin);
  passwordInput.addEventListener('keyup', handleEnter);
};

loginInit();
/* 설정정보를 초기화하고 연동을 준비 */
handleNaverLogin.init();
