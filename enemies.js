import * as THREE from 'three';
import { detectCollisionCubeAndArray } from './detectColisions.js';

export class Enemies {
    constructor(scene, world, levels, player) {
        this.levels = levels;
        this.world = world;
        this.scene = scene;
        this.player = player;

        this.enemiesMas = [];


    }

    initEnemies() {
        this.levels.enemiesInLevelMas.forEach((value, index, array) => {
            if (value.type == 'w') { // wall
                let enemyWidth = this.world.divSize;
                let enemyheight = this.world.divSize;
                let geometryEnemy = new THREE.BoxGeometry(enemyWidth, 5, enemyheight);
                let materialEnemy = new THREE.MeshPhongMaterial({ color: 0x777777, side: THREE.DoubleSide })
                let newEnemy = new THREE.Mesh(geometryEnemy, materialEnemy);
                newEnemy.receiveShadow = true;
                newEnemy.position.set(-this.world.fieldSize / 2 + this.world.divSize * value.y + enemyWidth / 2, 5, -this.world.fieldSize / 2 + this.world.divSize * value.x + enemyheight / 2);
                this.scene.add(newEnemy);
            }
            if (value.type == 'b') {
                let enemyWidth = this.world.divSize;
                let enemyheight = this.world.divSize;
                let geometryEnemy = new THREE.BoxGeometry(enemyWidth, 4, enemyheight);
                let materialEnemy = new THREE.MeshPhongMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
                let newEnemy = new THREE.Mesh(geometryEnemy, materialEnemy);
                newEnemy.receiveShadow = true;
                newEnemy.position.set(-this.world.fieldSize / 2 + this.world.divSize * value.y + enemyWidth / 2, 4, -this.world.fieldSize / 2 + this.world.divSize * value.x + enemyheight / 2);
                newEnemy.userData.name = 'b';
                newEnemy.userData.lives = 15;
                newEnemy.userData.directionX = 0.8;
                newEnemy.userData.directionY = 0;
                this.enemiesMas.push(newEnemy)
                this.scene.add(newEnemy);
            }
        })
    }

    enemyMove() {
        this.enemiesMas.forEach((value, index, array) => {
            if (value.userData.name == 'b') {
                value.position.x += value.userData.directionX;
                value.position.z += value.userData.directionY;
                if (detectCollisionCubeAndArray(value, this.world.wallsMas)) {
                    value.userData.directionX = -value.userData.directionX;
                    value.userData.directionY = -value.userData.directionY;
                }
                if (detectCollisionCubeAndArray(value, this.player.bullets)) {
                    var intersect = detectCollisionCubeAndArray(value, this.player.bullets);
                    this.player.bullets.splice(this.player.bullets.indexOf(intersect), 1);
                    this.scene.remove(intersect);
                    if (value.userData.lives > 0) value.userData.lives--
                    else {
                        this.enemiesMas.splice(this.enemiesMas.indexOf(value), 1);
                        this.scene.remove(value);
                    }
                }



            }
        })
    }

}
