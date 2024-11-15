(function () {
	const section = document.getElementById('skill-section');
	const navBtns = section.querySelectorAll('.navi-btn');
	const cards = section.querySelectorAll('.card');

	let currentCard = 0;

	function viewCard (index) {
		cards[currentCard].classList.add('hide');
		currentCard = index;
		cards[currentCard].classList.remove('hide');

		if (currentCard == 0) {
			navBtns[0].classList.add('disable');
		} else if (currentCard == cards.length - 1) {
			navBtns[1].classList.add('disable');
		} else {
			navBtns[0].classList.remove('disable');
			navBtns[1].classList.remove('disable');
		}
	}

	navBtns[0].addEventListener('click', () => {
		if (currentCard != 0) viewCard(currentCard - 1);
	});

	navBtns[1].addEventListener('click', () => {
		if (currentCard != cards.length - 1) viewCard(currentCard + 1);
	});
})();
