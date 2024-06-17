export default class AbacusToken {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private color: string;

    constructor(x: number, y: number, width: number, heigth: number, color: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = heigth;
        this.color = color;
    }

    public getX(): number {
        return this.x
    }

    public getY(): number {
        return this.y
    }

    public getWidth(): number {
        return this.width
    }

    public getHeight(): number {
        return this.height
    }

    public getColor(): string {
        return this.color
    }

    public drawToken (context: CanvasRenderingContext2D, cursorCoordinate: number){
        if(cursorCoordinate < 0 || cursorCoordinate > context.canvas.width - this.width) return
        requestAnimationFrame((_time) => this.drawToken)
        context.clearRect(0,0, context.canvas.width, context.canvas.height)
        context.beginPath()
        context.rect(cursorCoordinate, this.y, this.width, context.canvas.height)
        context.fillStyle = this.color;
        context.fill()
        this.x = cursorCoordinate
        requestAnimationFrame((_time) => this.drawToken)
      }

}