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
var ambient = new THREE.DirectionalLight(0xffffee, 0.7);
scene.add(ambient)





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

