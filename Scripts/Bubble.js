class Bubble {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = this.getColor(this.x, this.y);
        this.isAlive = true;
        this.createGraphics();
    }

    createGraphics() {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(this.color);
        this.graphics.drawCircle(this.x, this.y, this.r);
        // this.graphics.interactive = true;
        // this.graphics.on('pointermove', function (evt) {
        //     var clickPosition = evt.data.getLocalPosition(stage);
        //     if(this.containsPoint(clickPosition)){
        //         Bubble.createBubble();
        //         this.destroy();
        //     }
        // });
        stage.addChild(this.graphics);
        // console.log("added bubble");
    }

    createBubble() {
        var newRadius = this.r / 2;

        let topLeft = new Bubble(this.x - this.r / 2, this.y - this.r / 2, newRadius);
        let topRight = new Bubble(this.x + this.r / 2, this.y - this.r / 2, newRadius);
        let bottomLeft = new Bubble(this.x - this.r / 2, this.y + this.r / 2, newRadius);
        let bottomRight = new Bubble(this.x + this.r / 2, this.y + this.r / 2, newRadius);

        bubbles.push(topLeft);
        bubbles.push(topRight);
        bubbles.push(bottomLeft);
        bubbles.push(bottomRight);
        //console.log("CREATING BUBBLE")
    }

    deleteBubble() {
        this.graphics.destroy();
        this.graphics = null;
        this.isAlive = false;
        //console.log("DELETING BUBBLE");
    }



    animate(state) {
        if (this.isAlive) {
            if (this.graphics !== null && this.graphics.containsPoint(state.mouse[0])) {
                if(this.r <= 5) {
                    this.isAlive = false;
                }
                else {
                    this.createBubble();
                    this.deleteBubble();
                }
            }
        }
    }


    getColor(xpos,ypos){
        var imageData = ctx.getImageData(xpos,ypos,1,1).data;
        var r = imageData[0];
        var g = imageData[1];
        var b = imageData[2];
        var color = this.rgbToHex(r,g,b);
        return color;
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgbToHex(r, g, b) {
        return "0x" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

}