const canciones = [
  {
    nombre: "This Is What You Came For",
    artista: "Rihanna x Calvin Harris",
    color: "#0732dd",
    audio: "audio/this-is-what-you-came-for.mp3",
    portada: "img/this-is-what-you-came-for.jpg",
    descripcion: "Eres esta canción porque llegas a un lugar y todos se dan cuenta."
  },
  {
    nombre: "Umbrella",
    artista: "Rihanna ft. JAY-Z",
    color: "#caccd0",
    audio: "audio/umbrella.mp3",
    portada: "img/umbrella.jpg",
    descripcion: "Eres esta canción porque siempre eres el refugio de alguien."
  },
  {
    nombre: "Diamonds",
    artista: "Rihanna",
    color: "#baeaff",
    audio: "audio/diamonds.mp3",
    portada: "img/diamonds.jpg",
    descripcion: "Eres esta canción porque brillas sin pedir permiso."
  },
  {
    nombre: "We Found Love",
    artista: "Rihanna ft. Calvin Harris",
    color: "#9f40e3",
    audio: "audio/we-found-love.mp3",
    portada: "img/we-found-love.jpg",
    descripcion: "Eres esta canción porque encuentras belleza hasta en el caos."
  },
  {
    nombre: "Work",
    artista: "Rihanna ft. Drake",
    color: "#f50e6e",
    audio: "audio/work.mp3",
    portada: "img/work.jpg",
    descripcion: "Eres esta canción porque nunca paras y siempre llevas el ritmo."
  },
  {
    nombre: "Only Girl (In the World)",
    artista: "Rihanna",
    color: "#f755f4",
    audio: "audio/only-girl.mp3",
    portada: "img/only-girl.jpg",
    descripcion: "Eres esta canción porque cuando entras, la pista es tuya."
  },
  {
    nombre: "Needed Me",
    artista: "Rihanna",
    color: "#f1101f",
    audio: "audio/needed-me.mp3",
    portada: "img/needed-me.jpg",
    descripcion: "Eres esta canción porque ya aprendiste a decir basta."
  },
  {
    nombre: "Stay",
    artista: "Rihanna ft. Mikky Ekko",
    color: "#ffb875",
    audio: "audio/stay.mp3",
    portada: "img/stay.jpg",
    descripcion: "Eres esta canción porque sientes muy fuerte, aunque no lo digas."
  }
];

const disco = document.getElementById("disco");
const vinilo = document.getElementById("vinilo");
const portada = document.getElementById("portada");
const cancion = document.getElementById("cancion");
const descripcion = document.getElementById("descripcion");

let sonidoActual = null;
let girando = false;

function girar() {
  if (girando) return;
  girando = true;

  // 1. Limpiamos la pantalla para empezar de cero
  descripcion.textContent = "";
  vinilo.style.display = "none";
  document.body.style.background = "#fff";
  document.body.style.color = "#000";
  if (sonidoActual) {
    sonidoActual.pause();
  }

  // El disco empieza a dar vueltas
  disco.classList.add("girando");

  // 2. Decidimos la ganadora desde el inicio
  const elegida = canciones[Math.floor(Math.random() * canciones.length)];

  // 3. Preparamos su audio (truco para que Safari deje sonar después)
  sonidoActual = new Audio(elegida.audio);
  sonidoActual.play();
  sonidoActual.pause();

  // 4. El giro: cada vuelta tarda un poquito más
  let vueltas = 0;
  let espera = 60;

  function paso() {
    if (vueltas < 25) {
      const alAzar = canciones[Math.floor(Math.random() * canciones.length)];
      cancion.textContent = alAzar.nombre;
      vueltas++;
      espera += 10;
      setTimeout(paso, espera);
    } else {
      aterrizar(elegida);
    }
  }

  paso();
}

function lanzarSerpentinas(color) {
  const colores = [color, "#ff0000", "#ff8c00", " #fff01f", "#33e22000", "#2eeefb", "#2642f8", "#931cfa", "#ff13f7", "#fb0775"
  ];

  // Una ráfaga desde cada lado
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 70,
    origin: { x: 0, y: 0.7 },
    colors: colores
  });
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 70,
    origin: { x: 1, y: 0.7 },
    colors: colores
  });
}

function aterrizar(elegida) {
  disco.classList.remove("girando");

  cancion.textContent = elegida.nombre + " (" + elegida.artista + ")";
  descripcion.textContent = elegida.descripcion;
  document.body.style.background = elegida.color;
  document.body.style.color = "#fff";

  portada.src = elegida.portada;
  portada.alt = "Portada de " + elegida.nombre;
  vinilo.style.display = "block";

  sonidoActual.currentTime = 0;
  sonidoActual.play();

  lanzarSerpentinas(elegida.color);

  girando = false;
}

disco.addEventListener("click", girar);