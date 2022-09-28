import axios from 'axios';
import { showAlert } from './alert';
const body = document.querySelector('body');

export const updateUserInfo = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMe',
      data,
    });

    if (res.data.status === 'success') {
      body.insertAdjacentHTML(
        'beforeend',
        showAlert(
          'success',
          'fa-solid fa-check-double',
          'Data update successfully'
        )
      );
    }
  } catch (err) {
    body.insertAdjacentHTML(
      'beforeend',
      showAlert(
        'err',
        'fa-solid fa-triangle-exclamation',
        err.response.data.message
      )
    );
  }
};

export const updateUserPassword = async (
  currentPassword,
  newPassword,
  newPasswordConfirm
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://127.0.0.1:3000/api/v1/users/updateMyPassword',
      data: {
        currentPassword,
        newPassword,
        newPasswordConfirm,
      },
    });

    if (res.data.status === 'success') {
      body.insertAdjacentHTML(
        'beforeend',
        showAlert(
          'success',
          'fa-solid fa-check-double',
          'Data update successfully'
        )
      );
    }
  } catch (err) {
    console.log(err);
    body.insertAdjacentHTML(
      'beforeend',
      showAlert(
        'err',
        'fa-solid fa-triangle-exclamation',
        err.response.data.message
      )
    );
  }
};
