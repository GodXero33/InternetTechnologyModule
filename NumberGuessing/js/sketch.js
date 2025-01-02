const input = document.querySelector('input');
const btn = document.querySelector('button');
const info = document.querySelector('p');
const countDis = document.querySelectorAll('h2')[1];

let number = Math.floor(Math.random() * 10) + 1;
let count = 3;
let isActive = true;

function reset () {
	number = Math.floor(Math.random() * 10) + 1;
	count = 3;
	isActive = false;
	btn.disabled = true;

	setTimeout(() => {
		countDis.textContent = `Chances Left: ${count}`;
		info.textContent = 'Guess the number';
		isActive = true;
		btn.disabled = false;
	}, 2000);
}

btn.addEventListener('click', () => {
	if (!isActive) return;

	const value = input.value * 1;

	if (value < number) {
		info.textContent = 'The Number is Lower';
		count--;
		countDis.textContent = `Chances Left: ${count}`;

		if (count == 0) {
			info.textContent = 'Game over! The Correct number was ' + number;
			reset();
		}
	} else if (value > number) {
		info.textContent = 'The Number is Higher';
		count--;
		countDis.textContent = `Chances Left: ${count}`;

		if (count == 0) {
			info.textContent = 'Game over! The Correct number was ' + number;
			reset();
		}
	} else {
		info.textContent = 'You have guessed the number';
		reset();
	}
});
