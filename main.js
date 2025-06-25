import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1.5;

const scene = new THREE.Scene();

const loader = new THREE.TextureLoader();
const textureD = loader.load('images/david_suicide.png');
const textureSM = loader.load('images/stefan_matrix.png');
const textureSRain = loader.load('images/stefan_rainbow.png');

const geometryD = new THREE.PlaneGeometry(0.9,0.9);
const materialDavid = new THREE.MeshBasicMaterial({
  map: textureD,
  side: THREE.DoubleSide
});

const geometryS = new THREE.PlaneGeometry(0.3,0.3);
const materialStefanM = new THREE.MeshBasicMaterial({
	map: textureSM,
  side: THREE.DoubleSide
});
const materialStefanRain = new THREE.MeshBasicMaterial({
	map: textureSRain,
  side: THREE.DoubleSide
});


const meshD = new THREE.Mesh( geometryD, materialDavid );
const meshSL = new THREE.Mesh( geometryS, materialStefanM );
const meshSR = new THREE.Mesh( geometryS, materialStefanRain );
scene.add( meshD );
scene.add(meshSL);
scene.add(meshSR);
meshD.position.z = -1;
meshSR.position.set(-0.9,-0.2,-0.2);
meshSL.position.set(0.9,-0.2,-0.2);


const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time ) {

	meshD.rotation.y = time / 1000;
	meshD.position.z = Math.sin(time/1000)/3;

	meshSL.rotation.y = time / -1000;
	meshSL.position.y = Math.sin(time/1000)/1.2;
	meshSL.position.x = Math.cos(time/1000)/1.5;

	meshSR.rotation.y = time / -1000;
	meshSR.position.y = Math.cos(time/1000)/1.2;
	meshSR.position.x = Math.sin(time/1000)/1.5;

	renderer.render( scene, camera );
}
