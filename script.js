const sprite = document.getElementById("chaser");
const frameSize = 32;
const animations = [
  { row: 0, frames: 2 }, // unused
  { row: 1, frames: 6 }, // chasing
  { row: 2, frames: 4 }, // idle
  { row: 3, frames: 6 }, // unused
];

let currentAnim = 1; // start with chasing
let frame = 0;

let mouseX = 0,
  mouseY = 0;
let spriteX = 100,
  spriteY = 100;

let targetX = null,
  targetY = null;
let chasingMouse = true;

// Animate sprite frames
setInterval(() => {
  const anim = animations[currentAnim];
  frame = (frame + 1) % anim.frames;
  const x = frame * frameSize;
  const y = anim.row * frameSize;
  sprite.style.backgroundPosition = `-${x}px -${y}px`;
}, 100);

// Track mouse only if chasing
document.addEventListener("mousemove", (e) => {
  if (chasingMouse) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
});

// Set timeout to switch target to a specific element
setTimeout(() => {
  const targetElement = document.getElementById("mail");
  const rect = targetElement.getBoundingClientRect();
  // Place the sprite near the element (e.g. to its left)
  targetX = rect.left + 30;
  targetY = rect.top - 30;

  chasingMouse = false;
}, 60000); // after 5 seconds

// Movement loop
function updatePosition() {
  const targetPosX = chasingMouse ? mouseX : targetX;
  const targetPosY = chasingMouse ? mouseY : targetY;

  const dx = targetPosX - spriteX;
  const dy = targetPosY - spriteY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Flip direction
  if (dx < 0) {
    sprite.style.transform = "scaleX(-1)";
  } else {
    sprite.style.transform = "scaleX(1)";
  }

  // If close to target, idle
  if (!chasingMouse && dist < 5) {
    currentAnim = 2; // idle animation
  } else {
    currentAnim = chasingMouse ? 1 : 1; // still moving animation
  }

  const speed = currentAnim === 2 ? 0 : 2; //set speed by lowering/increased last number
  const angle = Math.atan2(dy, dx);
  spriteX += Math.cos(angle) * Math.min(speed, dist);
  spriteY += Math.sin(angle) * Math.min(speed, dist);

  sprite.style.left = `${spriteX}px`;
  sprite.style.top = `${spriteY}px`;

  requestAnimationFrame(updatePosition);
}

updatePosition();
