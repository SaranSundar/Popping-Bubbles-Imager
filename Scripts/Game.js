Array.matrix = function (numrows, numcols, initial) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
};


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

renderer.backgroundColor = 0x1099bb;

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
var worldGrid;

let screenScale = 9;

var startXOffset;
var startYOffset;

var blockHeight;
var blockWidth;

function setup() {
    console.log("App Starting");
    worldGrid = Array.matrix(15, 20, 0);
    startXOffset = window.innerWidth / screenScale;
    startYOffset = window.innerHeight / screenScale;
    blockHeight = Math.min(window.innerHeight / worldGrid.length, window.innerWidth / worldGrid[0].length);
    blockWidth = blockHeight; //window.innerWidth / worldGrid[0].length;
    drawGrid();
    baseBlock = new Block("Test", 0, 0, 0, blockWidth, blockHeight, 0xFF700B);
    stage.addChild(baseBlock.graphics);
    animate();
}


function drawGrid() {
    let r;
    var g = new PIXI.Graphics();
    g.lineStyle(4, 0xffd900, 1);

    var blockSize = blockWidth;

    var startX = Math.floor(startXOffset);
    var endX = Math.floor(window.innerWidth - startXOffset);
    var numCols = Math.floor((endX - startX) / blockSize);
    endX = startX + numCols * blockSize;

    var startY = Math.floor(startYOffset);
    var endY = Math.floor(window.innerHeight - startYOffset);
    var numRows = Math.floor((endY - startY) / blockSize);
    endY = startY + numRows * blockSize;

    for (let r = 0; r <= numRows; r++) {
        let yPos = Math.floor(startY + r * blockSize);
        g.moveTo(startX, yPos);
        g.lineTo(endX, yPos);
    }

    for (let c = 0; c <= numCols; c++) {
        let xPos = Math.floor(startX + c * blockSize);
        g.moveTo(xPos, startY);
        g.lineTo(xPos, endY);
    }

    stage.addChild(g);


}


function animate() {
    requestAnimationFrame(animate);
    //console.log("Hello");
    baseBlock.animate(state);
    renderer.render(stage);
}


window.addEventListener("keydown", function (event) {
    state.keys[event.keyCode] = true;
    console.log(event.keyCode);
});

window.addEventListener("keyup", function (event) {
    state.keys[event.keyCode] = false;
});

window.addEventListener("mousedown", function (event) {
    state.clicks[event.which] = {
        "clientX": event.clientX,
        "clientY": event.clientY
    };
});

window.addEventListener("mouseup", function (event) {
    state.clicks[event.which] = false;
});

window.addEventListener("mousemove", function (event) {
    state.mouse.clientX = event.clientX;
    state.mouse.clientY = event.clientY;
});


class Block {
    constructor(id, x, y, z, width, height, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.width = width;
        this.height = height;
        this.color = color;
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