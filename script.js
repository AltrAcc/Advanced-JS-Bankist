'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

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
// 011 Event Delegation_ Implementing Page Navigation

// document.querySelectorAll('.nav__link').forEach((el) => {
//   el.addEventListener('click', (e) => {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior : 'smooth'});
//   });
// });

// 1. Add event listner to comman parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  // Matching stategy
  if(e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior : 'smooth'});
  }
});

///////////////////////////////////////////////
// 013 Building a Tabbed Component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/////////////////////////////////////////////////
// 014 Passing Arguments to Event Handlers
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// 015 Implementing a Sticky Navigation_ The Scroll Event
// 016 Sticky navigation: Intersection Observer API

/* const obsCallBack = (entries, observer) => { (Just observation)
  entries.forEach(entry => console.log(entry));
};

const obsOptions = {
  root: null,
  threshold: 0
};

const observer = new IntersectionObserver(obsCallBack, obsOptions);

observer.observe(section1); */

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

////////////////////////////////////////////////////
// 017 Revealing Elements on Scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////////////////////////////////
// 018 Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////////
// 019 Building a Slider Component_ Part 1
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

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

/* 
const h1 = document.querySelector('h1');

const alertH1 = (e) => {
  alert('addEventListner: Great!');

  h1.removeEventListener('mouseenter', alertH1);
}

h1.addEventListener('mouseenter', alertH1);
//setTimeout((e) => { alert('addEventListner: Great!')}, 4000);

// h1.onmouseenter = (e) => {
//   alert('addEventListner: Great Great!')
// };
 */

///////////////////////////////////////////////
// 010 Event Propagation in Practice
/* 
// rgb(255,255,255)
const randomInt = (min,max) => 
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0,222)},${randomInt(0,222)},${randomInt(0,222)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor  = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop event propagation - not really good idea
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor  = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor  = randomColor();
  console.log('NAV', e.target, e.currentTarget);
}, true); // 3rd param true means this will happen in event capaturing phase otherwise it'll happen in event bubbling phase
 */

////////////////////////////////////////////////
// 012 DOM Traversing

/* const h1 = document.querySelector('h1');

// Going downwords: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'red';

// Going upwords: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)'

// Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children); */

//////////////////////////////////////////////////
// 021 Lifecycle DOM Events
/* document.addEventListener('DOMContentLoaded', (e) => {
  console.log('HTML parsed and DOM tree build!', e);
});

window.addEventListener('load', (e) => {
  console.log('page fully loaded', e);
})

window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
}) */