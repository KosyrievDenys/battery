let goBtn = document.getElementById('go');
let backBtn = document.getElementById('back');
let pauseBtn = document.getElementById('pause');
let white = document.getElementsByClassName('white')[0];
let background = document.getElementsByClassName('color')[0];
let fill = document.getElementsByClassName('fill')[0];
let intervalId;
let currentWidth = 0;

const changeColor = (current) => {
  background.style.width = `${current}%`;
  fill.textContent = `${current}%`;
  if (current < 20) {
    background.style.background = 'red';
  } else if (current < 80) {
    background.style.background = 'yellow';
  } else {
    background.style.background = 'green';
  }
}

const startBattery = (moveTo, btnDisabled, btnActive) => {
  clearInterval(intervalId);
  pauseBtn.classList.remove('btn-disabled');
  btnActive.classList.remove('btn-disabled');
  intervalId = setInterval(function () {
    btnDisabled.classList.add('btn-disabled');
    if (moveTo === 'go') {
      if (currentWidth >= 100) {
        clearInterval(intervalId);
        pauseBtn.classList.add('btn-disabled');
        goBtn.classList.add('btn-disabled');
      } else {
        currentWidth++;
      }
    } else if ('back') {
      if (currentWidth <= 0) {
        clearInterval(intervalId);
        pauseBtn.classList.add('btn-disabled');
        backBtn.classList.add('btn-disabled');
      } else {
        currentWidth--;
      }
    }
    changeColor(currentWidth);
  }, 100);
}

goBtn.addEventListener('click', () => {
  startBattery('go', goBtn, backBtn)
})
backBtn.addEventListener('click', () => {
  startBattery('back', backBtn, goBtn)
})

pauseBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  pauseBtn.classList.add('btn-disabled');
  goBtn.classList.remove('btn-disabled');
  backBtn.classList.remove('btn-disabled');
})
