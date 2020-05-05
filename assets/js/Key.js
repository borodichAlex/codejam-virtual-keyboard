export default class Key {
  constructor({ lower, upper, code }) {
    this.code = code;
    this.lower = lower;
    this.upper = upper;

    this.elem = document.createElement('button');
    this.elem.setAttribute('type', 'button');
    switch (code) {
      case 'Backspace':
      case 'CapsLock':
      case 'ShiftLeft':
      case 'ShiftRight':
      case 'Enter':
        this.elem.classList.add('keyboard__key', 'keyboard__key--width_middle');
        break;
      case 'Space':
        this.elem.classList.add('keyboard__key', 'keyboard__key--width_large');
        break;
      case 'ControlLeft':
      case 'ControlRight':
      case 'Tab':
        this.elem.classList.add('keyboard__key', 'keyboard__key--width_small');
        break;
      default:
        this.elem.classList.add('keyboard__key');
    }
    this.elem.textContent = this.lower;
  }

  change(lower, upper) {
    this.lower = lower;
    this.upper = upper;
    this.elem.textContent = this.lower;
  }
}
