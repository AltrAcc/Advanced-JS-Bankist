'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();   // to stop the page jump
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn
  .addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////
// 007 Implementing Smooth Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', (e) => {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  //console.log('Current scroll (X/Y)', window, pageXoffsett, pageYOffset); 

  console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  // window.scrollTo(s1coords.left + s1coords.pageYOffset, s1coords.top + window.pageYOffset);

  // OLD method
  // window.scrollTo({
  //   left : s1coords.left + window.pageYOffset, 
  //   top : s1coords.top + window.pageYOffset,
  //   behavior : 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth'});

});

////////////////////////////////////////////////////
// 005 Selecting, Creating, and Deleting Elements

/* 
// selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSelections = document.querySelectorAll('section');
console.log(allSelections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// Creating elements .insertAdjacentHTML
const msg = document.createElement('div');
msg.classList.add('cookie-message');
msg.innerHTML = `Hello, we are using cookies for better experience 
    <button class="btn btn--close-cookie">GOT IT!</button>`;

// header.prepend(msg);
header.append(msg); 
// header.append(msg.cloneNode(true));

// header.before(msg);
// header.after(msg);

document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  msg.remove();
});

//////////////////////////////////////////////
// 006 Styles, Attributes and Classes
// Styles
msg.style.backgroundColor = '#37383d';
msg.style.width = '120%'

console.log(getComputedStyle(msg));
console.log(getComputedStyle(msg).color);

msg.style.height = Number.parseFloat(getComputedStyle(msg).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'red');

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

logo.alt = "Hello logo";
console.log(logo.alt);

console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company'));

// Data Attribute
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use - this'll override all classes
logo.classname = 'janvi';

 */

///////////////////////////////////////////////
// 008 Types of Events and Event Handlers