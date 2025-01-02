(function (exports) {
	const CHAT_DATA = [
		{
			message: "Hello! This AI is created by GodXero and is specifically designed to assist with child care. The AI should always communicate in a friendly, warm, and approachable tone to ensure it feels safe and inviting. Responses must be short, simple, and tailored to child care topics, avoiding any mention of coding, technical details, or lengthy explanations. If someone asks 'Who are you?', the AI should respond clearly and concisely with just 'GodXero.' The goal is to create a conversational experience that feels supportive, kind, and easy to understand, ensuring all interactions are helpful and engaging for users."
		}
	];

	let messageContainer = null;
	let messageInput = null;
	let senderSelecters = null;
	let isShiftOnInputDown = false;
	let bubblePopSound = null;
	let mdConverter = new showdown.Converter();

	function requestFromGoogleAIStudio () {
		const parts = CHAT_DATA.map(entry => {
			return { text: entry.message };
		});
		const sendData = JSON.stringify({
			contents: [ { parts } ]
		});

		return new Promise(async (req, rej) => {
			try {
				const key = 'MY_KEY';
				const response = await fetch(
					'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + key,
					{
						'method': 'POST',
						'headers': {
							'Content-Type': 'application/json'
						},
						'body': sendData
					}
				);

				if (!response.ok) throw new Error('Failed to fetch from google.');

				const data = await response.json();
				req(data);
			} catch (error) {
				rej({
					message: error.message
				});
			}
		});
	}

	async function handleRequest () {
		const response = await requestFromGoogleAIStudio();
		const responseMessage = response.candidates[0].content.parts[0].text;
		const currentTime = getFormatedCurrentTime();

		addNewChatEntry(
			responseMessage,
			currentTime[0],
			currentTime[1],
			0
		);

		messageInput.disabled = false;
		senderSelecters[1].checked = true;
		messageInput.focus();
	}

	function getFormatedCurrentTime () {
		const time = new Date();
		const year = time.getFullYear().toString();
		const month = time.getMonth().toString().padStart(2, '0');
		const date = time.getDate().toString().padStart(2, '0');
		const hours = time.getHours().toString().padStart(2, '0');
		const minutes = time.getMinutes().toString().padStart(2, '0');
		const seconds = time.getSeconds().toString().padStart(2, '0');

		return [
			`${date}/${month}/${year}`,
			`${hours}:${minutes}:${seconds}`
		];
	}

	function addNewChatEntryToData (message, date, time, sender) {
		CHAT_DATA.push({ message, date, time, sender: sender == 0 ? 'GodXero' : 'User' });
	}

	function addNewChatEntry (message, date, time, sender) {
		addNewChatEntryToData(message, date, time, sender);

		const boxDiv = document.createElement('div');
		const timeDiv = document.createElement('div');
		const messageDiv = document.createElement('div');

		boxDiv.classList.add('message-box');
		timeDiv.classList.add('time');
		messageDiv.classList.add('message');

		if (sender == 1) boxDiv.classList.add('second');

		timeDiv.textContent = `${date} - ${time}`;
		messageDiv.innerHTML = mdConverter.makeHtml(message);

		boxDiv.appendChild(timeDiv);
		boxDiv.appendChild(messageDiv);

		messageContainer.appendChild(boxDiv);
		messageContainer.scrollTop = messageContainer.scrollHeight;
		bubblePopSound.currentTime = 0;
		bubblePopSound.play();
	}

	function sendMessage () {
		if (messageInput.value == '') return;

		const currentTime = getFormatedCurrentTime();

		addNewChatEntry(
			messageInput.value,
			currentTime[0],
			currentTime[1],
			1
		);
		handleRequest(messageInput.value);

		messageInput.value = '';
		messageInput.disabled = true;
		senderSelecters[0].checked = true;
	}

	function initEventListeners () {
		messageInput.addEventListener('keydown', (event) => {
			if (event.code == 'Enter' && !isShiftOnInputDown) {
				sendMessage();
			} else if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
				isShiftOnInputDown = true;
			}
		});

		messageInput.addEventListener('keyup', (event) => {
			if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') isShiftOnInputDown = false;
		});

		document.getElementById('send-btn').addEventListener('click', sendMessage);

		window.addEventListener('resize', () => {
			messageContainer.scrollTop = messageContainer.scrollHeight;
		});
	}

	function init () {
		messageContainer = document.getElementById('chat-content');
		messageInput = document.getElementById('message-input');
		senderSelecters = Array.from(document.getElementById('sender-selection-container').querySelectorAll('input[type="radio"]'));
		bubblePopSound = document.getElementById('bubble-pop');
		bubblePopSound.volume = 0.2;

		initEventListeners();
		messageInput.focus();
	}

	exports.init = init;
})(CHAT_OBJECT = {});

window.addEventListener('load', async () => {
	CHAT_OBJECT.init();
});
