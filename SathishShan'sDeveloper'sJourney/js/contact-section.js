(function (exports) {
	const section = document.getElementById('contact-section');
	const consoleElem = document.getElementById('contact-console');
	let form = section.querySelector('form');
	const input = section.querySelector('input');
	let isFocus = false;
	const message = {};
	let currentField = 0;
	const fields = ['name', 'age', 'email', 'message'];
	const actions = {
		'name': (name) => {
			if (/^(?!\s*$).+/.test(name)) {
				message.name = name;
				return true;
			}

			return false;
		},
		'age': (age) => {
			if (/^\d+$/.test(age)) {
				message.age = age;
				return true;
			}

			return false;
		},
		'email': (email) => {
			if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
				message.email = email;
				return true;
			}

			return false;
		},
		'message': (message) => {
			if (/^(?!\s*$).+/.test(message)) {
				message.message = message;
				return true;
			}

			return false;
		}
	};

	function focus () {
		isFocus = true;
		input.focus();
	}

	function blur () {
		isFocus = false;
		input.blur();
	}

	function uploadMessage () {
		return new Promise((req, rej) => {
			setTimeout(req, 2000);
		});
	}

	async function submitMessage () {
		try {
			const response = await uploadMessage();
			alert('message sent');
		} catch (error) {
			alert('Failed to send the message!');
		}

		currentField = 0;
		consoleElem.innerHTML = '';

		const p = document.createElement('p');
		p.textContent = `Enter your ${fields[currentField]}:`;
		consoleElem.appendChild(p);

		form.removeEventListener('submit', submit);
		form = document.createElement('form');
		form.addEventListener('submit', submit);
		form.appendChild(input);
		consoleElem.appendChild(form);

		input.disabled = false;

		if (isFocus) input.focus();
	}

	function submit (event) {
		event.preventDefault();

		form.removeEventListener('submit', submit);
		form = document.createElement('form');
		form.addEventListener('submit', submit);
		form.appendChild(input);

		const value = input.value.trim();
		consoleElem.innerHTML = '';

		if (actions[fields[currentField]](value)) {
			currentField++;

			const p1 = document.createElement('p');
			p1.textContent = value;
			consoleElem.appendChild(p1);

			if (currentField == fields.length) {
				const p2 = document.createElement('p');
				p2.textContent = 'Please Wait!';
				consoleElem.appendChild(p2);
				input.disabled = true;
				submitMessage();
			} else {
				const p2 = document.createElement('p');
				p2.textContent = `Enter your ${fields[currentField]}:`;
				consoleElem.appendChild(p2);
			}

			input.value = '';
			consoleElem.appendChild(form);
		} else {
			const p1 = document.createElement('p');
			p1.textContent = `Invalid ${fields[currentField]}!`;

			const p2 = document.createElement('p');
			p2.textContent = `Enter your ${fields[currentField]}:`;

			input.value = '';
			consoleElem.appendChild(p1);
			consoleElem.appendChild(p2);
			consoleElem.appendChild(form);
		}

		input.focus();
	}

	section.addEventListener('click', () => {
		if (!isFocus) return;
		input.focus();
	});

	form.addEventListener('submit', submit);

	exports.focus = focus;
	exports.blur = blur;
})(CONTACT = {});
