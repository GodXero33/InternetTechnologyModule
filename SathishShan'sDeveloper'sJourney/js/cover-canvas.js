(function (exports) {
	class Runner {
		constructor (x, y) {
			this.particles = [];
			this.position = { x, y };
			this.particleSize = Math.floor(Math.random() * 8) + 2;
			this.color = '#fff';
			this.maxSpread = 2;
			
			this.newVelo();
		}

		newVelo () {
			this.dir = { x: Math.random() * 5 - 2.5, y: Math.random() * 5 - 2.5 };
		}

		update () {
			this.particles = this.particles.filter(particle => particle.ls > 0 && particle.x > 0 && particle.y > 0 && particle.x < window.innerWidth && particle.y < window.innerHeight);

			this.particles.forEach(particle => {
				particle.ls--;
			});

			if (this.particles.length == 0) {
				this.position.x = window.innerWidth / 2;
				this.position.y = window.innerHeight / 2;
			}

			this.particles.push({ x: this.position.x + Math.random() * this.maxSpread - this.maxSpread / 2, y: this.position.y + Math.random() * this.maxSpread - this.maxSpread / 2, ls: 100 });
			if (this.particles.length > 10) this.particles.shift();

			this.position.x += this.dir.x * exports.scrollVelo;
			this.position.y += this.dir.y * exports.scrollVelo;
		}

		draw (ctx) {
			ctx.strokeStyle = this.color;
			ctx.lineWidth = this.particleSize;
			ctx.lineCap = 'round';

			this.particles.forEach(particle => {
				ctx.globalAlpha = Math.max(particle.ls * 0.2 / 100, 0);
				ctx.beginPath();
				ctx.moveTo(particle.x, particle.y);
				ctx.lineTo(particle.x, particle.y);
				ctx.stroke();
			});
		}
	}

	const canvas = document.getElementById('cover-canvas');
	const ctx = canvas.getContext('2d');
	let width = 0;
	let height = 0;
	let runners = [];
	let isAnimating = false;
	const colors = ['#f0f', '#0ff', '#f98', '#0f0'];
	let currentViewSection = 0;

	function animate () {
		if (!isAnimating) return;

		ctx.clearRect(0, 0, width, height);

		runners.forEach(runner => runner.update());
		runners.forEach(runner => runner.draw(ctx));
	}

	function resize () {
		width = canvas.parentElement.offsetWidth;
		height = canvas.parentElement.offsetHeight;
		canvas.width = width;
		canvas.height = height;

		runners = [];

		for (let i = 0; i < 50; i++) {
			const x = Math.random() * width;
			const y = Math.random() * height;
			const runner = new Runner(x, y);
			runner.color = colors[currentViewSection];
			runners.push(runner);
		}
	}

	function init () {
		isAnimating = true;
	}

	function updateColor (index) {
		currentViewSection = index;

		if (runners && runners.length != 0) {
			runners.forEach(runner => {
				runner.color = colors[currentViewSection];
			});
		}
	}

	exports.resize = resize;
	exports.animate = animate;
	exports.init = init;
	exports.updateColor = updateColor;
	exports.scrollVelo = 1;
})(COVER_CANVAS = {});
