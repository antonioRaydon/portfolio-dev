const container = document.querySelector('.vagalumes');



for (let i = 0; i < 12; i++) {
  const vaga = document.createElement('div');
  vaga.classList.add('vagalume');
  vaga.style.top = `${Math.random() * 100}%`;
  vaga.style.left = `${Math.random() * 100}%`;
  vaga.style.animationDuration = `${6 + Math.random() * 4}s`;
  vaga.style.animationDelay = `${Math.random() * 5}s`;
  container.appendChild(vaga);
}


