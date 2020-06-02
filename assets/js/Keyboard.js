import Key from './Key.js';
import languages from './languages/languages.js';

const Lang = {
  set(lang) {
    sessionStorage.setItem('kbLang', lang);
  },
  get() {
    if (!sessionStorage.getItem('kbLang')) this.set('ru');
    return sessionStorage.getItem('kbLang');
  },
};

export default class Keyboard {
  constructor(output, baseLang = Lang.get()) {
    this.output = output;
    this.layoutBase = languages[baseLang];
    this.isShift = 'lower';
    this.dependCaps = false;

    this.elem = document.createElement('div');
    this.elem.classList.add('keyboard');
    this.elem.append(...this.generateLayout());

    this.addHandlerEvent();
  }

  generateLayout() {
    const layout = [];
    this.layoutButtons = [];

    const createRow = () => {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');
      return row;
    };
    let rowLayout = createRow();

    this.layoutBase.forEach((el) => {
      const button = new Key(el);

      const newRow = ['Backspace', 'Delete', 'Enter', 'ShiftRight'].indexOf(button.code) !== -1;

      if (button.code === 'Space') {
        this.space = button.elem;
      }
      rowLayout.append(button.elem);
      this.layoutButtons.push(button);

      if (newRow) {
        layout.push(rowLayout);
        rowLayout = createRow();
      }
    });
    layout.push(rowLayout);

    return layout;
  }

  addHandlerEvent() {
    document.addEventListener('keydown', this.handleEvent);
    document.addEventListener('keyup', this.handleEvent);
    this.elem.addEventListener('mousedown', this.preHandleEvent);
    this.elem.addEventListener('mouseup', this.preHandleEvent);
    this.elem.addEventListener('mouseover', this.preHandleEvent);
    this.elem.addEventListener('mouseout', this.preHandleEvent);
    document.addEventListener('mouseup', () => {
      const key = this.layoutButtons.find(({ elem }) => elem.classList.contains('keyboard__key--active'));
      if (!key) return;
      key.elem.classList.remove('keyboard__key--active');
    });
    this.space.addEventListener('dblclick', () => {
      this.switchLang();
    });
  }

  preHandleEvent = (e) => {
    e.stopPropagation();
    const buttons = [...this.elem.querySelectorAll('.keyboard__key')];
    const button = e.target.closest('.keyboard__key');
    if (!button) return;
    const buttonIndex = buttons.findIndex((btn) => btn === button);
    const { code } = this.layoutButtons[buttonIndex];
    this.handleEvent({ code, type: e.type });
  };

  handleEvent = (e) => {
    if (e.stopPropagation) e.stopPropagation();

    const { code: eCode, type } = e;
    const button = this.layoutButtons.find(({ code: bCode }) => bCode === eCode);

    if (!button) return;
    this.output.focus();

    if (type === 'mouseover') button.elem.classList.add('keyboard__key--hover');
    if (type === 'mouseout') button.elem.classList.remove('keyboard__key--hover');
    if (type === 'keydown' || type === 'mousedown') {
      if (type === 'keydown') {
        e.preventDefault();
        // switch lang
        if (e.altKey && (e.ctrlKey || e.metaKey)) {
          this.switchLang();
        }
      }

      button.elem.classList.add('keyboard__key--active');

      if (e.code.includes('Shift') && this.isShift === 'lower') {
        this.isShift = 'upper';
        this.toggleShift();
        if (this.isCaps === 'upper') {
          this.toggleCapsLock();
          this.dependCaps = true;
        }
      }

      if (e.code.includes('Caps')) {
        this.toggleCapsLock();
      }
      this.onInput(button.elem);
    } else if (type === 'keyup' || type === 'mouseup') {
      if (type === 'mouseup') {
        const key = this.layoutButtons.find(({ elem }) => elem.classList.contains('keyboard__key--active'));
        if (!key) return;
        key.elem.classList.remove('keyboard__key--active');
      }

      button.elem.classList.remove('keyboard__key--active');
      if (e.code.includes('Shift')) {
        this.isShift = 'lower';
        this.toggleShift();

        if (this.dependCaps) {
          this.toggleCapsLock();
          this.dependCaps = false;
        }
      }
    }
  }

  toggleCapsLock() {
    if (!this.isCaps) this.isCaps = 'lower';
    this.isCaps = (this.isCaps === 'lower') ? 'upper' : 'lower';

    this.layoutButtons.forEach((button) => {
      const node = button.elem;
      if (button.upper && button.lower === button.upper.toLowerCase()) {
        node.textContent = button[this.isCaps];
      }
    });
  }

  toggleShift() {
    this.layoutButtons.forEach((button) => {
      const node = button.elem;
      if (button.upper) {
        node.textContent = button[this.isShift];
      }
    });
  }

  onInput(button) {
    const text = this.output;
    const textInner = this.output.innerHTML;
    let posCursor = text.selectionStart;
    const templateStr = (ch) => textInner.slice(0, posCursor) + ch + textInner.slice(posCursor);

    switch (button.textContent) {
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
        text.innerHTML = templateStr(button.textContent);
        posCursor += 1;
      }
    }
    text.setSelectionRange(posCursor, posCursor);
  }

  switchLang() {
    const langAbbr = Object.keys(languages);
    let langIdx = langAbbr.indexOf(Lang.get());
    this.layoutBase = langIdx + 1 < langAbbr.length ? languages[langAbbr[langIdx += 1]]
      : languages[langAbbr[langIdx -= langIdx]];

    Lang.set(langAbbr[langIdx]);

    this.layoutButtons.forEach((button) => {
      const key = this.layoutBase.find(({ code: kCode }) => kCode === button.code);
      if (!key) return;
      button.change(key.lower, key.upper);
    });

    if (this.isCaps === 'upper') {
      this.isCaps = 'lower';
      this.toggleCapsLock();
    }
    if (this.isShift === 'upper') this.toggleShift();
  }
}
