const password1 = document.getElementById('userPassword1'),
  password2 = document.getElementById('userPassword2');

let overlap = false;
let userID = null;

const showModal = (messageType, messageContent, type) => {
  $('.modal__title').text(messageType);
  $('.moda__content').html(messageContent);
  $('.modal').addClass('show');
  $('.modal__header').addClass(type);
};

// 아이디 중복 체크
const overlapCheck = () => {
  if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = $('#userID').val().trim().replace(/\s/g, '');
    for (obj of user) {
      if (obj.userID === userID) {
        $('#userID').val('');
        $('#userID').focus();
        showModal('오류 메시지', '중복되는 아이디 입니다.', 'warning');
        return;
      }
    }
  }
  userID = $('#userID').val().trim().replace(/\s/g, '');
  overlap = true;
  $('#userPassword1').focus();
  showModal('성공 메시지', '가입 가능한 아이디 입니다.', 'success');
};

// 유효성 검사
const registerSubmit = () => {
  const form = document.forms.register;
  const formData = new FormData(form);

  // 아이디 중복체크 안되어 있을때
  if (!overlap || userID != $('#userID').val().trim().replace(/\s/g, '')) {
    overlap = false;
    userID = null;
    showModal('오류 메시지', '아이디 중복체크가 되지 않았습니다.', 'warning');
    return;
  }

  // 공란 유효성
  for ([key, value] of formData) {
    if (value === '') {
      showModal(
        '오류 메시지',
        '빈 항목이있습니다. <br />모두 입력해주세요.',
        'warning',
      );
      return;
    }
  }

  // 공란 유효성을 거친뒤 정규식 유효성
  const idReg = new RegExp(/^[a-zA-Z0-9]{8,20}$/g);
  const pwReg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,20}$/g);

  let values = [$('#userID'), $('#userPassword1')];
  const regExps = [idReg, pwReg];
  const types = ['아이디', '비밀번호'];

  for (index in values) {
    let value = values[index].val().trim();
    value = value.replace(/\s/g, '');
    if (!regExps[index].test(value)) {
      showModal(
        '오류 메시지',
        `${types[index]} 가 형식에 맞지 않습니다. <br /> 다시 확인해 주세요.`,
        'warning',
      );
      values[index].focus();
      return;
    }
  }

  // 정규식 유효성이 끝나면 패스워드 유효성
  if (
    $('#userPassword1').val().trim().replace(/\s/g, '') !=
    $('#userPassword2').val().trim().replace(/\s/g, '')
  ) {
    showModal('오류 메시지', '비밀번호가 서로 일치하지 않습니다.', 'warning');
    $('#userPassword1').focus();
    return;
  }

  // submit 전 encode 작업
  const sub = [$('#userPassword2'), $('#zipcodeDetail')];
  values = values.concat([...sub]);

  values.forEach((index) => {
    let value = index.val().trim();
    value = value.replace(/\s/g, '');
    value = encodeURIComponent(value);
    index.val(value);
    console.log(value);
  });

  form.submit();
};

// 우편번호
const checkZipcode = () => {
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
      // 예제를 참고하여 다양한 활용법을 확인해 보세요.

      let addr = '';
      let addrDetail = '';

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      // 사용자가 도로명 주소를 선택했을 경우
      if (data.userSelectedType === 'R') addr = data.roadAddress;
      // 사용자가 지번 주소를 선택했을 경우(J)
      else addr = data.jibunAddress; // 지번 주소

      // 사용자의 해당 동 출력
      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          addrDetail += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          addrDetail +=
            addrDetail !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (addrDetail !== '') {
          addrDetail = ' (' + addrDetail + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        // 필드에 넣는다. => addrDetail
      } else {
        // 공백으로 필드에 넣는다. => ' '
      }

      $('#zZipcode').val(data.zonecode);
      $('#realZipcode').val(encodeURIComponent(data.zonecode));

      $('#zipcodeAddr').val(addr);
      $('#realZipcodeAddr').val(encodeURIComponent(addr));

      $('#zipcodeDetail').focus();
    },
  }).open();
};

const hadlePassword = () => {
  const psw1 = $('#userPassword1').val();
  const psw2 = $('#userPassword2').val();
  $('.password__result').html('');
  if (psw1 != psw2) {
    $('.password__result').html('비밀번호가 서로 일치하지 않습니다.');
  }
};

const registerInit = () => {
  password1.addEventListener('keyup', hadlePassword);
  password2.addEventListener('keyup', hadlePassword);
  $('#zipcondCheck').click(checkZipcode);
  $('#registerBtn').on('click', registerSubmit);
  $('#userIDCheck').click(overlapCheck);
};

registerInit();
