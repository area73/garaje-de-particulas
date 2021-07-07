const canvas = document.getElementById("canvas");  // obtenemos el elemento del canvas
const ctx = canvas.getContext("2d"); // obtenemos el contexto 2d del canvas


const Particle = {
  position: { x: 0, y: 0 },
  velocity: { x: 1, y: 1 },
  color: "#FA008D66",
  size: 5,
};

const circleShape = canvas => particle => {
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

const cleanup = (canvas) => {
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}

const randomNum = (num) => Math.round(Math.random() * num);

const randomParticle = () => {
  return {
    position: { x: randomNum(500) , y: randomNum(500) },
    velocity: { x: randomNum(10) - 5, y: randomNum(10) - 5 },
    color: `rgba(${randomNum(255)},${randomNum(255)},${randomNum(255)}, ${Math.random()})`,
    size: randomNum(10),
  }
}


const particleList = [];

const moveParticle = (particle) => {
  particle.position.x = particle.position.x + particle.velocity.x;
  particle.position.y = particle.position.y + particle.velocity.y;
  return particle;
}

const changeParticleSize = particle => {
  particle.size = particle.size === 50 ? 50 : particle.size + 1;
  return particle; // 👈 importante siempre retornar
}

const compose = (...fn) => x => fn.reduceRight((acc,cur) => cur(acc), x)



const addGravity = particle => {
  particle.velocity.y = particle.velocity.y+1
  return particle;
}

const addRebound = canvas => particle => {
  if (particle.position.y >= canvas.height || particle.position.y <= 0) {
    particle.velocity.y = particle.velocity.y  * -0.9
  }

  if (particle.position.x >= canvas.width || particle.position.x <= 0) {
    particle.velocity.x = particle.velocity.x  * -0.9
  }
  return particle;
}

const shapeSquare = canvas => particle => {
  const context = canvas.getContext("2d");
  return {
    run: () => {
      context.fillStyle = particle.color;
      context.beginPath();
      // ctx.rect(x,y,width,height)
      ctx.rect(particle.position.x, particle.position.y, particle.size, particle.size);
      context.fill();
    }
  }
}


const processParticles = compose(
  circleShape(canvas),
  //shapeSquare(canvas),
    addRebound(canvas),
    addGravity,
    changeParticleSize,
    moveParticle
  )


const loop = (idx,canvas,particleList) => {
  requestAnimationFrame(
    () => {
      canvas.width = document.body.clientWidth;
      canvas.height = document.body.clientHeight;
      particleList.push(randomParticle());
      particleList.forEach(
        (particle) => {
         //  circleShape(canvas, changeParticleSize(moveParticle(particle))).run()
          processParticles(particle).run()
        }
      );

      idx && loop(--idx,canvas,particleList);
    }
  )
}

loop(1000,canvas, particleList);





















