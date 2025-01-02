let sections;
let currentViewSection = 0;
let lastY = null;
let isScrollLocked = false;
const leftNavBarDivs = [];

function isRectLeavingViewPort (rect, dir) {
	if (dir == 1) return rect.top + rect.height <= window.innerHeight;
	return rect.top + rect.height >= 0;
}

function lockScroll () {
	isScrollLocked = true;
	COVER_CANVAS.scrollVelo = 10;

	setTimeout(() => {
		COVER_CANVAS.scrollVelo = 1;
	}, 1000);

	setTimeout(() => {
		isScrollLocked = false;
	}, 2100);
}

function updateViewSection (index) {
	sections[currentViewSection].classList.add('hide');
	leftNavBarDivs[currentViewSection].classList.remove('active');
	currentViewSection = index;
	sections[currentViewSection].classList.remove('hide');
	leftNavBarDivs[currentViewSection].classList.add('active');
	lockScroll();

	COVER_CANVAS.updateColor(currentViewSection);

	if (currentViewSection == sections.length - 1) {
		CONTACT.focus();
	} else {
		CONTACT.blur();
	}
}

function scrollHandle () {
	const container = document.getElementById('main-container');

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

		if (currentY > 0) { // Scrolling down
			if (currentViewSection != sections.length - 1) {
				updateViewSection(currentViewSection + 1);
			}
		} else if (currentY < 0) { // Scrolling up
			if (currentViewSection != 0) {
				updateViewSection(currentViewSection - 1);
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
}

function loaderHandle () {
	setTimeout(() => {
		document.getElementById('loader').classList.add('start');

		document.getElementById('start-btn').addEventListener('click', () => {
			document.getElementById('loader').classList.add('hide');
			sections[0].classList.remove('hide');
			COVER_CANVAS.init();

			setTimeout(() => {
				document.getElementById('loader').remove();
			}, 1000);
		}, { once: true });
	}, 1000);

	loaderHandle = null;
}

function leftNavBarHandle () {
	const leftNavBar = document.getElementById('left-nav-bar');

	sections.forEach((_, index) => {
		const div = document.createElement('div');
		leftNavBarDivs.push(div);
		leftNavBar.append(div);

		if (index == 0) {
			div.classList.add('active');
			currentViewSection = index;
		}

		div.addEventListener('click', () => {
			updateViewSection(index);
		});
	});
}

function resizeHandle () {
	window.addEventListener('resize', () => {
		COVER_CANVAS.resize();
	});

	COVER_CANVAS.resize();
	resizeHandle = null;
}

function animationHandle () {
	function animate () {
		COVER_CANVAS.animate();
		window.requestAnimationFrame(animate);
	}

	animate();
}

window.addEventListener('load', () => {
	sections = document.querySelectorAll('section');

	leftNavBarHandle();
	scrollHandle();
	resizeHandle();
	animationHandle();
	loaderHandle();
});

window.addEventListener('contextmenu', (event) => {
	event.preventDefault();
});
