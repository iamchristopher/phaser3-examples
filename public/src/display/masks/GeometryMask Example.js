var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 640,
    height: 480,
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function drawStar (graphics, cx, cy, spikes, outerRadius, innerRadius, color, lineColor)
{
    var rot = Math.PI / 2 * 3;
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    graphics.lineStyle(4, lineColor, 1);
    graphics.fillStyle(color, 1);
    graphics.beginPath();
    graphics.moveTo(cx, cy - outerRadius);

    for (i = 0; i < spikes; i++)
    {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        graphics.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        graphics.lineTo(x, y);
        rot += step;
    }

    graphics.lineTo(cx, cy - outerRadius);
    graphics.closePath();
    graphics.fillPath();
    graphics.strokePath();
}


function preload() {

    this.load.image('swirl', 'assets/pics/color-wheel-swirl.png');
    this.load.image('checker', 'assets/pics/checker.png');
}

function create() {

    var shape = this.add.graphics();

    var checker = this.make.image({
        x: game.config.width / 2,
        y: game.config.height / 2,
        key: 'checker',
        add: true
    });


    var swirl = this.make.sprite({
        x: game.config.width / 2, 
        y: game.config.height / 2, 
        key: 'swirl',
        add: true
    });

    shape.x = game.config.width / 2;
    shape.y = game.config.height / 2;

    drawStar(shape, 0, 0, 5, 100, 100 / 2, 0xffff00, 0xff0000);

    swirl.mask = new Phaser.Display.Masks.GeometryMask(this, shape);

    this.input.events.on('POINTER_MOVE_EVENT', function (event) {

        shape.x = event.x;
        shape.y = event.y;

    });

}
