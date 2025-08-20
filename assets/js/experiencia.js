document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('experiencias-container');

  try {
    const res = await fetch('https://github.com/lumens7/SitePessoal/blob/main/assets/js/profile.json');
    const profile = await res.json();
    const experiencias = profile.experiencias || [];

    // Ordenar por data de início
    experiencias.sort((a, b) => {
      const dataA = new Date(a.inicio.split('/').reverse().join('-'));
      const dataB = new Date(b.inicio.split('/').reverse().join('-'));
      return dataA - dataB;
    });

    // Versículo da experiência
    const versiculo = profile.versiculos?.experiencia;
    if (versiculo) {
      const fb = document.querySelector('.fb');
      fb.innerHTML = `
        <h1>${versiculo.texto}</h1>
        <h2>${versiculo.autor}</h2>
      `;
    }

    experiencias.forEach(exp => {
      const card = document.createElement('div');
      card.classList.add('card-experiencia');

      const periodo = `${exp.inicio} - ${exp.fim}`;

      card.innerHTML = `
        <div class="face front">
          <img src="https://github.com/lumens7/SitePessoal/tree/main/assets/img/marreta.png" alt="Ícone">
          <h3>${exp.empresa}</h3>
        </div>
        <div class="face back">
          <h3>${exp.empresa}</h3>
          <p class="periodo">${periodo}</p>
          <h2>${exp.cargo}</h2>
          <p class="descricao">${exp.descricao}</p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Erro ao carregar experiências:', error);
    container.innerHTML = '<p>Erro ao carregar experiências.</p>';
  }
});
