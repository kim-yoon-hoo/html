// Stage 1: Hide outer ring at 3.5s
setTimeout(() => {
  document.getElementById('loading').classList.add('hide-ring');
}, 3500);

// Stage 2: Expand inner circle at 4.0s
setTimeout(() => {
  document.getElementById('loading').classList.add('expand-circle');
}, 4000);   

// Final stage: fade out entire loader at 4.8s
setTimeout(() => {
  document.body.classList.add('loaded');
}, 4800);
