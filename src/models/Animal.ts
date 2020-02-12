import { EventEmitter } from 'typed-event-emitter';

export class Animal extends EventEmitter {
	onNameChanged = this.registerEvent<(newName: string) => any>();

	private _name: string;

	constructor(name: string) {
		super();
		this._name = name;
	}

	get name() {
		return this._name;
	}

	set name(name: string) {
		this._name = name;
		this.emit(this.onNameChanged, name);
	}
}
