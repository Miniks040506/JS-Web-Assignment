'use strict';

// .querySelector -> da nang nhung match first element -> modern
// .getElementById 
// .getElementsByClassName
// .getElementsByTagName
// .querySelectorAll

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

//.classList is a collection of class names that an element has
//.remove() removes a class
//.add() adds a class
const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal)


// Keyboard event
// 'keydown' -> key is pressed
document.addEventListener('keydown', function (e) {
    if ((e.key === 'Escape' || e.key === 'Enter' || e.key === 'ArrowDown') && !modal.classList.contains('hidden')) {
        e.preventDefault();
        closeModal();
    } 
});

