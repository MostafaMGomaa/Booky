import axios from 'axios';
import { showAlert } from './alert';

const body = document.querySelector('body');

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      body.insertAdjacentHTML(
        'beforeend',
        showAlert(
          'success',
          'fa-solid fa-universal-access',
          'Login successfully'
        )
      );
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    body.insertAdjacentHTML(
      'beforeend',
      showAlert('err', 'fa-solid fa-universal-access', 'Login Incomeplete')
    );

    const btnClose = document.querySelectorAll('.btn-close');
    const alerts = document.querySelectorAll('.alert');
    if (btnClose)
      btnClose.forEach((btn) => {
        btn.addEventListener('click', () => {
          alerts.forEach((a) => {
            a.classList.add('hidden');
          });
        });
      });
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });

    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    body.insertAdjacentHTML(
      'beforeend',
      showAlert('err', 'fa-solid fa-universal-access', 'Logout Incomeplete')
    );
  }
};
