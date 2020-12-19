class GameScene extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    create() {
        // audio
        var goldPickupAudio = this.sound.add('goldSound', { loop: false, volume: 1 });

        var button = this.add.image(100, 100, 'button1');
        button.setOrigin(0.5, 0.5);

        this.add.sprite(300, 100, 'button1');

        // the last argument is the item on the spritesheet
        this.chest = this.physics.add.image(300, 300, 'items', 0);

        this.wall = this.physics.add.image(500, 100, 'button1');
        // set collision to wall
        this.wall.setImmovable();

        this.player = this.physics.add.image(32, 32, 'characters', 0);
        // change the size of the object, can specify x, y value, specify 1 value will be for both x and y
        this.player.setScale(2);
        // prevent player from going off screen
        this.player.body.setCollideWorldBounds(true);

        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.player, this.chest, function(player, chest) {
            goldPickupAudio.play();
            chest.destroy();
        });

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    update() {
        // for both x and y
        this.player.setVelocity(0);
    
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
        }
    
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);
        }
    }
}