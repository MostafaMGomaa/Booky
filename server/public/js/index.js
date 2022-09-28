import '@babel/polyfill';
import { login, logout } from './login';
import { updateUserInfo, updateUserPassword } from './updateSettings';
// DOM ElEMENTS
const arrowRightBtn = document.querySelectorAll(
  '.books-holder-right-arrow-btn'
);
const arrowLeftBtn = document.querySelectorAll('.books-holder-left-arrow-btn');
const loginForm = document.querySelector('.login-form');
const logoutBtn = document.querySelector('.logout-btn');

const userInfoForm = document.querySelector('#account-setting__form');
const userPasswordForm = document.querySelector('#account-password__form');

// EVENTS LISTNERS

// Scrol bookConatiners left and right.
arrowRightBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.parentElement.scrollBy(200, 0);
  });
});
arrowLeftBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    btn.parentElement.scrollBy(-200, 0);
  });
});

// Login.
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#floatingInput').value;
    const password = document.querySelector('#floatingPassword').value;
    login(email, password);
  });

// Logout.
if (logoutBtn) logoutBtn.addEventListener('click', logout);

// Update user data.
if (userInfoForm)
  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.querySelector('#name').value);
    form.append('email', document.querySelector('#email').value);
    form.append('photo', document.querySelector('#photo').files[0]);

    updateUserInfo(form);
  });

// Update user password.
if (userPasswordForm)
  userPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPassword = document.querySelector('#current-password').value;
    const newPassword = document.querySelector('#newpassword').value;
    const newPasswordConfirm = document.querySelector(
      '#confirm-newpassword'
    ).value;
    updateUserPassword(currentPassword, newPassword, newPasswordConfirm);
    // console.log(currentPassword, newPassword, confirmNewPassword);
  });
