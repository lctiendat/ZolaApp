
/**
 * Lấy thời gian hiện tại
 */
function getCurrenTime() {
  const today = new Date();
  return today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
}

/**
* Lấy chuỗi ngẫu nhiên
*/
function getToken() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 20; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

/**
 * Tạo OTP
 */
function createOTP() {
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

/**
 * Tạo phòng chat
 */
function creatRoom() {
  return `room-${getToken()}`;
}

module.exports = {
  getCurrenTime,
  getToken,
  creatRoom,
  createOTP
} 