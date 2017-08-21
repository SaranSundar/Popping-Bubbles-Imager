class Block {
    constructor(id, x, y, z, width, height, color) {
        this.id = id
        this.x = x
        this.y = y
        this.z = z
        this.width = width
        this.height = height
        this.color = color
        createGraphics();
    }
    
    createGraphics() {
        this.graphics = new PIXI.Graphics();
        this.graphics.lineStyle(0);
        this.graphics.beginFill(this.color, 1);
        this.graphics.drawRect(this.x, this.y, this.width, this.height);
        this.graphics.endFill();
    }
}

export default Block;