const faps = document.querySelector('.tabs'); // I HAD TO
let ismousedown = false;

faps.addEventListener('mousedown', (e) => {
  ismousedown = true;
  const screenX = e.screenX;
  const screenY = e.screenY;
  if (window.chrome?.webview) { window.chrome.webview.postMessage(`dragstart:${screenX},${screenY}`); }
  e.preventDefault();
});

window.addEventListener('mouseup', () => { ismousedown = false; }); // stop dragging faggot

window.addEventListener('mousemove', (e) => {
  if (!ismousedown) return;
  const screenX = e.screenX;
  const screenY = e.screenY;

  if (window.chrome?.webview) { window.chrome.webview.postMessage(`dragmove:${screenX},${screenY}`); }
});
