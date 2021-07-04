// Display
// MOVER DEntro DEL LOOP EN el paso 4
/*
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
*/

// comentar cunado paso 4
/*
requestAnimationFrame(() => {
  circleShape(canvas,{ x:120, y:120},20,'#FACCDFA6').run();
  squareShape(canvas,{ x:120, y:120},20,'#FAFA81AE').run()
})
*/

// 1) Ya que trabajamos con partículas tendríamos que tener una estructura que sea la partícula

const Particle = {
  position: { x: 0, y: 0 },
  velocity: { x: 1, y: 1 },
  acceleration: { x: 1, y: 1 },
  color: "#FA008D66",
  size: 5,
  shape: {}, // TODO
};

// 2) una forma tiene que estar asociada a un contexto perteneciente a un canvas,
// y por otro lado tendrá las propiedades específicas de la forma
// Para crear un círculo lo creamos haciendo un arco
// context.arc(x,y,radio,anguloInicioArco, anguloFinArco, clockwise)
const circleShape = (canvas, position, size, fillColor) => {
  const context = canvas.getContext("2d");
  return {
    run: () => {
      context.fillStyle = fillColor;
      context.beginPath();
      context.arc(position.x, position.y, size, 0, 2 * Math.PI, false);
      context.fill();
    },
  };
};

// 3) ahora vamos a crearnos un cuadrado
// un cuadrado se crea con:
const squareShape = (canvas, position, size, fillColor) => {
  const context = canvas.getContext("2d");
  return {
    run: () => {
      context.fillStyle = fillColor;
      context.beginPath();
      context.rect(position.x - size / 2, position.y - size / 2, size, size);
      context.fill();
    },
  };
};

// 4'  RECURSIVIDAD  para hacer el requestanmiationframe cada vez con parámetrros distintos
// https://gist.github.com/louisremi/1114293
// fn1 (para1) {
//   // calculamos cosas con esos parámetros para1 --> param2
//   requestAnimationFrame(fn2(fn1(param2)))
// }

function loop(canvas, i) {
  var idx = i + 10;
  const shapeList = [
    circleShape(canvas, { x: 120 + idx, y: 120 + idx }, 20, "#FACCDFA6"),
    // squareShape(canvas, { x: 120, y: 120 + idx }, 20, "#C9A133A6"),
    // squareShape(canvas, { x: 220, y: 220 + idx }, 20, "#FAFA81AE"),
  ];

  requestAnimationFrame(function draw() {
    if (idx % 100 === 0) {
      console.log("idx", idx);
    }
    shapeList.forEach((item) => item.run());
    loop(canvas, idx);
  });
}

const i = 10;
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

loop(canvas, i);

// 4) para poder ejecutar el requestAnimationFrame con parámetros dinámicos tendremos que:
/*
const loop = (param1, param2) => {
  const canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  requestAnimationFrame(() => {
    circleShape(canvas,{ x:120, y:120},20,'#FACCDFA6').run();
    squareShape(canvas,{ x:120, y:120},20,'#FAFA81AE').run()
  })
}

 */

// 5) ahora cada vez que entramos en el requestanimationframe deberíamos empzar por mover las
// partículas que tenemos
// (comentamos 4)

/*
const loop = (param1, param2) => {
  const canvas = document.getElementById('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  requestAnimationFrame(() => {

    circleShape(canvas,{ x:120, y:120},20,'#FACCDFA6').run();
    squareShape(canvas,{ x:120, y:120},20,'#FAFA81AE').run()
  })

}


loop()

 */
