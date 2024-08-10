import * as THREE from 'three';

import { detectCollisionCubes } from './detectColisions.js';
import { OrbitControls } from "three/addons/controls/OrbitControls";


import { Player } from './player.js';
import { World } from './world.js';
import { Level, Levels } from './level.js';
import { Enemies } from './enemies.js';

import { getParticleSystem } from "./getParticleSystem.js";



let scene = new THREE.Scene();
//scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);
scene.fog = new THREE.Fog(0xefd1b5, 0.0025);
scene.background = new THREE.Color(0x050505);
let world = new World();

document.body.appendChild(world.renderer.domElement);
document.body.appendChild(world.stats.dom);

//scene.add(world.ambient)
//scene.add(world.helper);
//scene.add(world.dirLight);

const light1 = new THREE.SpotLight(0xffffff, 10000);
light1.position.set(2, 140, 10);
light1.angle = 0.5;
light1.penumbra = 0.5;

light1.castShadow = true;
light1.shadow.mapSize.width = 1024;
light1.shadow.mapSize.height = 1024;

// scene.add( new THREE.CameraHelper( light1.shadow.camera ) );
scene.add(light1);

// const light2 = new THREE.SpotLight(0xffffff, 150);
// light2.position.set(- 1, 3.5, 3.5);
// light2.angle = 0.5;
// light2.penumbra = 0.5;

// light2.castShadow = true;
// light2.shadow.mapSize.width = 1024;
// light2.shadow.mapSize.height = 1024;

// // scene.add( new THREE.CameraHelper( light2.shadow.camera ) );
// scene.add(light2);

let controls = new OrbitControls(world.camera, world.renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);



let level = new Level(world);
let player = new Player(scene, world);
let levels = new Levels();
let enemies = new Enemies(scene, world, levels, player);
let camera = world.camera;


let playerParticleSystem = getParticleSystem({
  camera: camera,
  emitter: player.player,
  parent: scene,
  rate: 15,
  texture: "assets/smoke.png",
  maxSize: 5.0,
  radius: 2,
  maxLife: 0.7,
  color: new THREE.Color(0xffffff),
});








function init() {
  world.init(player);
  scene.add(level.plane);
  scene.add(level.groupWall);
  //scene.add(level.gridHelper);
  scene.add(player.player);
  levels.initLevel(1);
  //console.log(levels.enemiesMas);
  enemies.initEnemies();

};

init();

/*///////////////////////////////////////////////////////////////////*/

function animate() {
  playerParticleSystem.update(0.016);
  if (world.pointerlock) {
    player.movePlayer();
  }
  enemies.enemyMove();



};

/*///////////////////////////////////////////////////////////////////*/


world.renderer.setAnimationLoop((_) => {
  controls.update();

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







