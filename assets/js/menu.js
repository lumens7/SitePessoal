const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const navbar = document.getElementById('navbar');

menuBtn.addEventListener('click', () => {
  navbar.classList.add('show');
  menuBtn.style.display='none'
});

closeBtn.addEventListener('click', () => {
  navbar.classList.remove('show');
  menuBtn.style.display='block'
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = document.getElementById("menu-btn");

// Função para atualizar o ícone
function updateIcon() {
  if (body.classList.contains("light-mode")) {
    icon.src = "assets/img/svg/menu_light_mode.svg";
  } else {
    icon.src = "assets/img/svg/menu_dark_mode.svg";
  }
}

// Carregar o tema salvo
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-mode');
  themeToggle.checked = true;
}
updateIcon(); // Atualiza o ícone na carga inicial

// Alternar tema
themeToggle.addEventListener('change', () => {
  body.classList.toggle('light-mode');
  localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
  updateIcon(); 
});