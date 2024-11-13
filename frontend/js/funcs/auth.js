import { sweetAlert, setIntoLocalStorage, getToken } from './utils.js';
const register = function () {
   const nameInput = document.querySelector('#nameInput');
   const userNameInput = document.querySelector('#userNameInput');
   const emailInput = document.querySelector('#emailInput');
   const phoneInput = document.querySelector('#phoneInput');
   const passwordInput = document.querySelector('#passwordInput');

   const newUserInfos = {
      name: nameInput.value.trim(),
      username: userNameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      password: passwordInput.value.trim(),
      confirmPassword: passwordInput.value.trim(),
   };

   fetch(`http://localhost:4000/v1/auth/register`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserInfos),
   })
      .then(res => {
         if (res.status === 201) {
            sweetAlert(
               'با موفقیت ثبت شد',
               'ثبت نام شما موفقیت آمیز بود',
               'success',
               () => (location.href = 'index.html'),
               'باشه'
            );
         } else if (res.status === 409) {
            sweetAlert(
               'اطلاعات شما تکراری است',
               'برای اصلاح اطلاعات کلیک کنید',
               'error',
               () => {},
               'باشه'
            );
         }
         return res.json();
      })
      .then(res => {
         console.log(res);
         setIntoLocalStorage('user', { token: res.accessToken });
      });
};

const login = function () {
   const identifier = document.querySelector('#identifier');
   const loginInputPassword = document.querySelector('#loginInputPassword');

   const loginBodyInfos = {
      identifier: identifier.value.trim(),
      password: loginInputPassword.value.trim(),
   };

   fetch(`http://localhost:4000/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginBodyInfos),
   })
      .then(res => {
         if (res.status === 200) {
            sweetAlert(
               'با موفقیت وارد شدید',
               'برای ورود کلیک کنید',
               'success',
               () => (location.href = 'index.html'),
               'ورود'
            );
         } else {
            sweetAlert(
               'کاربری با این مشخصات یافت نشد',
               'برای تصحیح اطلاعات کلیک کنید',
               'error',
               () => {},
               'تصحیح اطلاعات'
            );
         }
         return res.json();
      })
      .then(res => {
         setIntoLocalStorage('user', { token: res.accessToken });
      });
};

const getMe = async function () {
   const token = getToken();
   if (!token) return;

   const res = await fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   const data = await res.json();
   return data;
};
// console.log(getMe());
export { register, login, getMe };
