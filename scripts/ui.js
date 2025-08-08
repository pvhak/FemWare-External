/// tab logic!!
////////////////////////
const options = document.querySelectorAll('.tripleselector .option');
const selline = document.querySelector('.tripleselector .selector-line');

options.forEach((option, index) => {
  option.addEventListener('click', () => {
    options.forEach(o => o.classList.remove('selected'));
    option.classList.add('selected');
    selline.style.left = `${(100 / options.length) * index}%`;
    console.log('Selected:', option.dataset.value);
  });
});

const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');
const underline = document.querySelector('.tab-underline');

function updul() {
  const actab = document.querySelector('.tab.active');
  if (!actab) return;
  underline.style.width = actab.offsetWidth + 'px';
  underline.style.left = actab.offsetLeft + 'px';
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.classList.contains('active')) return;
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    contents.forEach(c => c.classList.add('hidden'));
    document.getElementById('tab-' + tab.dataset.tab).classList.remove('hidden');
    updul();
  });
});


/// window load and resize event!!
////////////////////////
window.addEventListener('resize', updul);
window.addEventListener('load', () => {
  updul();
  document.querySelectorAll('.content').forEach(content => {
    const sections = [...content.querySelectorAll('.section')];
    const lcol = content.querySelector('[data-side="Left"]');
    const rcol = content.querySelector('[data-side="Right"]');

    if (!lcol || !rcol) return;

    sections.forEach(section => {
      const side = section.getAttribute('data-side');
      if (side === 'Left') lcol.appendChild(section);
      else if (side === 'Right') rcol.appendChild(section);
    });
  });
});


/// slider logic :p
////////////////////////
const sliders = document.querySelectorAll('input[type="range"]');
const tooltip = document.getElementById('slider-tooltip');

function updsliderbg(slider) {
  const val = parseFloat(slider.value);
  const min = parseFloat(slider.min) || 0;
  const max = parseFloat(slider.max) || 100;
  const percent = ((val - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(90deg, #ffc8be ${percent}%, #333 ${percent}%)`;
}

function uttpos(slider) {
  const rect = slider.getBoundingClientRect();
  const ctrect = tooltip.offsetParent.getBoundingClientRect();

  const val = parseFloat(slider.value);
  const min = parseFloat(slider.min) || 0;
  const max = parseFloat(slider.max) || 100;
  const percent = (val - min) / (max - min);

  const offsetX = rect.left + percent * rect.width - ctrect.left;
  const offsetY = rect.top + rect.height / 2 - ctrect.top;

  const ttwidth = tooltip.offsetWidth;
  const ttheight = tooltip.offsetHeight;

  const hoffset = rect.width * 0.03;
  const voffset = ttheight * 1.5;

  tooltip.style.left = `${offsetX - hoffset}px`;
  tooltip.style.top = `${offsetY - voffset}px`;
  tooltip.textContent = `${val} / ${max}`;
}


sliders.forEach(slider => {
  updsliderbg(slider);
  const span = slider.parentElement.querySelector('span');
  if (span) span.textContent = slider.value;

  let dragging = false;

  slider.addEventListener('input', () => {
    if (span) span.textContent = slider.value;
    updsliderbg(slider);
    if (dragging) uttpos(slider);
  });

  slider.addEventListener('mousedown', () => {
    dragging = true;
    tooltip.style.opacity = 1;
    uttpos(slider);
  });

  window.addEventListener('mouseup', () => { if (dragging) {dragging = false;tooltip.style.opacity = 0;} });
  slider.addEventListener('mouseleave', () => { if (!dragging) tooltip.style.opacity = 0; });
});
