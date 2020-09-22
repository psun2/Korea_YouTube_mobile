let userData = [];

const pushLocalStorage = (user) => {
  if (localStorage.getItem('user')) {
    userData = JSON.parse(localStorage.getItem('user'));
    const lastUid = userData[userData.length - 1].uid;
    user.uid = lastUid + 1;
    userData.push(user);
    localStorage.setItem('user', JSON.stringify(userData));
  } else {
    user.uid = 0;
    userData.push(user);
    localStorage.setItem('user', JSON.stringify(userData));
  }
};

const getUrlParams = () => {
  let params = {};
  window.location.search.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    (str, key, value) => {
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    },
  );
  return params;
};

$(document).ready(() => {
  const data = getUrlParams();
  // const parsedData = Object.entries(data).map(([key, value]) => {
  //   return decodeURIComponent(value);
  // });

  const parsedData = {};
  for (key in data) {
    // query String이 깨지는 것이 싫어서 form 에서 encoding 을 한번 해줌 ...
    // 데이터가 url 로 넘어오면서 다시 encode 됨...
    // 결국 2번 decode 시켜줘야 원복된 값이 나옴.
    parsedData[decodeURIComponent(key)] = decodeURIComponent(data[key]);
  }
  pushLocalStorage(parsedData);

  // 회원가입이 성공적으로 끝마치면 기본적으로 로그인되어 세션값을 가짐
  sessionStorage.setItem('userID', parsedData.userID);
  // 메인 화면으로 돌려보내줌
  location.href = './index.html';
});
