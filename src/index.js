function start(canvas,context, idx,particleList) {

  // para mantener siempre el canvas al tamaño del documento
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  requestAnimationFrame(function () {
    // console.log(canvas.width , canvas.height);
    // cleanup(canvas);

    context.fillStyle = '#f3e51f';
    context.beginPath();
    context.arc(200+idx, 200+idx, 20, 0, 2 * Math.PI, false);
    context.fill();

    // circleShape(canvas,particleList[0]).run();
    // circleShape(canvas,particleList[1]).run();
    // circleShape(canvas,particleList[2]);
    idx++;
    // console.log(idx);
    start(canvas, context, idx, particleList);
  })
}

/// ---------------

const ParticleA = {
  position: { x: 300, y: 100 },
  velocity: { x: 1, y: 1 },
  acceleration: { x: 1, y: 1 },
  color: "rgba(243,194,6,0.91)",
  size: 5,
};

const ParticleB = {
  position: { x: 200, y: 300 },
  velocity: { x: -2, y: -5 },
  acceleration: { x: 0, y: 0 },
  color: "rgba(23,241,241,0.61)",
  size: 5,
};

const ParticleC = {
  position: { x: 400, y: 400 },
  velocity: { x: 1, y: 1 },
  acceleration: { x: 1, y: -2 },
  color: "rgba(158,232,18,0.68)",
  size: 5,
};

const particles = [
  ParticleA,
  ParticleB,
  ParticleC,
]


const circleShape = (canvas, particle) => {
  //console.log(Math.random());
  const context = canvas.getContext("2d");
  return {
    run: () => {
      context.fillStyle = particle.color;
      context.beginPath();
      context.arc(particle.position.x, particle.position.y, particle.size, 0, 2 * Math.PI, false);
      context.fill();
    }
  };
};

const cleanup = (canvas) => {
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}



const canvas = document.getElementById('canvas')
const context = canvas.getContext("2d");
start(canvas,context,  1, particles)
