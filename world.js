import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { AssetManager } from './assetManager.js';
import { Player } from './player.js';

export class World {
    constructor() {
        this.fieldSize = 110;
        this.fieldDivisions = 11;

        this.stats = new Stats();

        this.camera = new THREE.PerspectiveCamera(30, innerWidth / innerHeight, 1, 1000);
        this.camera.position.set(0, 160, 180);
        this.camera.lookAt(0, 0, 0);

        this.ambient = new THREE.AmbientLight(0xcccccc, 0.4);

        this.dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
        this.dirLight.position.set(1, 40, - 1);
        this.dirLight.matrixAutoUpdate = false;
        this.dirLight.updateMatrix();
        this.dirLight.castShadow = true;
        this.dirLight.shadow.camera.top = 150;
        this.dirLight.shadow.camera.bottom = - 150;
        this.dirLight.shadow.camera.left = - 150;
        this.dirLight.shadow.camera.right = 150;
        this.dirLight.shadow.camera.near = 1;
        this.dirLight.shadow.camera.far = 200;
        this.dirLight.shadow.mapSize.x = 2048;
        this.dirLight.shadow.mapSize.y = 2048;
        this.dirLight.shadow.bias = 0.01;


        this.helper = new THREE.DirectionalLightHelper(this.dirLight, 5);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(innerWidth, innerHeight);
        this.renderer.setClearColor(0xffffff)
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.gammaInput = true;

        this.pointerlock = false;


    }

    init(player) {
        this.assetManager = new AssetManager();
        this.assetManager.init()
        this.camera.add(this.assetManager.listener);

        const playerShot = this.assetManager.audios.get('playerShot');



        player.audios.set('playerShot', playerShot);
    }

    addPointerLock(toggle) {
        toggle ? this.pointerlock = true : this.pointerlock = false;
    }

    playAudio(audio) {

        if (audio.isPlaying === true) audio.stop();
        audio.play();

    }


}