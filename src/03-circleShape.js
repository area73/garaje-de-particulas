const canvas = document.getElementById("canvas");  // obtenemos el elemento del canvas
const ctx = canvas.getContext("2d"); // obtenemos el contexto 2d del canvas
const particleList = [];

const Particle = {
  position: { x: 0, y: 0 },
  velocity: { x: 1, y: 1 },
  color: "#FA008D66",
  size: 5,
};

const circleShape = (canvas,particle) => {
  const context = canvas.getContext("2d");
  return {
    run: () => {
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.position.x, particle.position.y, particle.size, 0, 2 * Math.PI);
      context.fill();
    }
  }
}

const loop = (idx,canvas,particleList) => {
  requestAnimationFrame(
    () => {
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
      console.log(idx)
      idx && loop(--idx,canvas,particleList);
    }
  )
}

loop(1000,canvas, particleList);

