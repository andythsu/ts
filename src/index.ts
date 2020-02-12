import { Hero } from './interfaces';
import { Animal, Human } from './models';

let message: string = 'hello world';
console.log(message);

function createHuman(): Hero {
	return {
		name: 'hero2',
		age: 20
	};
}

console.log(new Human(createHuman()));

let animal = new Animal('dog');
console.log(animal.name);
animal.onNameChanged(name => {
	console.log(`name is changed to ${name}`);
});
animal.name = 'cat';
