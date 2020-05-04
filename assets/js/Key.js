export default class Key {
	constructor({ lower, upper, code }) {
		this.code = code;
		this.lower = lower;
		this.upper = upper;
		// this.isFnKey = Boolean(lower.match(/Ctrl|arr|Alt|Shift|Tab|Back|Del|Enter|Caps|Win/));

		if (upper && upper.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
			this.sub = create('div', 'sub', this.upper);
		} else {
			this.sub = create('div', 'sub', '');
		}

		this.letter = create('div', 'letter', lower);
		this.div = create('div', 'keyboard__key', [this.sub, this.letter], null, ['code', this.code],
			this.isFnKey ? ['fn', 'true'] : ['fn', 'false']);
	}
}