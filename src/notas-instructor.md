# Trabajar con partículas


## EL CANVAS (01-raf.js)

* El canvas es como hojas de papel cebolla que se van superponiendo una encima de otra, son como fotogramas


1/ primero tendremos que tener un elemento HTML canvas
**Mirar el html index.html y crearlo desde 0** 
```html
<canvas id="canvas"></canvas>
```

**TUTOR:** crear  HTML con javascript index.html
**@REFERENCIAS** https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke

### Podemos pintar lineas o arcos

el API de dibujo tendremos:
Para lineas: 

Ejemplo con lineas :
```js
const canvas = document.getElementById("canvas");  // obtenemos el elemento del canvas
const ctx = canvas.getContext("2d"); // obtenemos el contexto 2d del canvas
ctx.strokeStyle = '#00ff00'; // como estamso pintando sobre fondo negro tenemos que poner el stoke en otro color
ctx.beginPath();
ctx.moveTo(50, 140);
ctx.lineTo(150, 60);
ctx.lineTo(250, 140);
ctx.closePath();
ctx.stroke();
// EXTRA: podríamos definido otras propiedades como el grosor de la linea o el relleno

// ctx.lineWidth = 5;
// ctx.strokeStyle = '#00ffff';

```

**BOLA EXTRA   VISUALIZACIÓN**

El canvas tiene 2 tamaños (como los monitores las pulgadas y la resolución de pixels)
1/ El buffer de dibujo 
   => dimensión en pixeles del canvas (asociado a los estilos css)
```css
        canvas {  
          width: 500px;
          height: 400px;
        }
```
```js
        canvas.style.width = "500px";
        canvas.style.height = "400px";
```

2/ tamaño de la visualización ( atributos)  ~ resolución pixeles
```html
<canvas width="400" height="300"></canvas>
```
```js
        someCanvasElement.width = 400;
        someCanvasElement.height = 300;
```
---

Para que sea dinámico podríamos hacer esto en el JS:
```js
   canvas.width = document.body.clientWidth;
   canvas.height = document.body.clientHeight;
```
**NOTA** lo copiamos al js y ya lo actulizaremos en el futuro


2/ Vamos a crearnos un circulo

```js
ctx.fillStyle = "#f9e8a1"
ctx.beginPath();
// arc( x, y, radio, inicioArcoRad, finArcoRad, clockwiseBool) 
ctx.arc(100,200,50,0,2 * Math.PI,false);
ctx.fill();
```

----

## EL movimiento (requestAnimationFrame(fn))

**Explicar como funciona la animación**

**Compararlo con setIntrerval (setIntrerval(callback, time))**

ejemplo:
```js
const canvas = document.getElementById("canvas");  // obtenemos el elemento del canvas
const ctx = canvas.getContext("2d"); // obtenemos el contexto 2d del canvas
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const circulo = () => {
  ctx.fillStyle = "rgba(123,12,67,0.5)";
  ctx.beginPath();
  ctx.arc(100,200,50,0,2 * Math.PI,false);
  ctx.fill();
}

requestAnimationFrame(circulo)

```

#### Concepto de recursividad

¿cómo podríamos hacer que nuestro requestAnimationFrame se ejecutara cada vez con parámetros distintos?
==> RECCURSIVIDAD
https://gist.github.com/louisremi/1114293

Vamos a ver un caso de recursividad:
Es decir una función que se llama a si misma pero con distintos parámetros

```js
function fn1(i) {
  console.log(i)
  i++;
  fn1(i);
}
```

El problema con el requestAnimationFrame es que no podemos pasarle un parámetro a la función de callback
y nosotros queremos que cada vez que se ejecute la función que contiene requestanimationframe lo haga 
con parámetros distintostendremos:
```js
requestAnimationFrame(loop)
// no podemos tener loop con parámetros ????
function loop (n) {
  // n++;
  console.log(n)
  requestAnimationFrame(loop)  // <==== cómo pasamos parámetros 
}
```

**FINAL**
```js

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

**Un ejemplo moviendo el círculo** 
```js
const canvas = document.getElementById("canvas");  // obtenemos el elemento del canvas
const ctx = canvas.getContext("2d"); // obtenemos el contexto 2d del canvas

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
// [1] pasamos el parametro al circulo
const pintaCirculo = (dx) => {
  ctx.fillStyle = "rgba(123,12,67,0.5)";
  ctx.beginPath();
  ctx.arc(100 + dx,200 + dx ,50,0,2 * Math.PI,false);
  ctx.fill();
}

const loop = (idx) => {
  requestAnimationFrame(
    () => {
      pintaCirculo(idx);
      // añadimos 10px
      loop(idx + 10);
    }
  )
}

loop(100);
```

### borramos

ctx.clearRect(0, 0, canvas.width, canvas.height);

y lo metemos antes de pintaCirculo

meter un log para explicar lugo el request   console.log(i)



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
     acceleration: { x: randomNum(2) - 1, y: randomNum(2) - 1 }, 
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

Creamos una **función que para mover**

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
por ejemplo
```js
circleShape(canvas, 
        changeSpeed(
          changeColor(
            changeParticleSize(
              moveParticle(
                particle
              )
            )
          )
        )
).run()
```

### Composición (09-compose.js)

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
  if (particle.position.y >= canvas.height) {
    particle.velocity.y = (particle.velocity.y - 10) * -1
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




