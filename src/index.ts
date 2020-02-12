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

let dog = new Animal('dog');
let cat = new Animal('cat');
setTimeout(() => {
	console.log('timeout finished');
	dog.name = 'dog2';
	cat.name = 'cat2';
}, 3000);
