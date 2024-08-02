import * as THREE from 'three';

export class AssetManager {
    constructor() {
        this.loadingManager = new THREE.LoadingManager();
        this.audioLoader = new THREE.AudioLoader(this.loadingManager);
        this.listener = new THREE.AudioListener();

        this.audios = new Map();
    }

    init() {

        this._loadAudios();

        const loadingManager = this.loadingManager;

        return new Promise((resolve) => {

            loadingManager.onLoad = () => {

                setTimeout(() => {

                    resolve();

                }, 100);

            };

        });

    }

    cloneAudio(id) {

        const source = this.audios.get(id);

        const audio = new source.constructor(source.listener);
        audio.buffer = source.buffer;
        audio.setRefDistance(source.getRefDistance());
        audio.setVolume(source.getVolume());

        return audio;

    }

    _loadAudios() {

        const audioLoader = this.audioLoader;
        const audios = this.audios;
        const listener = this.listener;

        const refDistance = 20;

        const playerShot = new THREE.PositionalAudio(listener);
        playerShot.setRefDistance(refDistance);
        playerShot.setVolume(5.5);


        audioLoader.load('./assets/audio/playerShot.ogg', buffer => playerShot.setBuffer(buffer));


        audios.set('playerShot', playerShot);


    }
}