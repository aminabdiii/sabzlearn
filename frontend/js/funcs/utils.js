const sweetAlert = function (title, text, icon, callBack, button) {
   swal({
      title: `${title}`,
      text: `${text}`,
      icon: `${icon}`,
      button: `${button ? button : 'ok'}`,
   }).then(res => callBack(res));
};

const setIntoLocalStorage = function (key, value) {
   return localStorage.setItem(key, JSON.stringify(value));
};
const getFromLocalStorage = function (key) {
   return localStorage.getItem(key);
};
const getToken = function () {
   const userInfos = JSON.parse(localStorage.getItem('user'));
   return userInfos ? userInfos.token : null;
};
const isLogin = function () {
   const userLoginInfos = localStorage.getItem('user');
   return userLoginInfos ? true : false;
};
const getUrlParam = function (key) {
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get(key);
};

const searchInArray = function (courseArr, searchProperty, searchInput) {
   let outputArray = courseArr.filter(item => item[searchProperty].includes(searchInput));

   return outputArray;
};

export { sweetAlert, setIntoLocalStorage, getFromLocalStorage, getToken, isLogin, getUrlParam, searchInArray };
