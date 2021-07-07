# Trabajar con partículas

## EL CANVAS (01-raf.js)

* Hablar sobre el elemento del canvas y cómo funciona

* El API de dibujo de HTML
  [canvas API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/canvas)

### El API d dibujo

**COPIAR Y PEGAR**
```js
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// canvas.width = document.body.clientWidth;
// canvas.height = document.body.clientHeight;

// linea
ctx.strokeStyle = "#FF0000";
ctx.beginPath();
ctx.moveTo(50,140);
ctx.lineTo(150,60);
ctx.lineTo(250,140);
ctx.closePath();
ctx.stroke();

/*
// linena
ctx.strokeStyle = "#80ff00";
ctx.beginPath();
ctx.moveTo(150,40);
ctx.lineTo(10,60);
ctx.lineTo(25,140);
ctx.closePath();
ctx.stroke();
*/
/*
// Circulo
ctx.fillStyle = "rgba(160,182,217,0.66)"
ctx.beginPath();
ctx.arc(100,200,50,Math.PI, Math.PI / 3,true);
ctx.closePath();
ctx.stroke();
ctx.fill();
*/
```
**BOLA EXTRA VISUALIZACIÓN**
/*
El canvas tiene 2 tamaños (como los monitores las pulgadas y la resolución de pixels)
1/ **El buffer de dibujo** CSS --> canvas.style.width = "500px";
2/ **tamaño de la visualización** canvasEl.width = 400;

### EL movimiento (requestAnimationFrame(fn))

setIntrerval Vs requestAnimationFrame

**COPIAR Y PEGAR**
```js
const canvas = document.getElementById("canvas");  // obtenemos el elemento del canvas
const ctx = canvas.getContext("2d"); // obtenemos el contexto 2d del canvas
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const circulo = () => {
  ctx.fillStyle = "rgb(44,234,209)";
  ctx.beginPath();
  ctx.arc(100,200,50,0,2 * Math.PI,false);
  ctx.fill();
}

const loop = () => {
  console.log("👍");
  circulo();
}

requestAnimationFrame(loop)

```

#### Concepto de recursividad

* Añadimos recursividad
* ¿Cómo podríamos pasar parámetros

El problema con el requestAnimationFrame es que no podemos pasarle un parámetro a la función de callback y nosotros queremos que cada vez que se ejecute la función que contiene requestanimationframe lo haga con parámetros distintostendremos:

**COPIAR Y PEGAR SIN BORRAR LO ANTERIOR PARA VER LA DIFERENCIA**
```js
// --------------------------
const loop = (idx) => {
   // closure
   requestAnimationFrame(
     () => {
       console.log(idx);
       idx++;
       loop(idx);
     }
   )
}
loop(100);
```

### Un ejemplo moviendo el círculo

**SUSTITUIR en la función circulo**
```js
const circulo = (inc) => {
...
ctx.arc(100 + inc,200,50,0,2 * Math.PI,false);
...
circulo(idx);
```

### borramos
**COPIAR Y PEGAR anadiendo**
```js
ctx.clearRect(0, 0, canvas.width, canvas.height);
```

## EMPEZAMOS A CONSTRUIR !!!

**Nos quedamos con esta estructura (copiar y pegar 01-raf.js)**
```js
const canvas = document.getElementById("canvas");  // obtenemos el elemento del canvas
const ctx = canvas.getContext("2d"); // obtenemos el contexto 2d del canvas
const particleList = [];

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
```

### creamos una estructura de una partíclula (02-particle.js)
```js
const Particle = {
    position: { x: 0, y: 0 },
    velocity: { x: 1, y: 1 },
    color: "#FA008D66",
    size: 5,
};

```

### creamos la función shape de una circunferencia (03-circleShape.js)
Vamos a englobar la función que pinta el circulo
Para pintar un círculo necesitaremos el canvas y una partícula

**CONCEPTO DE PROCRASTINACIÓN**

Necesitamos un canvas y una partícula
```js
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
```

### Creamos una función de reset o cleanup (04-cleanup.js)

```js
const cleanup = (canvas) => {
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
} 
```


### Creamos una función que nos genere una partícula con datos aleatorios (05-randomParticle.js)

```js
const randomNum = (num) => Math.round(Math.random() * num);

const randomParticle = () => {
  return {
     position: { x: randomNum(500) , y: randomNum(500) },
     velocity: { x: randomNum(10) - 5, y: randomNum(10) - 5 },
     color: `rgba(${randomNum(255)},${randomNum(255)},${randomNum(255)}, ${Math.random()})`,
     size: randomNum(10),
  }
}

```
... y rellenamos nuestro array inicial

```js
const particleList = [
   randomParticle(),
   randomParticle(),
   randomParticle()
];

// Array.from(Array(10), () => randomParticle())
```
... creamos un forEach para rellenar las partículas

```js
particleList.forEach(
        (particle) => {
          circleShape(canvas, particle).run()
        }
      )
```

### Función para mover las partículas (05-moveParticle.js)

Creamos una **función para mover**

```js
// moveParticle :: particle -> particle
const moveParticle = (particle) => {
  particle.position.x = particle.position.x + particle.velocity.x;
  particle.position.y = particle.position.y + particle.velocity.y;
  return particle; 
}
```
... y esto nos lleva a :

```js
  circleShape(canvas, moveParticle(particle)).run()
```

### Generación automática de partículas (07-particleCreation.js)

Ahora queremos **crear partículas** en cada animationFrame
```js
   particleList.push(randomParticle())
```

### cambio de tamaño de la partícula automática de partículas (08-changeParticleSize.js)

 OJO ==> que no  decrezca, 

```js
const changeParticleSize = particle => {
   particle.size = particle.size === 50 ? 50 : particle.size + 1;
   return particle; // 👈 importante siempre retornar 
}
```
y en el foreach
```js
particleList.forEach(
      (particle) => {
        circleShape(canvas, changeParticleSize(moveParticle(particle))).run();
      }
    )

```

Empezamos a tener problemillas para hacer nuestro código al estar muy acoplado y difícil de seguir:


### Composición (09-compose.js)
**EXPLICAR CONCEPTOS DE composición, aplicación parcial**

Introducimos la composición FoG(x) y el concepto de **point free** programming (programación de punto libre) 
** (g º f)(x) = g(f(x))**

* es asociativa:
f ⋅ (g ⋅ h) = (f ⋅ g) ⋅ h
  
* No es conmutativa:
  f ⋅ g != g ⋅ f

* El elemento neutro en las funciones compuestas es la función identidad (id).  
  f º id === id º f === f

```js
const compose = (f,g,x) => f(g(x));
const compose = (f, g ) =>  x => f(g(x));  // APLICACIÓN PARCIAL

const compose = (...fns) => x => fns.reduceRight((acc, cur) => cur(acc), x);
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
/*
function compose(...fn){
   return function(x){
      return fn.reduceRight((acc,cur) => cur(acc), x);
   }
}
*/
```

```js
(particle) => {
   circleShape(
     canvas,
     compose(
       changeParticleSize,
       moveParticle
     )(particle)
   ).run()
}

// podemos sacar el compose fuera:
const processParticles = compose(
        changeParticleSize,
        moveParticle
)
```

### Composición (10-curry.js)

**PODRÍAMOS METER circleShape dentro de compose ??? ==> yea**

Vamos a pensar de fuera a dentro vamos a intentar meter circleShape(canvas, particles)
==> tendremos que currificar la función
dentro del compose;

```js
const circleShape = canvas => particle => {
// ...
const processParticles = compose(
        circleShape(canvas),
        changeParticleSize,
        moveParticle
);
```

### Composición2 (11-curry.js)

Tenemos un problema en el anterior con processParticles ya qye no es una función pura
(por el tema del canvas)

Solución currificar
```js
const processParticles = canvas => compose(
  circleShape(canvas),
  changeParticleSize,
  moveParticle
)
// ...
processParticles(canvas)(particle).run();

```

### Función gravedad (12-gravity.js)

Vamos a añadir **gravedad**
```js
const addGravity = particle => {
  particle.velocity.y = particle.velocity.y+1
  return particle;
}

```

### Función rebote (13-rebound.js)

Añadimos **rebote**

NOTA: primero cambiamos la vel y luego poner la elasticidad no sea del 100%

```js
const addRebound = canvas => particle => {
  if (particle.position.y >= canvas.height || particle.position.y <= 0) {
    particle.velocity.y = particle.velocity.y  * -0.9
  }

  if (particle.position.x >= canvas.width || particle.position.x <= 0) {
    particle.velocity.x = particle.velocity.x  * -0.9
  }
  return particle;
}
```

### Cuadrados (14-squares.js)

```js
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
```

**FINAL**
Hablar de map en vez de forEach
Hablar de ramda
Hablar de fantasyLand




