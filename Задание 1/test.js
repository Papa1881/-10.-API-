const button = document.getElementById('icon-button');
const image = document.getElementById('icon-image');

let isFirstIcon = true;

button.addEventListener('click', () => {
  if (isFirstIcon) {
    image.src = 'icon2.svg';
  } else {
    image.src = 'icon1.svg';
  }
  isFirstIcon = !isFirstIcon;
});