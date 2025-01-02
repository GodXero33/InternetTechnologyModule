(function () {
	const btns = Array.from(document.getElementById('sidebar-container').querySelectorAll('.btn'));
	const frames = Array.from(document.getElementById('frame-container').querySelectorAll('.frame'));
	const sideBarToogleBtn = document.getElementById('sidebar-toogle-btn').querySelector('input');
	let prevIndex = 0;

	function activateBtn (index) {
		if (index == prevIndex) return;

		btns[prevIndex].classList.remove('active');
		frames[prevIndex].classList.add('hide');

		prevIndex = index;

		btns[prevIndex].classList.add('active');
		frames[prevIndex].classList.remove('hide');

		currentCal = cals[index];
	}

	btns.forEach((btn, index) => {
		btn.addEventListener('focus', () => {
			activateBtn(index);
		});

		btn.addEventListener('keydown', (event) => {
			if (event.code == 'Enter') {
				sideBarToogleBtn.checked = true;
			}
		});
	});

	window.addEventListener('resize', () => {
		if (window.innerWidth < 640) {
			sideBarToogleBtn.checked = true;
		}
	});

	sideBarToogleBtn.addEventListener('keydown', (event) => {
		if (event.code == 'Enter') {
			sideBarToogleBtn.checked = false;
		}
	});
})();
