import { EventEmitter } from 'typed-event-emitter';

export class Animal extends EventEmitter {
	private onNameChanged = this.registerEvent<(newName: string) => any>();

	private _name: string;

	constructor(name: string) {
		super();
		this._name = name;
		this.onNameChanged(name => {
			console.log(`new name ${name}`);
		});
	}

	get name() {
		return this._name;
	}

	set name(name: string) {
		this._name = name;
		this.emit(this.onNameChanged, name);
	}
}
