// let prevButton = document.getElementById('prev');
// let nextButton = document.getElementById('next');
// let container = document.querySelector('.container');
// let items = container.querySelectorAll('.list .item');
// let indicator = document.querySelector('.indicators');
// let dots = indicator.querySelectorAll('ul li');
// let list = container.querySelector('.list');

// let active = 0;
// let lastPosition = items.length - 1;

// function setSlider(direction) {
//     // Remove o item ativo antigo
//     let itemOld = container.querySelector('.list .item.active');
//     itemOld.classList.remove('active');

//     // Remove o indicador ativo antigo
//     let dotOld = indicator.querySelector('ul li.active');
//     dotOld.classList.remove('active');

//     // Atualiza o valor de --calculation para controlar a direção da animação
//     list.style.setProperty('--calculation', direction);

//     // Ativa o novo item
//     items[active].classList.add('active');
//     dots[active].classList.add('active');

//     // Atualiza o número
//     indicator.querySelector('.number').innerHTML = '0' + (active + 1);
// }

// nextButton.onclick = () => {
//     active = (active + 1 > lastPosition) ? 0 : active + 1;
//     setSlider(1);
// };

// prevButton.onclick = () => {
//     active = (active - 1 < 0) ? lastPosition : active - 1;
//     setSlider(-1);
// };



// let prevButton = document.getElementById('prev');
// let nextButton = document.getElementById('next');
// let container = document.querySelector('.container');
// let items = container.querySelectorAll('.list .item');
// let indicator = document.querySelector('.indicators');
// let dots = indicator.querySelectorAll('ul li');
// let list = container.querySelector('.list');

// let active = 0;
// let lastPosition = items.length - 1;

// function setSlider(direction) {
//     // Remove classe 'active' de todos os itens e dots
//     items.forEach((item, index) => {
//         item.classList.remove('active');
//         item.style.setProperty('--calculation', index - active);
//     });

//     dots.forEach(dot => dot.classList.remove('active'));

//     // Atualiza a direção (usada em transições)
//     list.style.setProperty('--calculation', direction);

//     // Ativa o novo item e indicador
//     items[active].classList.add('active');
//     dots[active].classList.add('active');

//     // Atualiza número
//     indicator.querySelector('.number').textContent = '0' + (active + 1);
// }

// nextButton.onclick = () => {
//     active = (active + 1 > lastPosition) ? 0 : active + 1;
//     setSlider(1);
// };

// prevButton.onclick = () => {
//     active = (active - 1 < 0) ? lastPosition : active - 1;
//     setSlider(-1);
// };


let prevButton = document.getElementById('prev')
let nextButton = document.getElementById('next')
let container = document.querySelector('.container')
let items = container.querySelectorAll('.list .item')
let indicator = document.querySelector('.indicators')
let dots = indicator.querySelectorAll('ul li')
let list = container.querySelector('.list')

let active = 0
let firstPosition = 0
let lastPosition = items.length - 1

function setSlider() {

    let itemOld = container.querySelector('.list .item.active')
    itemOld.classList.remove('active')

    let dotsOld = indicator.querySelector('ul li.active')
    dotsOld.classList.remove('active')
    dots[active].classList.add('active')

    indicator.querySelector('.number').innerHTML = '0' + (active + 1)
}

nextButton.onclick = () => {
    list.style.setProperty('--calculation', 1)
    active = active + 1 > lastPosition ? 0 : active + 1
    setSlider()
    items[active].classList.add('active')
}

prevButton.onclick = () => {
    list.style.setProperty('--calculation', -1)
    active = active - 1 < firstPosition ? lastPosition : active - 1
    setSlider()
    items[active].classList.add('active')
}