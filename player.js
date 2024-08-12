import * as THREE from 'three';
import { MathUtils } from 'three';
import { getParticleSystem } from "./getParticleSystem.js";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

export class Player {
    constructor(scene, world) {
        this.scene = scene;
        this.world = world;
        this.playerSize = this.world.divSize;
        this.geometryPlayer = new THREE.CylinderGeometry(0, 2, this.playerSize, 4);
        this.geometryPlayer.rotateX(Math.PI / 2);
        this.materialPlayer = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
        this.player = new THREE.Mesh(this.geometryPlayer, this.materialPlayer);
        this.player.castShadow = true;
        this.player.position.y = 3;
        this.player.position.z = this.world.fieldSize / 2 - this.playerSize;
        this.player.lifes = 3;
        this.player.dead = false;

        this.target = new THREE.Vector3();
        this.movementX = 0;
        this.movementY = 0;
        this.rotationSpeed = 1;

        this.speed = 0.5;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.pointerLock = false;

        this.shutting = false;
        this.bullets = [];
        this.bullet = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 4), new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide }));
        this.playerCanShoot = true;
        this.playerShootSpeed = 0.1;
        this.bulletSpeed = 4;

        this.clock = new THREE.Clock();
        this.clock.autoStart = false;

        this.audios = new Map();







        addEventListener("keydown", event => {
            switch (event.key) {
                case 'w':
                case 'ц':
                case 'ArrowUp':
                    this.up = true;
                    break;
                case 'a':
                case 'ф':
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 's':
                case 'ы':
                case 'ArrowDown':
                    this.down = true;
                    break;
                case 'd':
                case 'в':
                case 'ArrowRight':
                    this.right = true;
                    break;
            }
        });
        addEventListener("keyup", event => {
            switch (event.key) {
                case 'w':
                case 'ц':
                case 'ArrowUp':
                    this.up = false;
                    break;
                case 'a':
                case 'ф':
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 's':
                case 'ы':
                case 'ArrowDown':
                    this.down = false;
                    break;
                case 'd':
                case 'в':
                case 'ArrowRight':
                    this.right = false;
                    break;
            }
        });
    }



    hitPlayer() {
        if (this.player.lifes > 1) {
            this.player.lifes--
        }
        else this.deadPlayer();
    }
    deadPlayer() {
        console.log('dead');
        this.player.dead = true;
    }

    movePlayer() {
        this.bulletFly();
        this.target.set(this.movementX, 0, this.movementY).normalize();
        this.target.add(this.player.position);
        this.player.lookAt(this.target);
        if (this.up && this.player.position.z > -this.world.fieldSize / 2 + this.playerSize / 2) {
            this.player.position.z -= this.speed;
        }
        if (this.down && this.player.position.z < this.world.fieldSize / 2 - this.playerSize / 2) {
            this.player.position.z += this.speed;
        }
        if (this.left && this.player.position.x > -this.world.fieldSize / 2 + this.playerSize / 2) {
            this.player.position.x -= this.speed;
        }
        if (this.right && this.player.position.x < this.world.fieldSize / 2 - this.playerSize / 2) {
            this.player.position.x += this.speed;
        }
    }


    updateCirclePosition(event) {

        const x = event.movementX / screen.width;
        const y = event.movementY / screen.height;


        this.movementX += x * this.rotationSpeed;
        this.movementY += y * this.rotationSpeed;


        // this.movementX = MathUtils.clamp(this.movementX, - 1, 1);
        // this.movementY = MathUtils.clamp(this.movementY, - 1, 1);

    }
    shooting(event) {
        this.shutting = true;
        this.bullet.userData.x = event.movementX / screen.width;
        this.bullet.userData.y = event.movementY / screen.height;
        if (!this.clock.running) {
            this.clock.start();
        }
    }

    stopShooting() {
        this.shutting = false;

    }

    bulletFly() {

        this.clock.getDelta();
        if (this.clock.getElapsedTime() > this.playerShootSpeed) {
            this.playerCanShoot = true;
            this.clock.elapsedTime = 0;
        }
        if (this.shutting && this.playerCanShoot) {
            this.playerCanShoot = false;
            let newBullet = this.bullet.clone();
            newBullet.dead = false;

            newBullet.bulletParticleSystem = getParticleSystem({
                camera: this.world.camera,
                emitter: newBullet,
                parent: this.scene,
                rate: 50,
                texture: "assets/smoke.png",
                maxSize: 3.0,
                radius: 1,
                maxLife: 0.1,
                color: new THREE.Color(0xffff00),
            });

            newBullet.quaternion.copy(this.player.quaternion);
            newBullet.position.copy(this.player.position);
            this.scene.add(newBullet);
            this.bullets.push(newBullet);

            const audio = this.audios.get('playerShot');
            this.world.playAudio(audio);
        }
        this.bullets.forEach((item, index) => {
            var direction = new THREE.Vector3();
            item.getWorldDirection(direction);
            item.position.add(direction.multiplyScalar(this.bulletSpeed));

            if (item.position.x > this.world.fieldSize / 2 || item.position.x < -this.world.fieldSize / 2 || item.position.z > this.world.fieldSize / 2 || item.position.z < -this.world.fieldSize / 2) {
                item.dead = true;
                this.bullets.splice(this.bullets.indexOf(item), 1);
                this.scene.remove(item);

            }
        })
    }
}
