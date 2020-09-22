const callbacknaver = new naver.LoginWithNaverId({
  clientId: 'oLrcOuz1IyanWCntnlEJ',
  callbackUrl: 'http://127.0.0.1:5500/myweb/naverCallback.html',
  isPopup: false /* 팝업을 통한 연동처리 여부 */,
  callbackHandle: true,
});

const handleCallback = () => {
  callbacknaver.getLoginStatus((status) => {
    if (status) {
      const name = callbacknaver.user.getNickName();
      const profileImage = callbacknaver.user.getProfileImage();
      const birthday = callbacknaver.user.getBirthday();
      const uniqId = callbacknaver.user.getId();
      console.log(uniqId);
      const age = callbacknaver.user.getAge();
      sessionStorage.setItem('userID', uniqId);
      location.href = './index.html';
    } else {
      modalTitle.innerText = '오류 메시지';
      modalContent.innerText = 'AccessToken이 올바르지 않습니다.';
      modalView.classList.toggle('show');
      modalheaderChange.classList.toggle('warning');
      return;
    }
  });
};

const callbackInit = () => {
  window.addEventListener('load', handleCallback);
};

callbackInit();
callbacknaver.init();
