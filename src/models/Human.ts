import { Hero } from '../interfaces';

export class Human {
	name: string = '';
	age: number = 0;
	constructor(hero: Hero) {
		this.name = hero.name;
		this.age = hero.age;
	}
}
