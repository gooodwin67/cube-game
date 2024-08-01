import * as THREE from 'three';
import { MathUtils } from 'three';

export class Player {
    constructor() {
        this.geometryPlayer = new THREE.CylinderGeometry(0, 2, 10, 4);
        this.geometryPlayer.rotateX(Math.PI / 2);
        this.materialPlayer = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
        this.player = new THREE.Mesh(this.geometryPlayer, this.materialPlayer);
        this.player.castShadow = true;
        this.player.position.y = 3;

        this.target = new THREE.Vector3();
        this.movementX = 0;
        this.movementY = 0;
        this.rotationSpeed = 5;

        this.speed = 0.5;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.pointerLock = false;

        this.shutting = false;

        addEventListener("keydown", event => {
            switch (event.key) {
                case 'w':
                case 'ArrowUp':
                    this.up = true;
                    break;
                case 'a':
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 's':
                case 'ArrowDown':
                    this.down = true;
                    break;
                case 'd':
                case 'ArrowRight':
                    this.right = true;
                    break;
            }
        });
        addEventListener("keyup", event => {
            switch (event.key) {
                case 'w':
                case 'ArrowUp':
                    this.up = false;
                    break;
                case 'a':
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 's':
                case 'ArrowDown':
                    this.down = false;
                    break;
                case 'd':
                case 'ArrowRight':
                    this.right = false;
                    break;
            }
        });
    }

    // activePointerLock(toggle) {
    //     if (toggle) {
    //         if (!this.pointerLock)
    //             document.addEventListener("mousemove", this.updateCirclePosition.bind(this), false)
    //         this.pointerLock = true;
    //         document.addEventListener("mousedown", this.shooting, false);
    //         document.addEventListener("mouseup", this.stopShooting, false);
    //     }
    //     else {
    //         document.removeEventListener("mousemove", this.updateCirclePosition, false);
    //         document.removeEventListener("mousedown", this.shooting, false);
    //         document.removeEventListener("mouseup", this.stopShooting, false);
    //         this.pointerLock = false;
    //     }
    // }

    movePlayer() {
        this.target.set(this.movementX, 0, this.movementY).normalize();
        this.target.add(this.player.position);
        this.player.lookAt(this.target);
        if (this.up) {
            this.player.position.z -= this.speed;
        }
        if (this.down) {
            this.player.position.z += this.speed;
        }
        if (this.left) {
            this.player.position.x -= this.speed;
        }
        if (this.right) {
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
        // bullet.userData.x = event.movementX / screen.width;
        // bullet.userData.y = event.movementY / screen.height;
        // if (!clock.running) {
        //     clock.start();
        // }
        console.log(this.shutting);
    }

    stopShooting() {

        // playerShutting = false;
    }
}
