export default class TCanvasTexture {
    constructor(width = 100, height = 100, bgColor = "rgb(255,255,200)") {
        this.canvas = document.createElement('canvas')
        this.canvas.width = width
        this.canvas.height = height
        this.canvas.style.backgroundColor = bgColor
    }
    draw(fn) {
        const ctx = this.canvas.getContext('2d')
        if (ctx) {
            fn(ctx)
            return this
        } else {
            console.warn('your browser can not support canvas 2d')
            return this
        }
    }
    preview() {
        const canvas = this.canvas
        canvas.style.position = 'fixed'
        canvas.style.top = '5%'
        canvas.style.left = '5%'
        document.body.appendChild(this.canvas)
        return this
    }
} 