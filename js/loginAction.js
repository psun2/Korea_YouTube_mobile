const getUrlUsers = () => {
  let user = {};
  window.location.search.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    (str, key, value) => {
      // query String이 깨지는 것이 싫어서 form 에서 encoding 을 한번 해줌 ...
      // 데이터가 url 로 넘어오면서 다시 encode 됨...
      // 결국 2번 decode 시켜줘야 원복된 값이 나옴.
      let keyDecode = decodeURIComponent(key);
      let valueDecode = decodeURIComponent(value);
      user[decodeURIComponent(keyDecode)] = decodeURIComponent(valueDecode);
    },
  );
  return user;
};

$(document).ready(function () {
  const user = getUrlUsers();
  let userData = null;
  if (localStorage.getItem('user')) {
    userData = JSON.parse(localStorage.getItem('user'));
  }

  if (userData === null) {
    sessionStorage.setItem('messageType', '오류 메시지');
    sessionStorage.setItem('messageContent', '존재 하지 않는 사용자 입니다.');
    history.back();
    return;
  }

  for (value of userData) {
    if (value.userID === user.id) {
      if (value.userPassword1 != user.password) {
        sessionStorage.setItem('messageType', '오류 메시지');
        sessionStorage.setItem(
          'messageContent',
          '비밀번호가 일치하지 않습니다.',
        );
        history.back();
        return;
      } else {
        sessionStorage.setItem('userID', value.userID);
        location.href = './index.html';
        return;
      }
    }
  }

  sessionStorage.setItem('messageType', '오류 메시지');
  sessionStorage.setItem('messageContent', '존재 하지 않는 사용자 입니다.');
  history.back();
});
