const handleLogout = () => {
  if (sessionStorage.getItem('userID')) {
    sessionStorage.clear();
    // localStorage.clear();
    sessionStorage.setItem('messageType', '성공 메시지');
    sessionStorage.setItem('messageContent', '로그아웃 되었습니다.');
    //   history.back();
    location.assign('./index.html');
    return;
  } else {
    sessionStorage.setItem('messageType', '오류 메시지');
    sessionStorage.setItem(
      'messageContent',
      '로그아웃을 하던 중 오류가 발생했습니다.',
    );
    location.assign('./index.html');
    return;
  }
};

const logoutInit = () => {
  window.addEventListener('load', handleLogout);
};
logoutInit();
