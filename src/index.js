import Phaser from 'phaser';
import skyImg from './assets/sky.png';
import bombImg from './assets/bomb.png';
import dudeImg from './assets/dude.png';
import platformImg from './assets/platform.png';
import starImg from './assets/star.png';

const SKY = 'sky';
const BOMB = 'bomb';
const GROUND = 'ground';
const STAR = 'star';
const DUDE = 'dude';

class MyGame extends Phaser.Scene {
    constructor() {
        super();
        this.player = null;
    }

    preload() {
        this.load.image(SKY, skyImg);
        this.load.image(BOMB, bombImg);
        this.load.image(GROUND, platformImg);
        this.load.image(STAR, starImg);
        this.load.spritesheet(DUDE, dudeImg, {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        this.add.image(400, 300, SKY);

        const platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, GROUND).setScale(2).refreshBody();

        platforms.create(600, 400, GROUND);
        platforms.create(50, 250, GROUND);
        platforms.create(750, 220, GROUND);

        this.player = this.physics.add.sprite(100, 450, DUDE);

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(DUDE, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: DUDE, frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(DUDE, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });

        this.player.body.setGravityY(300);
        this.physics.add.collider(this.player, platforms);
    }

    update() {
        const cursors = this.input.keyboard.createCursorKeys();

        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-4x30);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
};

const game = new Phaser.Game(config);
