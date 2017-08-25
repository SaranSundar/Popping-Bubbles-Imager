
let renderer = new PIXI.autoDetectRenderer(
    window.innerWidth,
    window.innerHeight,
    {
        "antialias": true,
        "autoResize": true,
        "transparent": false,
        "resolution": 2
    }
);

var radius;

renderer.backgroundColor = 0xffa391;

document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var bubbles = [];

var pointMouse;

var state = {
    "renderer": renderer,
    "mouse": {}
};

var canvas = document.getElementById("myCanvas2");
var ctx = canvas.getContext("2d");

var pic = new Image();
pic.src = "lava.png";

function setup() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if(canvas.width > canvas.height){
        radius = canvas.height * .9 /2;
    }else{
        radius = canvas.width * .9 /2;
    }
    ctx.drawImage(pic,canvas.width/2-radius,canvas.height/2-radius,radius*2,radius*2);



    pointMouse = new PIXI.Point(300, 0);
    state.mouse[0] = pointMouse;
    var startBubble = new Bubble(window.innerWidth / 2, window.innerHeight / 2, 300);
    bubbles.push(startBubble);
    // let sprite = new PIXI.Sprite(PIXI.Texture.fromImage('lava.png'));
    // sprite.anchor = new PIXI.Point(0.5, 0.5);
    // sprite.alpha = 1.0;
    // sprite.x = window.innerWidth / 2;
    // sprite.y = window.innerHeight / 2;
    // stage.addChild(sprite);

    //sprite.cacheAsBitmap = true;
    animate();
}


function animate() {
    requestAnimationFrame(animate);
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].animate(state);
    }
    renderer.render(stage);
}

window.addEventListener("mousemove", function (event) {
    if (pointMouse !== null) {
        pointMouse.set(event.clientX, event.clientY);
        //state.mouse.clientX = event.clientX;
        //state.mouse.clientY = event.clientY;
        state.mouse[0] = pointMouse;
    }
});
