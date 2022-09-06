'use strict';

const arrowRightBtn = document.querySelectorAll(
  '.books-holder-right-arrow-btn'
);
const arrowLeftBtn = document.querySelectorAll('.books-holder-left-arrow-btn');

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
