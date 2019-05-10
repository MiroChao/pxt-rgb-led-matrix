//% weight=10 color=#008B00 icon="\uf136" block="rgb matrix"
namespace rgbmatrix {
    /**
    * show animation
    */
    //% blockId=animation
    //% block="show animation"
    export function animation(): void {
        let buf = pins.createBuffer(6);
        buf[0] = 0x0c;
        buf[1] = 42;
        buf[2] = 43;
        buf[3] = 0x88;
        buf[4] = 0x13;
        buf[5] = 1;
        pins.i2cWriteBuffer(0x65, buf);
    }
}