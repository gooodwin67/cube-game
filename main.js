import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';

import { detectCollisionCubes } from './detectColisions.js';
import { MathUtils } from 'three';

import { OrbitControls } from "three/addons/controls/OrbitControls";




let stats;

let mouse = new THREE.Vector2();
const target = new THREE.Vector3();

let fieldSize = 110;
let fieldDivisions = 11;

let movementX = 0;
let movementY = 0;
let rotationSpeed = 5;

var plane;
let player;


let scene = new THREE.Scene();

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xffffff)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", (event) => {
  // windowHalfX = window.innerWidth / 2;
  // windowHalfY = window.innerHeight / 2;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

stats = new Stats();
document.body.appendChild(stats.dom);

let camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 1, 1000);
camera.position.set(0, 160, 180);
camera.lookAt(0, 0, 0);

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


// let controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true;
// controls.target.set(0, 0, 0);


var geometryPlane = new THREE.BoxGeometry(fieldSize, 1, fieldSize);
var materialPlane = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
plane = new THREE.Mesh(geometryPlane, materialPlane);
plane.receiveShadow = true;
plane.position.set(0, 0, 0);
scene.add(plane);

const gridHelper = new THREE.GridHelper(fieldSize, fieldDivisions, 0x0000ff, 0x808080);
gridHelper.position.y = 0.6;
gridHelper.position.x = 0;
scene.add(gridHelper);


const geometryPlayer = new THREE.CylinderGeometry(0, 2, 10, 4);
geometryPlayer.rotateX(Math.PI / 2);
const materialPlayer = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
player = new THREE.Mesh(geometryPlayer, materialPlayer);
player.castShadow = true;
player.position.y = 3;

player.userData.speed = 0.5;
player.userData.up = false;
player.userData.down = false;
player.userData.left = false;
player.userData.right = false;

scene.add(player);


function init() {



};

init();

/*///////////////////////////////////////////////////////////////////*/

function animate() {
  movePlayer()




};

/*///////////////////////////////////////////////////////////////////*/


renderer.setAnimationLoop((_) => {
  //controls.update();
  animate();
  stats.update();
  renderer.render(scene, camera);
});







/*///////////////////////////////////////////////////////////////////*/

// document.addEventListener('mousemove', onDocumentMouseMove);
// document.addEventListener('mousedown', onDocumentMouseDown, false);

document.onclick = function () {
  document.querySelector('canvas').requestPointerLock();
}

document.addEventListener('pointerlockchange', lockStatusChange, false);

function lockStatusChange() {

  if (document.pointerLockElement === document.querySelector('canvas')) {
    document.addEventListener("mousemove", updateCirclePosition, false);
  }
  else {
    document.removeEventListener("mousemove", updateCirclePosition, false);
  }
}



function updateCirclePosition(event) {
  const x = event.movementX / screen.width;
  const y = event.movementY / screen.height;

  movementX += x * rotationSpeed;
  movementY += y * rotationSpeed;

  movementX = MathUtils.clamp(movementX, - 1, 1);
  movementY = MathUtils.clamp(movementY, - 1, 1);


}



function onDocumentMouseDown(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  //player.userData.shoot = true;
}





function movePlayer() {
  target.set(movementX, 0, movementY).normalize();
  target.add(player.position);
  player.lookAt(target);

  if (player.userData.up) {
    player.position.z -= player.userData.speed;
  }
  if (player.userData.down) {
    player.position.z += player.userData.speed;
  }
  if (player.userData.left) {
    player.position.x -= player.userData.speed;
  }
  if (player.userData.right) {
    player.position.x += player.userData.speed;
  }
}


addEventListener("keydown", onkeydown, false);
addEventListener("keyup", onkeyup, false);

function onkeydown(event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      player.userData.up = true;
      break;
    case 37: // left
    case 65: // a
      player.userData.left = true;
      break;
    case 40: // down
    case 83: // s
      player.userData.down = true;
      break;
    case 39: // right
    case 68: // d
      player.userData.right = true;
      break;
  }
}

function onkeyup(event) {
  switch (event.keyCode) {
    case 38: // up
    case 87: // w
      player.userData.up = false;
      break;
    case 37: // left
    case 65: // a
      player.userData.left = false;
      break;
    case 40: // down
    case 83: // s
      player.userData.down = false;
      break;
    case 39: // right
    case 68: // d
      player.userData.right = false;
      break;
  }
}
