//% weight=10 color=#008B00 icon="\uf136" block="rgb matrix"
namespace rgbmatrix {
    /**
    * show animation
    */
    //% blockId=animation
    //% block="show animation"
    export function animation(): void {
        let buf = pins.createBuffer(6);
        buf[0] = 0xb4;
        buf[1] = 2;
        pins.i2cWriteBuffer(0x65, buf);

        buf[0] = 0x0c;
        buf[1] = 255;
        buf[2] = 255;
        buf[3] = 0x88;
        buf[4] = 0x13;
        buf[5] = 1;
        pins.i2cWriteBuffer(0x65, buf);
    }
    /**
    * show pic
    */
    //% blockId=pic
    //% block="show pic %i|"
    export function pic(i:number): void {
        let buf = pins.createBuffer(5);
        buf[0] = 0x02;
        buf[1] = i;
        buf[2] = 0x88;
        buf[3] = 0x13;
        buf[4] = 1;
        pins.i2cWriteBuffer(0x65, buf);
    }

    /**
    * clear 
    */
    //% blockId=clear
    //% block="clear the led"
    export function clearLED(): void {
        let buf = pins.createBuffer(0);
        buf[0] = 0x06;
        pins.i2cWriteBuffer(0x65, buf);
    }
}