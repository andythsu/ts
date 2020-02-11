import { Hero } from './interfaces';
import { Human } from './models';

let message: string = 'hello world';
console.log(message);

let hero: Hero = {
	name: 'hero1',
	age: 10
};

function createHuman(): Hero {
	return {
		name: 'hero2',
		age: 20
	};
}

console.log(new Human(createHuman()));
