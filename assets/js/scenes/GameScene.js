class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        // launch: fire off scene in parrallel
        // start: shutdown current scene and transistion to new scene
        // whatever scene active first will be on the bottom layer
        this.scene.launch('Ui');
    }

    create() {
        this.createAudio();
        this.createChests();
        this.createWalls();
        this.createPlayer();
        this.addCollisions();
        this.createInput();
    }
    
    update() {
        this.player.update(this.cursors);
    }

    createAudio() {
        // audio
        this.goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: 1 });
    }

    createPlayer() {
        this.player = new Player(this, 32, 32, 'characters', 0);
        // change the size of the object, can specify x, y value, specify 1 value will be for both x and y
    }

    createChests() {
        // the last argument is the item on the spritesheet
        this.chest = new Chest(this, 300, 300, 'items', 0);
    }

    createWalls() {
        this.wall = this.physics.add.image(500, 100, 'button1');
        // set collision to wall
        this.wall.setImmovable();
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    addCollisions() {
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.player, this.chest, this.collectChest, null, this);
    }

    collectChest(player, chest) {
        // play gold pickup sound
        this.goldPickupAudio.play();
        // update score in the ui
        this.events.emit('updateScore', chest.coins);
        // destroy the chest game object
        chest.destroy();
    }
}