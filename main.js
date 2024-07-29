import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';

import { detectCollisionCubes } from './detectColisions.js';

import { OrbitControls } from "three/addons/controls/OrbitControls";


let clock = new THREE.Clock();
let stats;


let scene = new THREE.Scene();

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xffffff)
//renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", (event) => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

stats = new Stats();
document.body.appendChild(stats.dom);

let camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 1, 1000);
camera.position.set(50, 50, 0);
//camera.lookAt(0,0,0);

//var ambient = new THREE.AmbientLight( 0x404040);
var ambient = new THREE.AmbientLight(0xcccccc, 0.4);
scene.add(ambient)


const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(1, 10, - 1);
dirLight.matrixAutoUpdate = false;
dirLight.updateMatrix();
dirLight.castShadow = true;
dirLight.shadow.camera.top = 15;
dirLight.shadow.camera.bottom = - 15;
dirLight.shadow.camera.left = - 15;
dirLight.shadow.camera.right = 15;
dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 20;
dirLight.shadow.mapSize.x = 2048;
dirLight.shadow.mapSize.y = 2048;
dirLight.shadow.bias = 0.01;
scene.add(dirLight);


let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 5, 0);



var geometryPlane = new THREE.BoxGeometry(30, 1, 30);
var materialPlane = new THREE.MeshPhongMaterial({ color: 0xcccccc, side: THREE.DoubleSide })
var plane = new THREE.Mesh(geometryPlane, materialPlane);
//plane.receiveShadow = true;
plane.position.set(0, -0.5, 0);
scene.add(plane);

const size = 1000;
const divisions = 100;


// const fieldGeometry = new THREE.BufferGeometry(200, 200, 200);
// const fieldMaterial = new THREE.MeshLambertMaterial({ color: 0xaca181 });

// let fieldMesh = new THREE.Mesh(fieldGeometry, fieldMaterial);
// fieldMesh.matrixAutoUpdate = false;
// fieldMesh.position.set(0, 20.5, 0);
// fieldMesh.updateMatrix();
// fieldMesh.receiveShadow = true;
// scene.add(fieldMesh);


function init() {



};

/*///////////////////////////////////////////////////////////////////*/

function animate() {



};

/*///////////////////////////////////////////////////////////////////*/


/*///////////////////////////////////////////////////////////////////*/


renderer.setAnimationLoop((_) => {
  controls.update();
  animate();
  stats.update();
  renderer.render(scene, camera);
});


/*///////////////////////////////////////////////////////////////////*/

