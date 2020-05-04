import Key from './Key.js';
import languages from './languages/languages.js';

const Lang = {
  set(lang) {
    sessionStorage.setItem('Lang', lang);
  },
  get() {
    return sessionStorage.getItem('Lang');
  },
};

export default class Keyboard {
  constructor(output, baseLang = 'en') {
    this.output = output;
    this.layoutBase = languages[baseLang];

    this.elem = document.createElement('div');
    this.elem.classList.add('keyboard');
    this.elem.append(...this.generateLayout());
  }

  generateLayout() {
    const layout = [];

    const createRow = () => {
      const row = document.createElement('div');
      row.classList.add('keyboard__row');
      return row;
    };
    let rowLayout = createRow();

    this.layoutBase.forEach((key) => {
      const { code, elem } = new Key(key);

      const newRow = ['Backspace', 'Delete', 'Enter', 'ShiftRight'].indexOf(code) !== -1;

      rowLayout.append(elem);

      if (newRow) {
        layout.push(rowLayout);
        rowLayout = createRow();
      }
    });
    layout.push(rowLayout);

    return layout;
  }
}
