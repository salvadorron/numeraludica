export default class AbacusToken {
    private id: string;
    private context: CanvasRenderingContext2D;
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    private color: string;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, width: number, heigth: number, color: string) {
        this.id = self.crypto.randomUUID()
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = heigth;
        this.color = color;
    }

    public getId(): string {
        return this.id
    }

    public getContext2d(): CanvasRenderingContext2D {
        return this.context
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

    public translateX(x: number) {
        return this.x = x;
    }

    // public drawToken(cursorCoordinate: number): AbacusToken | undefined {
    //     if (cursorCoordinate < 0 || cursorCoordinate > this.context.canvas.width - this.width) return
    //     requestAnimationFrame(() => this.drawToken)
    //     this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
    //     this.context.beginPath()
    //     this.context.rect(cursorCoordinate, this.y, this.width, this.context.canvas.height)
    //     this.context.fillStyle = this.color;
    //     this.context.fill()
    //     requestAnimationFrame(() => this.drawToken)
    //     return this
    // }

}