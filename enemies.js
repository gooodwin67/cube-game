import * as THREE from 'three';
import { detectCollisionCubeAndArray, detectCollisionCubes } from './detectColisions.js';

export class Enemies {
    constructor(scene, world, levels, player) {
        this.levels = levels;
        this.world = world;
        this.scene = scene;
        this.player = player;



        this.enemiesMas = [];

        this.bulletsMas = [];


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

                let enemyBulletGeometry = new THREE.SphereGeometry(enemyWidth / 4, 32, 16);
                let enemyBulletMaterial = new THREE.MeshPhongMaterial({ color: 0xff0077, side: THREE.DoubleSide });
                let enemyBullet = new THREE.Mesh(enemyBulletGeometry, enemyBulletMaterial);

                newEnemy.clockEnemyShoot = new THREE.Clock();
                newEnemy.bulletsMas = [];
                newEnemy.newBulletMas = [];
                newEnemy.userData.timeShooting = 2;

                newEnemy.bullet = enemyBullet.clone();
                newEnemy.bullet.userData.speed = 1;
                newEnemy.bullet.userData.angle = 1;
                newEnemy.bullet.userData.bulletFly = false;
                newEnemy.bulletsMas.push(newEnemy.bullet);

                this.enemiesMas.push(newEnemy)
                this.scene.add(newEnemy);
            }
        })
    }

    enemyMove() {



        this.enemiesMas.forEach((value, index, array) => {

            if (detectCollisionCubes(value, this.player.player)) {


                this.player.deadPlayer();
            }

            if (value.userData.name == 'b') {

                value.clockEnemyShoot.getDelta();

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
                        value.newBulletMas.forEach((item, index, array) => {
                            this.scene.remove(item);
                        })
                    }
                }




                if (value.clockEnemyShoot.elapsedTime > value.userData.timeShooting) {



                    value.bulletsMas.forEach((item, index, array) => {
                        let newBullet1 = item.clone();
                        newBullet1.userData.angle = -newBullet1.userData.speed;

                        let newBullet2 = item.clone();
                        newBullet2.userData.angle = 0;

                        let newBullet3 = item.clone();
                        newBullet3.userData.angle = newBullet1.userData.speed;


                        value.newBulletMas.push(newBullet1, newBullet2, newBullet3);
                        this.bulletsMas = [...value.newBulletMas];

                    })

                    value.newBulletMas.forEach((item, index, array) => {
                        if (!item.userData.bulletFly) {
                            item.position.set(value.position.x, value.position.y, value.position.z)
                            this.scene.add(item);
                            item.userData.bulletFly = true;
                        }
                    })

                    value.clockEnemyShoot.elapsedTime = 0
                }


                value.newBulletMas.forEach((item, index, array) => {
                    item.position.z += item.userData.speed;
                    item.position.x -= item.userData.angle;
                    if (detectCollisionCubeAndArray(item, this.world.wallsMas)) {
                        value.newBulletMas.splice(index, 1);
                        this.scene.remove(item);
                    }
                    if (detectCollisionCubes(item, this.player.player)) {
                        value.newBulletMas.splice(index, 1);
                        this.scene.remove(item);
                        this.player.hitPlayer();
                    }
                })
            }
        })
    }

}
