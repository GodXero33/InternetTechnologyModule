import * as THREE from './three.module.js';
import { GLTFLoader } from './GLTFLoader.js';

function init () {
	const container = document.getElementById('module-container');
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer({ antialiasing: true });
	let width = 0;
	let height = 0;
	let cup;

	scene.fog = new THREE.FogExp2(0x000000, 0.15);
	// renderer.shadowMap.enabled = true;
	// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	container.prepend(renderer.domElement);

	const light1 = new THREE.DirectionalLight(0xff77ff, 2);
	light1.position.set(5, 2, 0);
	// light1.castShadow = true;
	// light1.shadow.mapSize.width = 1024;
	// light1.shadow.mapSize.height = 1024;
	// light1.shadow.camera.near = 0.5;
	// light1.shadow.camera.far = 20;

	const light2 = new THREE.DirectionalLight(0x9999ff, 3);
	light2.position.set(-4, 7, 0);

	scene.add(light1, light2);

	const loader = new GLTFLoader();

	loader.load('res/3dmodel/java.glb', function (gltf) {
		cup = gltf.scene;
		// cup.castShadow = true;
		// cup.receiveShadow = false;

		scene.add(cup);
		resize();
		afterLoad();
	});

	camera.position.z = 3.5;
	camera.position.y = 2;
	camera.lookAt(0, 0, 0);

	// const helper = new THREE.DirectionalLightHelper( light1, 5 );
	// scene.add(helper);

	let dt = 0;

	function draw () {
		if (cup) {
			cup.rotation.y += 0.003;
		}

		light1.position.x += Math.sin(dt) * 2 - 1;
		light1.position.z += Math.cos(dt) * 2 - 1;

		dt += 0.01;

		renderer.render( scene, camera );
	}

	function animate () {
		draw();
		window.requestAnimationFrame(animate);
	}

	function resize () {
		const rect = container.getBoundingClientRect();
		
		width = rect.width;
		height = rect.height;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);

		draw();
	}

	animate();
	window.addEventListener('resize', resize);
}

window.addEventListener('load', init);
