import Keyboard from './assets/js/Keyboard.js';

document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.createElement('div');
  const heading = document.createElement('h1');
  const description = document.createElement('p');
  const output = document.createElement('textarea');
  const keyboard = new Keyboard(output);

  heading.textContent = 'RSS Virtual Keyboard';
  description.innerHTML = 'OS: Windows <br> Change Language: \'left ctrl/cmd + alt\' OR \'double click space\'';

  wrapper.classList.add('wrapper');
  wrapper.append(output);
  wrapper.append(keyboard.elem);

  document.body.prepend(heading);
  document.body.append(wrapper);
  document.body.append(description);
});
