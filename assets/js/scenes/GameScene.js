class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        // audio
        var goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: 1 });


        // the last argument is the item on the spritesheet
        this.chest = new Chest(this, 300, 300, 'items', 0);

        this.wall = this.physics.add.image(500, 100, 'button1');
        // set collision to wall
        this.wall.setImmovable();

        this.player = new Player(this, 32, 32, 'characters', 0);
        // change the size of the object, can specify x, y value, specify 1 value will be for both x and y

        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.player, this.chest, function(player, chest) {
            goldPickupAudio.play();
            chest.destroy();
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update() {
        this.player.update(this.cursors);
    }
}