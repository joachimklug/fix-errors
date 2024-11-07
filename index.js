#!/usr/bin/env node

function loadingAnimation() {
  const frames = ["-", "\\", "|", "/"];
  let i = 0;
  return setInterval(() => {
    process.stdout.write(`\rFixing errors... ${frames[i++ % frames.length]} `);
  }, 100);
}

function stopAnimation(animation) {
  clearInterval(animation);
  process.stdout.write("\rAll errors have been fixed!\n");
}

// Start the loading animation
const animation = loadingAnimation();

// Stop the animation after a delay (e.g., 3 seconds)
setTimeout(() => {
  stopAnimation(animation);
}, 3000);
