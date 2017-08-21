
var renderer = new PIXI.autoDetectRenderer(
    window.innerWidth,
    window.innerHeight,
    {
        "antialias": true,
        "autoResize": true,
        "transparent": false,
        "resolution": 2
    }
);

renderer.backgroundColor = 0x1099bb
 
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var state = {
    "renderer": renderer,
    "stage": stage,
    "keys": {},
    "clicks": {},
    "mouse": {}
};

var baseBlock;

function setup(){
    console.log("App Starting");
    baseBlock = new Block("Test", 0, 0, 0, 100, 100, 0xFF700B);
    stage.addChild(baseBlock.graphics);
    animate();
}






 
function animate() {
    requestAnimationFrame(animate);
    //console.log("Hello");
    baseBlock.animate(state);
    renderer.render(stage);
}







 
window.addEventListener("keydown", function(event) {
    state.keys[event.keyCode] = true;
    console.log(event.keyCode);
});
 
window.addEventListener("keyup", function(event) {
    state.keys[event.keyCode] = false;
});
 
window.addEventListener("mousedown", function(event) {
    state.clicks[event.which] = {
        "clientX": event.clientX,
        "clientY": event.clientY
    };
});
 
window.addEventListener("mouseup", function(event) {
    state.clicks[event.which] = false;
});
 
window.addEventListener("mousemove", function(event) {
    state.mouse.clientX = event.clientX;
    state.mouse.clientY = event.clientY;
});


class Block {
    constructor(id, x, y, z, width, height, color) {
        this.id = id
        this.x = x
        this.y = y
        this.z = z
        this.width = width
        this.height = height
        this.color = color
        this.createGraphics();
    }
    
    createGraphics() {
        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(0);
        this.graphics.beginFill(this.color, 1);
        this.graphics.drawRect(this.x, this.y, this.width, this.height);
        this.graphics.endFill();
    }
    
    animate(state) {
        if (state.keys[37]) { // left
        this.x = Math.max(
            0, this.x - 5
        );
    }
 
    if (state.keys[39]) { // right
        this.x = Math.min(
            window.innerWidth - this.width, this.x + 5
        );
    }
        
        if (state.keys[38]) { // up
        this.y = Math.max(
            0, this.y - 5
        );
    }
 
    if (state.keys[40]) { // down
        this.y = Math.min(
            window.innerHeight - this.height, this.y + 5
        );
    }
 
    if (state.clicks[1]) { // left click
        this.x = state.clicks[1].clientX;
    }
        
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }
}