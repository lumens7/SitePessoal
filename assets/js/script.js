tsParticles.load("tsparticles", {
  fullScreen: { enable: false },
  background: { color: "transparent" },
  particles: {
    number: { value: 80, density: { enable: true, area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    move: { enable: true, speed: 1, direction: "none", outModes: { default: "bounce" } },
    links: { enable: true, distance: 120, color: "#ffffff", opacity: 0.4, width: 1 }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      resize: true
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.8 } }
    }
  },
  detectRetina: true
});
