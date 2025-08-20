// LED ANIMAÇÃO
const cols = 200;
const rows = 50;
const leds = [];
const container = document.getElementById("led-container");

for (let i = 0; i < cols * rows; i++) {
  const led = document.createElement("div");
  led.classList.add("led");
  container.appendChild(led);
  leds.push(led);
}

const canvas = document.createElement("canvas");
canvas.width = cols;
canvas.height = rows;
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#fff";
ctx.font = "bold 2.3rem monospace"; 
ctx.textAlign = "center";
ctx.fillText("PROJETOS", cols / 2, rows / 2 + 7);

const textLeds = [];
const imgData = ctx.getImageData(0, 0, cols, rows).data;
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < cols; x++) {
    const index = (y * cols + x) * 4;
    const isWhite = imgData[index] > 200;
    if (isWhite) {
      const pos = y * cols + x;
      textLeds.push(pos);
    }
  }
}

function animateText() {
  const ledsToLight = 200;
  const duration = 2000;

  for (let i = 0; i < ledsToLight; i++) {
    const index = textLeds[Math.floor(Math.random() * textLeds.length)];
    const led = leds[index];
    led.classList.add("on");
    setTimeout(() => {
      led.classList.remove("on");
    }, duration);
  }
}

setInterval(animateText, 120);


// CARREGAR DADOS DO profile.json
fetch('js/profile.json')
  .then(response => {
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const galeria = document.querySelector('.galeria_pro');

    if (!data || !data.projetos) {
      throw new Error('A propriedade "projetos" não foi encontrada.');
    }

    galeria.innerHTML = ''; // limpa conteúdo antigo

    data.projetos.forEach(projeto => {
      const card = document.createElement('a');
      card.classList.add('projeto_card');
      card.href = projeto.link;
      card.target = '_blank';
      card.innerHTML = `
        <div class="texto">
          <h2>${projeto.titulo}</h2>
          <p>${projeto.descricao}</p>
        </div>
        <div class="imagem">
          <img src="${projeto.imagem}" alt="${projeto.titulo}">
        </div>
      `;
      galeria.appendChild(card);
    });

    // Atualiza versículo
    const versiculo = data.versiculos?.projetos;
    if (versiculo) {
      const fb = document.querySelector('.fb');
      fb.innerHTML = `
        <h1>${versiculo.texto}</h1>
        <h2>${versiculo.autor}</h2>
      `;
    }
  })
  .catch(error => {
    console.error('Erro ao carregar profile.json:', error);
  });