const cals = [
	'simple',
	'normal',
	'advanced',
	'date',
	'tempature'
];
let currentCal = cals[0];

window.addEventListener('load', () => {
	document.getElementById('sidebar-container').querySelectorAll('.btn')[1].focus();
});
