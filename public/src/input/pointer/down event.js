var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.spritesheet('balls', 'assets/sprites/balls.png', { frameWidth: 17, frameHeight: 17 });
}

function create ()
{
    this.input.events.on('POINTER_DOWN_EVENT', function (event) {

        this.add.image(event.x, event.y, 'balls', Phaser.Math.Between(0, 5));

    }, 0, this);
}
