let next = document.querySelector('.next')
let prev = document.querySelector('.prev')

next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) // here the length of items = 6
})


// function cadastrar(tipo) {
//   // Redireciona para a página de cadastro com o tipo como parâmetro
//   window.location.href = `cadastro.html?tipo=${tipo}`;