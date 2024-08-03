import * as THREE from 'three';

export class Level {
    constructor(world) {
        this.geometryPlane = new THREE.BoxGeometry(world.fieldSize, 1, world.fieldSize);
        this.materialPlane = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
        this.plane = new THREE.Mesh(this.geometryPlane, this.materialPlane);
        this.plane.receiveShadow = true;
        this.plane.position.set(0, 0, 0);


        this.gridHelper = new THREE.GridHelper(world.fieldSize, world.fieldDivisions, 0x0000ff, 0x808080);
        this.gridHelper.receiveShadow = true;
        this.gridHelper.position.y = 0.6;
        this.gridHelper.position.x = 0;
        //scene.add(gridHelper);


        this.groupWall = new THREE.Group();
        this.materialWall = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
        this.wallHeight = 10;

        this.wall1 = new THREE.Mesh(new THREE.BoxGeometry(world.fieldSize, this.wallHeight, 2), this.materialWall);
        this.wall1.receiveShadow = true;
        this.wall1.position.set(0, this.wallHeight / 2, -world.fieldSize / 2);
        world.wallsMas.push(this.wall1);

        this.wall2 = new THREE.Mesh(new THREE.BoxGeometry(world.fieldSize, this.wallHeight, 2), this.materialWall);
        this.wall2.receiveShadow = true;
        this.wall2.position.set(0, this.wallHeight / 2, world.fieldSize / 2);
        world.wallsMas.push(this.wall2);

        this.wall3 = new THREE.Mesh(new THREE.BoxGeometry(2, this.wallHeight, world.fieldSize), this.materialWall);
        this.wall3.receiveShadow = true;
        this.wall3.position.set(world.fieldSize / 2, this.wallHeight / 2, 0);
        world.wallsMas.push(this.wall3);

        this.wall4 = new THREE.Mesh(new THREE.BoxGeometry(2, this.wallHeight, world.fieldSize), this.materialWall);
        this.wall4.receiveShadow = true;
        this.wall4.position.set(-world.fieldSize / 2, this.wallHeight / 2, 0);
        world.wallsMas.push(this.wall4);

        this.groupWall.add(this.wall1, this.wall2, this.wall3, this.wall4);
    }
}

export class Levels {
    constructor(world) {
        this.currentLevel = 0;
        this.enemiesInLevelMas = [];

        this.levels = [[
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 'b', 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 'b', 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]]
    }

    initLevel(levelNum) {
        this.currentLevel = levelNum - 1;

        for (var i = 0; i < this.levels[this.currentLevel].length; i++) {
            for (var j = 0; j < this.levels[this.currentLevel][i].length; j++) {
                if (this.levels[this.currentLevel][j][i] != 0) {
                    this.enemiesInLevelMas.push({
                        type: this.levels[this.currentLevel][j][i],
                        x: j,
                        y: i
                    })

                }

            }
        }


    }
}