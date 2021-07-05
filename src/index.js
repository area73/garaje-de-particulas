const cleanup = (canvas) => {
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
};

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


const randomNum = (num) => Math.round(Math.random() * num);

const randomParticle = () => {
  return {
    position: { x: randomNum(500) , y: randomNum(500) },
    velocity: { x: randomNum(10) - 5, y: randomNum(10) - 5 },
    acceleration: { x: randomNum(2) - 1, y: randomNum(2) - 1 },
    color: `rgba(${randomNum(255)},${randomNum(255)},${randomNum(255)})`,
    size: randomNum(10),
  }
}

const vectorAdd = (p1, p2) => ({x : p1.x + p2.x ,y : p1.y+ p2.y});

// moveParticle :: particle -> particle
const moveParticle = (particle) => {
  particle.position = vectorAdd(particle.position, particle.velocity )
  return particle
}

const add = (n,inc) => n + inc;
const changeParticleSize = (particle) => {
  const inc = particle.size === 50 ? 0 : 1;
  particle.size = add(particle.size,inc);
  return particle;
}

const compose = (...functions) => arg =>
  functions.reduceRight((result, fn) => fn(result), arg);


function start(canvas,idx,particleList) {
  // OJO::: NO METER ESTo AQUI !!!!
  // canvas.width = document.body.clientWidth;
  // canvas.height = document.body.clientHeight;

  requestAnimationFrame(function draw() {
    // console.log(canvas.width , canvas.height);
    // para mantener siempre el canvas al tamaño del documento
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    // cleanup
    cleanup(canvas);
    // add particle;
    particleList.push(randomParticle());

    const a = particleList.forEach(
      (particle) => {
        // circleShape(canvas, changeParticleSize(moveParticle(particle))).run();
        circleShape(
          canvas,
          compose(
            changeParticleSize,
            moveParticle,
          )(particle)
        ).run();

      }
      );
     start(canvas, idx, particleList);
    });
}


const canvasEl = document.getElementById('canvas');
start(canvasEl,  1, particles);

