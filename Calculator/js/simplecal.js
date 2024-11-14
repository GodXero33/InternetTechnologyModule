(function () {
	const radios = Array.from(document.getElementById('simple-frame').querySelectorAll('input[type="radio"]'));
	const num1 = document.getElementById('simple-cal-num1');
	const num2 = document.getElementById('simple-cal-num2');
	const dis = document.getElementById('simple-answer-display');

	function calculate () {
		const operator = radios.findIndex(btn => btn.checked);
		let answer = 0;

		if (operator == 0) {
			answer = num1.value * 1 + num2.value * 1;
		} else if (operator == 1) {
			answer = num1.value * 1 - num2.value * 1;
		} else if (operator == 2) {
			answer = num1.value * 1 * num2.value * 1;
		} else if (operator == 3) {
			answer = num1.value * 1 / num2.value * 1;
		} else {
			answer = num1.value * 100 / num2.value * 1;
			answer += '%';
		}

		dis.textContent = answer;
	}
	
	document.getElementById('simple-cal-btn').addEventListener('click', calculate);
	document.getElementById('simple-cal-btn').addEventListener('keydown', (event) => {
		if (event.code == 'Enter') {
			calculate();
		}
	});
})();
