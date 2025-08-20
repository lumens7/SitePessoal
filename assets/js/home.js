fetch('js/profile.json')
  .then(response => {
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const valores = data.valores_lumens;
    const versiculo = data.versiculos?.home;

    const mainContainer = document.querySelector('main.container');
    const fb = document.querySelector('.fb');
    const menuInterno = document.querySelector('.menu_interno');

    // Adiciona versículo
    if (versiculo) {
      fb.innerHTML = `
        <h1>${versiculo.texto}</h1>
        <h2>${versiculo.autor}</h2>
      `;
    }

    // Adiciona valores LUMENS ao menu e ao conteúdo
    valores.forEach(valor => {
      // Cria link do menu
      const link = document.createElement('a');
      link.href = `#${valor.id}`;
      link.className = 'letra';
      link.dataset.palavra = valor.titulo.toUpperCase();
      link.textContent = valor.titulo[0];
      menuInterno.appendChild(link);

      // Cria seção de conteúdo
      const section = document.createElement('section');
      section.className = 'component';
      section.id = valor.id;
      section.innerHTML = `
        <h2>${valor.titulo}</h2>
        <p>${valor.descricao}</p>
      `;
      mainContainer.appendChild(section);
    });
    
    // Ativa animação das letras
    ativarAnimacaoLetras();
    const hash = window.location.hash;
    if (hash) {
      const destino = document.querySelector(hash);
      if (destino) {
        // Pequeno atraso para garantir que tudo esteja renderizado
        setTimeout(() => {
          destino.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  })
  .catch(err => {
    console.error('Erro ao carregar profile.json:', err);
  });


// Função da animação das letras
function ativarAnimacaoLetras() {
  const letras = document.querySelectorAll('.letra');

  letras.forEach(letra => {
    let animando = false;
    let cancelado = false;

    letra.addEventListener('mouseenter', async () => {
      if (animando) return;
      animando = true;
      cancelado = false;

      // Esconde outras letras
      letras.forEach(l => {
        if (l !== letra) l.style.opacity = '0';
      });

      const palavra = letra.dataset.palavra;
      letra.innerHTML = '';

      for (let i = 0; i < palavra.length; i++) {
        if (cancelado) break;

        letra.innerHTML += palavra[i] + '<br>';
        await new Promise(resolve => setTimeout(resolve, 80));
      }

      animando = false;
    });

    letra.addEventListener('mouseleave', () => {
      cancelado = true;
      letra.innerHTML = letra.dataset.palavra[0];

      // Restaura outras letras
      letras.forEach(l => {
        l.style.opacity = '1';
      });
    });
  });
}
