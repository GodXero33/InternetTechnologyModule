(function () {
	const container = document.getElementById('normal-frame');
	const display1 = document.getElementById('normal-answer-display1');
	const display2 = document.getElementById('normal-answer-display2');
	const btns = Array.from(container.querySelectorAll('.btn'));
	let equation = '&nbsp;';
	let openBrackets = 0;

	function updateEquation () {
		display1.innerHTML = equation;
		
		try {
			let str = equation.replaceAll('×', '*').replace('&nbsp;', '');
			let answer = eval(str);
			display2.innerHTML = answer || 0;
		} catch (err) {
			// console.warn(err);
		}
	}

	btns[4].addEventListener('click', () => {
		equation = '&nbsp;';
		updateEquation();
	});

	btns[5].addEventListener('click', () => {
		if (isNaN(equation[equation.length - 1])) {
			if (equation[equation.length - 1] == ')' && openBrackets != 0) {
				equation += ')';
				openBrackets--;
			} else {
				equation += '(';
				openBrackets++;
			}
		} else {
			if (openBrackets != 0) {
				equation += ')';
				openBrackets--;
			}
		}

		updateEquation();
	});

	btns[6].addEventListener('click', () => {
		updateEquation();
	});

	btns[7].addEventListener('click', () => {
		if (!isNaN(equation[equation.length - 1]) || openBrackets == 0) {
			equation += '/';
			updateEquation();
		}
	});

	btns[8].addEventListener('click', () => {
		equation += '7';
		updateEquation();
	});

	btns[9].addEventListener('click', () => {
		equation += '8';
		updateEquation();
	});

	btns[10].addEventListener('click', () => {
		equation += '9';
		updateEquation();
	});

	btns[11].addEventListener('click', () => {
		if (!isNaN(equation[equation.length - 1]) || openBrackets == 0) {
			equation += '×';
			updateEquation();
		}
	});

	btns[12].addEventListener('click', () => {
		equation += '4';
		updateEquation();
	});

	btns[13].addEventListener('click', () => {
		equation += '5';
		updateEquation();
	});

	btns[14].addEventListener('click', () => {
		equation += '6';
		updateEquation();
	});

	btns[15].addEventListener('click', () => {
		if (!isNaN(equation[equation.length - 1]) || openBrackets == 0) {
			equation += '-';
			updateEquation();
		}
	});

	btns[16].addEventListener('click', () => {
		equation += '1';
		updateEquation();
	});

	btns[17].addEventListener('click', () => {
		equation += '2';
		updateEquation();
	});

	btns[18].addEventListener('click', () => {
		equation += '3';
		updateEquation();
	});

	btns[19].addEventListener('click', () => {
		if (!isNaN(equation[equation.length - 1]) || openBrackets == 0) {
			equation += '+';
			updateEquation();
		}
	});

	btns[20].addEventListener('click', () => {
		equation += '0';
		updateEquation();
	});

	btns[21].addEventListener('click', () => {
		if (!isNaN(equation[equation.length - 1]) || openBrackets == 0) {
			equation += '.';
			updateEquation();
		}
	});

	btns[22].addEventListener('click', () => {
		equation = equation.substring(0, -1);
		updateEquation();
	});

	btns[23].addEventListener('click', () => {
		equation = '&nbsp;';
		display1.innerHTML = equation;
	});
	
	window.addEventListener('keydown', (event) => {
		if (currentCal != 'normal') return;
		
		const code = event.key;

		if (code === '') {
			btns[4].click();
		} else if (code === '') {
			btns[4].click();
		} else if (code === '') {
			btns[4].click();
		} else if (code === '') {
			btns[4].click();
		} else if (code === 'Delete') {
			btns[4].click();
		} else if (code === '(' || code === ')') {
			btns[5].click();
		} else if (code === '%') {
			btns[6].click();
		} else if (code === '/') {
			btns[7].click();
		} else if (code === '7') {
			btns[8].click();
		} else if (code === '8') {
			btns[9].click();
		} else if (code === '9') {
			btns[10].click();
		} else if (code === '*' || code == 'x') {
			btns[11].click();
		} else if (code === '4') {
			btns[12].click();
		} else if (code === '5') {
			btns[13].click();
		} else if (code === '6') {
			btns[14].click();
		} else if (code === '-') {
			btns[15].click();
		} else if (code === '1') {
			btns[16].click();
		} else if (code === '2') {
			btns[17].click();
		} else if (code === '3') {
			btns[18].click();
		} else if (code === '+') {
			btns[19].click();
		} else if (code === '0') {
			btns[20].click();
		} else if (code === '.') {
			btns[21].click();
		} else if (code === 'Backspace') {
			btns[22].click();
		} else if (code === '=' || code === 'Enter') {
			btns[23].click();
		}
	});
})();
