import * as THREE from 'three';

export class Level {
    constructor(world) {
        this.geometryPlane = new THREE.BoxGeometry(world.fieldSize, 1, world.fieldSize);
        this.materialPlane = new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
        this.plane = new THREE.Mesh(this.geometryPlane, this.materialPlane);
        this.plane.receiveShadow = true;
        this.plane.position.set(0, 0, 0);
        //scene.add(plane);

        this.gridHelper = new THREE.GridHelper(world.fieldSize, world.fieldDivisions, 0x0000ff, 0x808080);
        this.gridHelper.position.y = 0.6;
        this.gridHelper.position.x = 0;
        //scene.add(gridHelper);
    }
}