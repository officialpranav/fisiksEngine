import './style.css'
import Canvas from './Classes/Canvas'
import Vector2D from './Classes/Vector';

//handle button events
let isAnimating = false;
document.getElementById('player')!.addEventListener('click', (e) => {
  const input = e.target as HTMLElement;

  if(isAnimating){
    isAnimating = false;
    input!.textContent = "|>";
    return;
  };
  input!.textContent = "| |";
  isAnimating = true;
  animate();
});
document.getElementById('reset')!.addEventListener('click', () => {
  location.reload();
});

const canvas = new Canvas(400, 400)

canvas.circle(new Vector2D(220,200), 20, new Vector2D(0, 0))
canvas.circle(new Vector2D(100,101), 20, new Vector2D(0, 0))
canvas.circle(new Vector2D(322,230), 20, new Vector2D(0, 0))
canvas.circle(new Vector2D(204,120), 20, new Vector2D(0, 0))
canvas.circle(new Vector2D(203,301), 20, new Vector2D(0, 0))
canvas.circle(new Vector2D(340,304), 20, new Vector2D(0, 0))

canvas.draw()

function animate() {
  if (!isAnimating) return;
  canvas.draw();
  requestAnimationFrame(animate);
}

animate();