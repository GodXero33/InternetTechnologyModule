const cardsDetails = [];
let appendableCardDetails;
const cardInfoContainer = document.getElementById('card-info-container');
const cardInfoContainerCloseBtn = document.getElementById('card-info-close-btn');
const cardInfoModel = document.getElementById('card-info-model');
const cardInfo = document.getElementById('card-info');
const cardContainer = document.getElementById('cards-container-wrapper');
const containerRows = Array.from(document.querySelectorAll('.row'));
let currentWindowsize = 0;

function closeCardInfo () {
	cardInfoContainer.classList.add('hide');
}

cardInfoModel.addEventListener('click', closeCardInfo);
cardInfoContainerCloseBtn.addEventListener('click', closeCardInfo);

function buildCardInfo (country) {
	cardInfo.innerHTML = '';

	const name1 = document.createElement('h1');
	name1.textContent = country.name.common;
	cardInfo.appendChild(name1);

	const region = document.createElement('h2');
	region.textContent = country.region;
	cardInfo.appendChild(region);

	const img = document.createElement('img');
	img.src = country.flags.png || country.flags.svg;
	cardInfo.appendChild(img);
	
	const name2 = document.createElement('h2');
	name2.textContent = country.name.official;
	cardInfo.appendChild(name2);

	const br = document.createElement('br');
	cardInfo.appendChild(br);
	
	if (country.altSpellings) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Alternative Spellings';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		country.altSpellings.forEach(spell => {
			const data = document.createElement('div');
			data.classList.add('data');
			data.textContent = spell;
			content.appendChild(data);
		});
	}

	// Capital
	if (country.capital) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Capital';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		country.capital.forEach(capital => {
			const data = document.createElement('div');
			data.classList.add('data');
			data.textContent = capital;
			content.appendChild(data);
		});
	}

	// Area
	if (country.area) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Area';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		const data = document.createElement('div');
		data.classList.add('data');
		data.textContent = country.area;
		content.appendChild(data);
	}

	// Continents
	if (country.continents) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Continents';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		country.continents.forEach(continent => {
			const data = document.createElement('div');
			data.classList.add('data');
			data.textContent = continent;
			content.appendChild(data);
		});
	}

	// Currencies
	if (country.currencies) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Currencies';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		const currencies = country.currencies;
		const currencyKeys = Object.keys(currencies);

		currencyKeys.forEach(currency => {
			const data = document.createElement('div');
			data.classList.add('data');
			data.innerHTML = `<div>${currencies[currency].name}</div><div class="bold">${currencies[currency].symbol}</div>`;
			content.appendChild(data);
		});
	}

	// Flag
	if (country.flag) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Flag';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		const data = document.createElement('div');
		data.classList.add('data');
		data.textContent = country.flag;
		content.appendChild(data);
	}

	// Languages
	if (country.languages) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Languages';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		const languages = country.languages;
		const languageKeys = Object.keys(languages);

		languageKeys.forEach(language => {
			const data = document.createElement('div');
			data.classList.add('data');
			data.textContent = languages[language];
			content.appendChild(data);
		});
	}

	// Location
	if (country.latlng) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Location';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		const data = document.createElement('div');
		data.classList.add('data');
		data.innerHTML = `<a href="https://maps.google.com/?q=${country.latlng[0]},${country.latlng[1]}" target="_blank">${country.latlng[0]},${country.latlng[1]}</a>`;
		content.appendChild(data);
	}

	// Population
	if (country.population) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Population';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		const data = document.createElement('div');
		data.classList.add('data');
		data.textContent = country.population;
		content.appendChild(data);
	}

	// Start of week
	if (country.startOfWeek) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Start of week';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		const data = document.createElement('div');
		data.classList.add('data');
		data.textContent = country.startOfWeek;
		content.appendChild(data);
	}

	// Time Zones
	if (country.timezones) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Time Zones';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		country.timezones.forEach(zone => {
			const data = document.createElement('div');
			data.classList.add('data');
			data.textContent = zone;
			content.appendChild(data);
		});
	}

	// Top-level domain (TLD)
	if (country.tld) {
		const cont = document.createElement('div');
		cont.classList.add('info-item');
		cardInfo.appendChild(cont);

		const title = document.createElement('div');
		title.classList.add('title');
		title.textContent = 'Top-level domain (TLD)';
		cont.appendChild(title);

		const content = document.createElement('div');
		content.classList.add('content');
		cont.appendChild(content);

		country.tld.forEach(tld => {
			const data = document.createElement('div');
			data.classList.add('data');
			data.textContent = tld;
			content.appendChild(data);
		});
	}
}

function buildCard (country) {
	const card = document.createElement('div');
	const cardDiv = document.createElement('div');
	const header = document.createElement('div');
	const content = document.createElement('div');
	const titleCont = document.createElement('div');
	const imgCont = document.createElement('div');
	const flagLink = document.createElement('a');
	const title1 = document.createElement('h1');
	const title2 = document.createElement('h2');
	const img = document.createElement('img');
	const officialName = document.createElement('div');
	const infoBtn = document.createElement('div');

	title1.textContent = country.name.common;
	title2.textContent = country.region;

	img.src = country.flags.png || country.flags.svg;

	flagLink.textContent = 'flag';
	flagLink.setAttribute('title', 'flag');
	flagLink.setAttribute('href', img.src);

	officialName.textContent = country.name.official;

	infoBtn.textContent = 'About ' + country.name.common;

	card.classList.add('card');
	header.classList.add('header');
	titleCont.classList.add('title-cont');
	imgCont.classList.add('img-cont');
	flagLink.classList.add('flag-link');
	content.classList.add('content');
	officialName.classList.add('official-name');
	infoBtn.classList.add('info-btn');

	titleCont.appendChild(title1);
	titleCont.appendChild(title2);
	imgCont.appendChild(img);
	header.appendChild(titleCont);
	header.appendChild(imgCont);
	header.appendChild(flagLink);
	content.appendChild(officialName);
	content.appendChild(infoBtn);
	cardDiv.appendChild(header);
	cardDiv.appendChild(content);
	card.appendChild(cardDiv);

	return [card, infoBtn];
}

function appendCards (rows) {
	const currentContainerRows = containerRows.filter((_, index) => rows.includes(index));
	let maxCount = currentContainerRows.length;
	let counter = 0;

	cardsDetails.forEach(cardDetail => {
		cardDetail.card.remove();
	});

	appendableCardDetails.forEach(cardDetail => {
		currentContainerRows[counter].appendChild(cardDetail.card);
		counter++;

		if (counter == maxCount) counter = 0;
	});
}

function resizePage (override = false) {
	const width = cardContainer.getBoundingClientRect().width;
	let windowSize = 0;

	if (width < 640) {
		windowSize = 0;
	} else if (width < 1200) {
		windowSize = 1;
	} else {
		windowSize = 2;
	}

	if (windowSize != currentWindowsize || override) {
		currentWindowsize = windowSize;
		let rows;

		if (width < 640) {
			rows = [0];
		} else if (width < 1200) {
			rows = [0, 1];
		} else {
			rows = [0, 1, 2, 3];
		}

		appendCards(rows);
	}
}

function cardAboutClick () {
	buildCardInfo(cardsDetails[this.index].country);
	cardInfoContainer.classList.remove('hide');
}

function buildPage (data) {
	data?.forEach((country, index) => {
		const [card, infoBtn] = buildCard(country);
		cardsDetails.push({ country, card });

		infoBtn.addEventListener('click', cardAboutClick.bind({ index }));
	});

	const width = cardContainer.getBoundingClientRect().width;
	let rows;

	if (width < 640) {
		rows = [0];
		currentWindowsize = 0;
	} else if (width < 1200) {
		rows = [0, 1];
		currentWindowsize = 1;
	} else {
		rows = [0, 1, 2, 3];
		currentWindowsize = 2;
	}

	appendableCardDetails = cardsDetails;
	appendCards(rows);
}

function initPage (data) {
	document.getElementById('loader').classList.add('hide');
	buildPage(data);

	document.getElementById('search-int').addEventListener('input', (event) => {
		const text = event.target.value;

		const searchCardsDetails = cardsDetails.filter(cardDetail => cardDetail.country.name.common.toLowerCase().includes(text.toLowerCase()));
		appendableCardDetails = searchCardsDetails;
		
		resizePage(true);
	});

	window.addEventListener('resize', resizePage);
}

async function loadData () {
	try {
		const response = await fetch('https://restcountries.com/v3.1/all');

		if (!response.ok) {
			throw new Error('Failed to load data');
		}

		const data = await response.json();
		initPage(data);
	} catch (error) {
		console.error(error);
	}
}

loadData();
