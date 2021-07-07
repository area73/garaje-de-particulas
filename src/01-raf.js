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

