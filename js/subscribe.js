$(document).ready(() => {
  if (sessionStorage.getItem('userID')) {
    const link = $('<a></a>').attr('href', 'logout.html').text('로그아웃');
    $('#loginBtn').html(link);
  }
});
