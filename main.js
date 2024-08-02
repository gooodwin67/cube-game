import * as THREE from 'three';

import { detectCollisionCubes } from './detectColisions.js';
import { OrbitControls } from "three/addons/controls/OrbitControls";

import { Player } from './player.js';
import { World } from './world.js';
import { Level } from './level.js';



let scene = new THREE.Scene();
let world = new World();

document.body.appendChild(world.renderer.domElement);
document.body.appendChild(world.stats.dom);

scene.add(world.ambient)
scene.add(world.helper);
scene.add(world.dirLight);

// let controls = new OrbitControls(world.camera, world.renderer.domElement);
// controls.enableDamping = true;
// controls.target.set(0, 0, 0);


let level = new Level(world);
let player = new Player(scene, world);


function init() {
  world.init(player);
  scene.add(level.plane);
  scene.add(level.gridHelper);
  scene.add(player.player);

};

init();

/*///////////////////////////////////////////////////////////////////*/

function animate() {
  if (world.pointerlock) player.movePlayer();

};

/*///////////////////////////////////////////////////////////////////*/


world.renderer.setAnimationLoop((_) => {
  // controls.update();

  animate();
  world.stats.update();
  world.renderer.render(scene, world.camera);
});


/*///////////////////////////////////////////////////////////////////*/

// document.addEventListener('mousemove', onDocumentMouseMove);
// document.addEventListener('mousedown', onDocumentMouseDown, false);

window.addEventListener("resize", (event) => {
  // windowHalfX = window.innerWidth / 2;
  // windowHalfY = window.innerHeight / 2;
  world.camera.aspect = innerWidth / innerHeight;
  world.camera.updateProjectionMatrix();
  world.renderer.setSize(innerWidth, innerHeight);
});

document.onclick = function () {
  document.querySelector('canvas').requestPointerLock();
}
document.addEventListener('pointerlockchange', lockStatusChange, false);

function lockStatusChange() {

  if (document.pointerLockElement === document.querySelector('canvas')) {
    world.addPointerLock(true);
    document.addEventListener("mousemove", player.updateCirclePosition.bind(player), false);
    document.addEventListener("mousedown", player.shooting.bind(player), false);
    document.addEventListener("mouseup", player.stopShooting.bind(player), false);
  }
  else {
    world.addPointerLock(false);
    document.removeEventListener("mousemove", player.updateCirclePosition, false);
    document.removeEventListener("mousedown", player.shooting, false);
    document.removeEventListener("mouseup", player.stopShooting, false);
  }
}







