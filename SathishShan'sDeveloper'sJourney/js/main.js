function isRectLeavingViewPort (rect, dir) {
	if (dir == 1) return rect.top + rect.height <= window.innerHeight;
	return rect.top + rect.height >= 0;
}

window.addEventListener('load', () => {
	setTimeout(() => {
		document.getElementById('loader').classList.add('hide');
	}, 1000);

	const sections = document.querySelectorAll('section');
	const container = document.getElementById('main-container');
	let currentViewSection = 0;
	let lastY = null;
	let isScrollLocked = false;

	sections.forEach(section => {
		section.style.backgroundColor = '#' + Math.floor(Math.random() * 255 ** 3).toString(16);
	});

	function lockScroll () {
		isScrollLocked = true;

		setTimeout(() => {
			isScrollLocked = false;
		}, 1100);
	}

	function handleScrollIntent (event) {
		event.preventDefault();

		if (isScrollLocked) return;

		let currentY;

		if (event.type == 'wheel') {
			currentY = event.deltaY;
		} else if (event.type === 'touchmove') {
			if (lastY === null) {
				lastY = event.touches[0].clientY;
				return;
			}

			currentY = lastY - event.touches[0].clientY;
			lastY = event.touches[0].clientY;
		}

		// if (sections[currentViewSection].scrollTop + window.innerHeight < sections[currentViewSection].scrollHeight - 10) return;

		if (currentY > 0) { // Scrolling down
			if (currentViewSection != sections.length - 1) {
				sections[currentViewSection].classList.add('hide');
				currentViewSection++;
				sections[currentViewSection].classList.remove('hide');
				lockScroll();
			}
		} else if (currentY < 0) { // Scrolling up
			if (currentViewSection != 0) {
				sections[currentViewSection].classList.add('hide');
				currentViewSection--;
				sections[currentViewSection].classList.remove('hide');
				lockScroll();
			}
		}
	}

	function resetTouchPosition () {
		lastY = null;
	}

	container.addEventListener('wheel', handleScrollIntent);
	container.addEventListener('touchmove', handleScrollIntent);
	container.addEventListener('touchend', resetTouchPosition);
	container.addEventListener('touchcancel', resetTouchPosition);
});

window.addEventListener('contextmenu', (event) => {
	event.preventDefault();
});
