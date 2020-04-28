import keysArr from './assets/js/keys.js';

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

    if (!sessionStorage.Lang) sessionStorage.setItem('Lang', 'RU');
    sessionStorage.Lang = (sessionStorage.Lang === 'RU') ? 'EN' : 'RU';
    this.toggleLang();

    this.properties.space.addEventListener('dblclick', () => {
      this.toggleLang();
    });

    document.addEventListener('keydown', (event) => {
      const keyIndex = this.properties.keysArr.findIndex((item) => item.code === event.code);
      const key = this.elements.keys[keyIndex];

      if (!key) return;
      if (this.elements.keysContainer.contains(key)) {
        key.classList.add('keyboard__key--active');
      }

      if (event.altKey && (event.ctrlKey || event.metaKey)) {
        this.toggleLang();
      }

      switch (event.code) {
        case 'ShiftLeft':
        case 'ShiftRight': {
          this.shiftDown();
          break;
        }
        case 'CapsLock': {
          this.toggleCapsLock();
          break;
        }
        default: {
          event.preventDefault();
        }
      }

      this.oninput(key);
    });

    document.addEventListener('keyup', (event) => {
      const keyIndex = this.properties.keysArr.findIndex((item) => item.code === event.code);
      const key = this.elements.keys[keyIndex];

      if (!key) return;
      if (this.elements.keysContainer.contains(key)) {
        key.classList.remove('keyboard__key--active');
      }

      switch (event.code) {
        case 'ShiftLeft':
        case 'ShiftRight':
          this.shiftUp();
          break;
        default: break;
      }
    });

    this.elements.keysContainer.addEventListener('mouseover', (event) => {
      const key = event.target.closest('button');
      if (!key) return;
      if (!this.elements.keysContainer.contains(key)) return;
      key.classList.add('keyboard__key--hover');
    });

    this.elements.keysContainer.addEventListener('mouseout', (event) => {
      const key = event.target.closest('button');
      if (!key) return;
      if (!this.elements.keysContainer.contains(key)) return;
      key.classList.remove('keyboard__key--hover');
    });

    this.elements.keysContainer.addEventListener('mousedown', (event) => {
      const key = event.target.closest('button');

      if (!key) return;
      if (!this.elements.keysContainer.contains(key)) return;

      key.classList.add('keyboard__key--active');

      event.preventDefault();

      switch (key.textContent) {
        case 'Caps Lock':
          this.toggleCapsLock();
          break;
        case 'Shift':
          this.shiftDown();
          break;
        default: break;
      }

      this.oninput(key);
    });

    document.addEventListener('mouseup', () => {
      const key = [...this.elements.keys].find((item) => item.classList.contains('keyboard__key--active'));
      if (!key) return;
      if (this.elements.keysContainer.contains(key)) {
        key.classList.remove('keyboard__key--active');
      }
      if (key.textContent === 'Shift') this.shiftUp();
    });
  },

  toggleLang() {
    if (sessionStorage.Lang === 'RU') {
      sessionStorage.Lang = 'EN';

      this.elements.keys.forEach((key, i) => {
        const chKey = this.properties.keysArr[i];

        if (this.properties.caps === 'false') {
          this.elements.keys[i].textContent = chKey.keyENG || chKey.keyRU;
        }
        if (this.properties.caps === 'true') {
          this.elements.keys[i].textContent = chKey.keyENG || chKey.keyRU;
          this.properties.caps = 'false';
          this.toggleCapsLock();
        }
      });
    } else if (sessionStorage.Lang === 'EN') {
      sessionStorage.Lang = 'RU';

      this.elements.keys.forEach((key, i) => {
        const chKey = this.properties.keysArr[i];

        if (this.properties.caps === 'false') {
          this.elements.keys[i].textContent = chKey.keyRU;
        }
        if (this.properties.caps === 'true') {
          this.elements.keys[i].textContent = chKey.keyRU;
          this.properties.caps = 'false';
          this.toggleCapsLock();
        }
      });
    }
  },

  shiftUp() {
    if (sessionStorage.Lang === 'RU') {
      this.elements.keys.forEach((key, i) => {
        const chKey = this.properties.keysArr[i];

        if (this.properties.caps === 'false') {
          this.elements.keys[i].textContent = chKey.keyRU;
        }
        if (this.properties.caps === 'true') {
          if (chKey.code.includes('Key') || (chKey.keyShiftRU === chKey.keyRU.toUpperCase())) {
            this.elements.keys[i].textContent = chKey.keyRU.toUpperCase();
          } else {
            this.elements.keys[i].textContent = chKey.keyRU;
          }
        }
      });
    } else if (sessionStorage.Lang === 'EN') {
      this.elements.keys.forEach((key, i) => {
        const chKey = this.properties.keysArr[i];

        if (this.properties.caps === 'false') {
          if (chKey.code.includes('Key')) {
            this.elements.keys[i].textContent = chKey.keyENG;
          } else {
            this.elements.keys[i].textContent = chKey.keyENG || chKey.keyRU;
          }
        }
        if (this.properties.caps === 'true') {
          if (chKey.code.includes('Key')) {
            this.elements.keys[i].textContent = chKey.keyENG.toUpperCase();
          } else {
            this.elements.keys[i].textContent = chKey.keyENG || chKey.keyRU;
          }
        }
      });
    }
  },

  shiftDown() {
    if (sessionStorage.Lang === 'RU') {
      this.elements.keys.forEach((key, i) => {
        const chKey = this.properties.keysArr[i];

        if (this.properties.caps === 'false') {
          if (chKey.code.includes('Key')) {
            this.elements.keys[i].textContent = chKey.keyRU.toUpperCase();
          } else {
            this.elements.keys[i].textContent = chKey.keyShiftRU || chKey.keyRU;
          }
        }

        if (this.properties.caps === 'true') {
          if (chKey.code.includes('Key') || (chKey.keyShiftRU === chKey.keyRU.toUpperCase())) {
            this.elements.keys[i].textContent = chKey.keyRU;
          } else {
            this.elements.keys[i].textContent = chKey.keyShiftRU || chKey.keyRU;
          }
        }
      });
    } else if (sessionStorage.Lang === 'EN') {
      this.elements.keys.forEach((key, i) => {
        const chKey = this.properties.keysArr[i];

        if (this.properties.caps === 'false') {
          if (chKey.code.includes('Key')) {
            this.elements.keys[i].textContent = chKey.keyENG.toUpperCase();
          } else {
            this.elements.keys[i].textContent = chKey.keyShiftENG || chKey.keyENG || chKey.keyRU;
          }
        }

        if (this.properties.caps === 'true') {
          this.elements.keys[i].textContent = chKey.keyShiftENG || chKey.keyENG || chKey.keyRU;
        }
      });
    }
  },

  oninput(key) {
    const text = this.elements.textarea;
    const textInner = this.elements.textarea.innerHTML;
    let posCursor = text.selectionStart;
    const templateStr = (ch) => textInner.slice(0, posCursor) + ch + textInner.slice(posCursor);

    switch (key.textContent) {
      case 'Tab': {
        text.innerHTML = templateStr('\t');
        posCursor += 1;
        break;
      }
      case 'Enter': {
        text.innerHTML = templateStr('\n');
        posCursor += 1;
        break;
      }
      case 'Backspace': {
        text.innerHTML = textInner.slice(0, posCursor - 1) + textInner.slice(posCursor);
        posCursor -= 1;
        break;
      }
      case 'Del': {
        text.innerHTML = textInner.slice(0, posCursor) + textInner.slice(posCursor + 1);
        break;
      }
      case '🠔': {
        text.innerHTML = templateStr('&larr;');
        posCursor += 1;
        break;
      }
      case '🠖': {
        text.innerHTML = templateStr('&rarr;');
        posCursor += 1;
        break;
      }
      case '🠗': {
        text.innerHTML = templateStr('&darr;');
        posCursor += 1;
        break;
      }
      case '🠕': {
        text.innerHTML = templateStr('&uarr;');
        posCursor += 1;
        break;
      }
      case 'Shift':
      case 'Caps Lock':
      case 'Alt':
      case 'Win':
      case 'Ctrl':
        break;
      case 'RU':
      case 'EN':
        text.innerHTML = templateStr(' ');
        posCursor += 1;
        break;
      default: {
        text.innerHTML = templateStr(key.textContent);
        posCursor += 1;
      }
    }
    text.setSelectionRange(posCursor, posCursor);
  },

  toggleCapsLock() {
    if (this.properties.caps === 'true') {
      this.properties.caps = 'false';

      this.elements.keys.forEach((key, index) => {
        if (key.textContent.length < 2) {
          this.elements.keys[index].textContent = key.textContent.toLowerCase();
        }
      });
    } else {
      this.properties.caps = 'true';

      this.elements.keys.forEach((key, index) => {
        if (key.textContent.length < 2) {
          this.elements.keys[index].textContent = key.textContent.toUpperCase();
        }
      });
    }
  },

  createKeys() {
    const result = [];
    let rowLayout = document.createElement('div');
    rowLayout.classList.add('keyboard__row');

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

        rowLayout = document.createElement('div');
        rowLayout.classList.add('keyboard__row');
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
  console.log(keysArr)
  Keyboard.init();

  document.body.prepend(heading);
  document.body.append(description);
});
