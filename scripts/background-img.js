  const bgs = [
    "https://raw.githubusercontent.com/pvhak/FemWare-External/refs/heads/main/images/bg/background1.png",
    "https://raw.githubusercontent.com/pvhak/FemWare-External/refs/heads/main/images/bg/background2.png",
    "https://raw.githubusercontent.com/pvhak/FemWare-External/refs/heads/main/images/bg/background3.png",
    "https://raw.githubusercontent.com/pvhak/FemWare-External/refs/heads/main/images/bg/background4.png"
  ];

  let cindex = 0;

  function setbg(index) {
    const bg = document.querySelector('.background-image');
    if (bg) {
      bg.style.backgroundImage = `url('${bgs[index]}')`;
    }
  }

  function cyclebg() {
    cindex = (cindex + 1) % bgs.length;
    setbg(cindex);
  }

  function updtrns(value) {
    const bg = document.querySelector('.background-image');
    if (bg) {
      bg.style.opacity = value;
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    setbg(cindex);

    const btn = document.getElementById('randomimage-btn');
    if (btn) {
      btn.addEventListener('click', cyclebg);
    }

    const trnsslider = document.getElementById('bgimgtransparency');
    if (trnsslider) {
      updtrns(trnsslider.value);
      trnsslider.addEventListener('input', (e) => {
        updtrns(e.target.value);
      });
    }
  });
