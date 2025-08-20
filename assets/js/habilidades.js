document.addEventListener("DOMContentLoaded", async function () {
  const btnHard = document.getElementById("btn-hard");
  const btnSoft = document.getElementById("btn-soft");
  const painelHard = document.getElementById("painel-hard");
  const painelSoft = document.getElementById("painel-soft");
  const fb = document.querySelector(".fb");
  const sheepSprites = document.querySelectorAll(".sheep-sprite");
  const frameDelay = 150;

  try {
    const res = await fetch("js/profile.json");
    const profile = await res.json();

    // === Versículo (habilidades) ===
    const versiculo = profile.versiculos?.habilidades;
    if (versiculo && fb) {
      fb.innerHTML = `
        <h1>${versiculo.texto}</h1>
        <h2>${versiculo.autor}</h2>
      `;
    }

    // === Hard Skills ===
    const hardSkills = profile.habilidades?.hardSkills || [];
    if (painelHard) {
      painelHard.innerHTML = ""; // Limpa se houver conteúdo anterior
      hardSkills.forEach(skill => {
        const img = document.createElement("img");
        img.src = skill.logo;
        img.alt = skill.name;
        painelHard.appendChild(img);
      });
      painelHard.style.display = "grid";
    }

    // === Soft Skills ===
    const softSkills = profile.habilidades?.softSkills || [];
    if (painelSoft) {
      painelSoft.innerHTML = "";
      softSkills.forEach(skill => {
        const div = document.createElement("div");
        div.className = "soft-skill";
        div.textContent = skill;
        painelSoft.appendChild(div);
      });
      painelSoft.style.display = "none";
    }

    // === Botões de toggle (Hard/Soft) ===
    if (btnHard && btnSoft) {
      btnHard.addEventListener("click", () => {
        btnHard.classList.add("active");
        btnSoft.classList.remove("active");
        painelHard.style.display = "grid";
        painelSoft.style.display = "none";
      });

      btnSoft.addEventListener("click", () => {
        btnSoft.classList.add("active");
        btnHard.classList.remove("active");
        painelSoft.style.display = "grid";
        painelHard.style.display = "none";
      });
    }

    // === Animações das ovelhas (vindo do JSON) ===
    const animations = profile.animacoes || [];
    if (animations.length > 0 && sheepSprites.length > 0) {
      const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
      let currentFrame = 0;

      setInterval(() => {
        const framePath = `${randomAnimation.path}${currentFrame}.png`;
        sheepSprites.forEach(sprite => {
          sprite.src = framePath;
        });
        currentFrame = (currentFrame + 1) % randomAnimation.frames;
      }, frameDelay);
    }

  } catch (err) {
    console.error("Erro ao carregar dados do profile.json:", err);
  }
});
