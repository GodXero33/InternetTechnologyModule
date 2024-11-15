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

	setTimeout(() => {
		isScrollLocked = false;
	}, 1100);
}

function updateViewSection (index) {
	sections[currentViewSection].classList.add('hide');
	leftNavBarDivs[currentViewSection].classList.remove('active');
	currentViewSection = index;
	sections[currentViewSection].classList.remove('hide');
	leftNavBarDivs[currentViewSection].classList.add('active');
	lockScroll();
}

function scrollHandle () {
	const container = document.getElementById('main-container');

	// sections.forEach(section => {
	// 	section.style.backgroundColor = '#' + Math.floor(Math.random() * 255 ** 3).toString(16);
	// });

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

			setTimeout(() => {
				document.getElementById('loader').remove();
			}, 1000);
		}, { once: true });
	}, 1000);
	document.getElementById('loader').remove(); // remove later
	loaderHandle = null;
}

function leftNavBarHandle () {
	const leftNavBar = document.getElementById('left=nav-bar');

	sections.forEach((section, index) => {
		const div = document.createElement('div');
		leftNavBarDivs.push(div);
		leftNavBar.append(div);

		if (index == 0) {
			div.classList.add('active');
		}

		div.addEventListener('click', () => {
			updateViewSection(index);
		});
	});
}

function resizeHandle () {
	// window.addEventListener('resize', () => {
	// 	FOUNDATION.resize();
	// });

	// resizeHandle = null;
}

function animationHandle () {
	// function animate () {
	// 	FOUNDATION.animate();
	// 	window.requestAnimationFrame(animate);
	// }

	// animate();
}

window.addEventListener('load', () => {
	sections = document.querySelectorAll('section');

	loaderHandle();
	leftNavBarHandle();
	scrollHandle();
	resizeHandle();
	animationHandle();
});

window.addEventListener('contextmenu', (event) => {
	event.preventDefault();
});
