import keysArr from './assets/js/keys.js';

const Lang = {
  set(lang) {
    sessionStorage.setItem('Lang', lang);
  },
  get() {
    return sessionStorage.getItem('Lang');
  },
};

export default class Keyboard {
  constructor() {

  }
}

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    textarea: null,
    keys: [],
  },
  properties: {
    keysArr,
    caps: 'false',
    space: null,
  },

  init() {
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');
    this.elements.textarea = document.createElement('textarea');

    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.append(...(this.createKeys()));

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    this.elements.main.append(this.elements.textarea);
    this.elements.main.append(this.elements.keysContainer);
    document.body.prepend(this.elements.main);

    if (!Lang.get()) Lang.set('RU');
    Lang.set((Lang.get() === 'RU') ? 'EN' : 'RU');
    this.toggleLang();

    this.properties.space.addEventListener('dblclick', () => {
      this.toggleLang();
    });
  },

  createKeys() {
    const result = [];
    const createRow = () => {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');
      return row;
    };
    let rowLayout = createRow();

    this.properties.keysArr.forEach((key) => {
      const keyElement = document.createElement('button');
      const newRow = ['Backspace', 'Delete', 'Enter', 'ShiftRight', 'ControlRight'].indexOf(key.code) !== -1;

      keyElement.setAttribute('type', 'button');

      switch (key.keyRU) {
        case 'Backspace':
        case 'Caps Lock':
        case 'Shift':
        case 'Enter':
          keyElement.classList.add('keyboard__key', 'keyboard__key--width_middle');
          break;
        case 'Ctrl':
        case 'Tab':
          keyElement.classList.add('keyboard__key', 'keyboard__key--width_small');
          break;
        case 'RU':
          keyElement.classList.add('keyboard__key', 'keyboard__key--width_large');
          this.properties.space = keyElement;
          break;
        default:
          keyElement.classList.add('keyboard__key');
      }

      keyElement.textContent = key.keyRU;
      rowLayout.append(keyElement);

      if (newRow) {
        result.push(rowLayout);
        rowLayout = createRow();
      }
    });
    return result;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const heading = document.createElement('h1');
  const description = document.createElement('p');

  heading.textContent = 'RSS Virtual Keyboard';
  description.innerHTML = 'OS: Windows <br> Change Language: \'left ctrl/cmd + alt\' OR \'double click space\'';

  Keyboard.init();

  document.body.prepend(heading);
  document.body.append(description);
});
