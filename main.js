const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    textarea: null,
    keys: [],
  },
  properties: {
    keysArr: [
      {
        code: 'Backquote', keyRU: 'ё', keyShiftRU: 'Ё', keyENG: '`', keyShiftENG: '~',
      },
      {
        code: 'Digit1', keyRU: '1', keyShiftRU: '!', keyShiftENG: '!',
      },
      {
        code: 'Digit2', keyRU: '2', keyShiftRU: '"', keyShiftENG: '@',
      },
      {
        code: 'Digit3', keyRU: '3', keyShiftRU: '№', keyShiftENG: '#',
      },
      {
        code: 'Digit4', keyRU: '4', keyShiftRU: ';', keyShiftENG: '$',
      },
      {
        code: 'Digit5', keyRU: '5', keyShiftRU: '%', keyShiftENG: '%',
      },
      {
        code: 'Digit6', keyRU: '6', keyShiftRU: ':', keyShiftENG: '^',
      },
      {
        code: 'Digit7', keyRU: '7', keyShiftRU: '?', keyShiftENG: '&',
      },
      {
        code: 'Digit8', keyRU: '8', keyShiftRU: '*', keyShiftENG: '*',
      },
      {
        code: 'Digit9', keyRU: '9', keyShiftRU: '(', keyShiftENG: '(',
      },
      {
        code: 'Digit0', keyRU: '0', keyShiftRU: ')', keyShiftENG: ')',
      },
      {
        code: 'Minus', keyRU: '-', keyShiftRU: '_', keyShiftENG: '_',
      },
      {
        code: 'Equal', keyRU: '=', keyShiftRU: '+', keyShiftENG: '+',
      },
      {
        code: 'Backspace', keyRU: 'Backspace',
      },
      {
        code: 'Tab', keyRU: 'Tab',
      },
      {
        code: 'KeyQ', keyRU: 'й', keyENG: 'q',
      },
      {
        code: 'KeyW', keyRU: 'ц', keyENG: 'w',
      },
      {
        code: 'KeyE', keyRU: 'у', keyENG: 'e',
      },
      {
        code: 'KeyR', keyRU: 'к', keyENG: 'r',
      },
      {
        code: 'KeyT', keyRU: 'е', keyENG: 't',
      },
      {
        code: 'KeyY', keyRU: 'н', keyENG: 'y',
      },
      {
        code: 'KeyU', keyRU: 'г', keyENG: 'u',
      },
      {
        code: 'KeyI', keyRU: 'ш', keyENG: 'i',
      },
      {
        code: 'KeyO', keyRU: 'щ', keyENG: 'o',
      },
      {
        code: 'KeyP', keyRU: 'з', keyENG: 'p',
      },
      {
        code: 'BracketLeft', keyRU: 'х', keyShiftRU: 'Х', keyENG: '[', keyShiftENG: '{',
      },
      {
        code: 'BracketRight', keyRU: 'ъ', keyShiftRU: 'Ъ', keyENG: ']', keyShiftENG: '}',
      },
      {
        code: 'BracketRight', keyRU: '\\', keyShiftRU: '/', keyENG: '\\', keyShiftENG: '|',
      },
      {
        code: 'Delete', keyRU: 'Del',
      },
      {
        code: 'CapsLock', keyRU: 'Caps Lock',
      },
      {
        code: 'KeyA', keyRU: 'ф', keyENG: 'a',
      },
      {
        code: 'KeyS', keyRU: 'ы', keyENG: 's',
      },
      {
        code: 'KeyD', keyRU: 'в', keyENG: 'd',
      },
      {
        code: 'KeyF', keyRU: 'а', keyENG: 'f',
      },
      {
        code: 'KeyG', keyRU: 'п', keyENG: 'g',
      },
      {
        code: 'KeyH', keyRU: 'р', keyENG: 'h',
      },
      {
        code: 'KeyJ', keyRU: 'о', keyENG: 'j',
      },
      {
        code: 'KeyK', keyRU: 'л', keyENG: 'k',
      },
      {
        code: 'KeyL', keyRU: 'д', keyENG: 'l',
      },
      {
        code: 'Semicolon', keyRU: 'ж', keyShiftRU: 'Ж', keyENG: ';', keyShiftENG: ':',
      },
      {
        code: 'Quote', keyRU: 'э', keyShiftRU: 'Э', keyENG: '\'', keyShiftENG: '"',
      },
      {
        code: 'Enter', keyRU: 'Enter',
      },
      {
        code: 'ShiftLeft', keyRU: 'Shift',
      },
      {
        code: 'KeyZ', keyRU: 'я', keyENG: 'z',
      },
      {
        code: 'KeyX', keyRU: 'ч', keyENG: 'x',
      },
      {
        code: 'KeyC', keyRU: 'с', keyENG: 'c',
      },
      {
        code: 'KeyV', keyRU: 'м', keyENG: 'v',
      },
      {
        code: 'KeyB', keyRU: 'и', keyENG: 'b',
      },
      {
        code: 'KeyN', keyRU: 'т', keyENG: 'n',
      },
      {
        code: 'KeyM', keyRU: 'ь', keyENG: 'm',
      },
      {
        code: 'Comma', keyRU: 'б', keyShiftRU: 'Б', keyENG: ',', keyShiftENG: '<',
      },
      {
        code: 'Period', keyRU: 'ю', keyShiftRU: 'Ю', keyENG: '.', keyShiftENG: '>',
      },
      {
        code: 'Slash', keyRU: '.', keyShiftRU: ',', keyENG: '/', keyShiftENG: '?',
      },
      {
        code: 'ArrowUp', keyRU: '🠕',
      },
      {
        code: 'ShiftRight', keyRU: 'Shift',
      },
      {
        code: 'ControlLeft', keyRU: 'Ctrl',
      },
      {
        code: 'OSLeft', keyRU: 'Win',
      },
      {
        code: 'AltLeft', keyRU: 'Alt',
      },
      {
        code: 'Space', keyRU: ' ',
      },
      {
        code: 'AltRight', keyRU: 'Alt',
      },
      {
        code: 'ArrowLeft', keyRU: '🠔',
      },
      {
        code: 'ArrowDown', keyRU: '🠗',
      },
      {
        code: 'ArrowRight', keyRU: '🠖',
      },
      {
        code: 'ControlRight', keyRU: 'Ctrl',
      },
    ],
    caps: 'false',
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');
    this.elements.textarea = document.createElement('textarea');

    // Setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.append(...(this.createKeys()));

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.append(this.elements.textarea);
    this.elements.main.append(this.elements.keysContainer);
    document.body.prepend(this.elements.main);
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
          keyElement.classList.add('keyboard__key', 'keyboard__key--width_small');
          break;
        case ' ':
          keyElement.classList.add('keyboard__key', 'keyboard__key--width_large');
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
  description.innerHTML = 'OS: Windows <br> Change Language: left ctrl/cmd + alt';

  Keyboard.init();

  document.body.prepend(heading);
  document.body.append(description);
});
