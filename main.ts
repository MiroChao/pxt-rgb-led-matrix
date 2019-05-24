enum color {
    //% block="red"
    red = 0x03,
    //% block="orange"
    orange = 0x19,
    //% block="yellow"
    yellow = 0x25,
    //% block="green"
    green = 0x55,
    //% block="cyan"
    cyan = 0x75,
    //% block="blue"
    blue = 0x95,
    //% block="purple"
    purple = 0xCC,
    //% block="white"
    white = 0xFE,
    //% block="black"
    black = 0xFF,
}

//% weight=10 color=#A5825B icon="\uf37f" block="RGB Matrix"
namespace rgbmatrix {
    /**
    * light up a line in specified color
    * @param x eg:1
    */
    //% blockId=line
    //% block="led bar level $x in $pickcolor"
    //% x.min=1 x.max=8
    export function line(x: number, pickcolor: color): void {
        let buf = pins.createBuffer(72);
        let j = 72 - 8 * x;

        buf[0] = 0x05;         //I2C_CMD_DISP_CUSTOM
        buf[1] = 0xD0;         //(duration_time & 0xff); duration_time = 2000
        buf[2] = 0x07;         //((duration_time >> 8) & 0xff); duration_time = 2000
        buf[3] = 1;
        buf[4] = 1;            //frame number
        buf[5, 6, 7] = 0;

        for (let i = 8; i < j; i++) {
            buf[i] = 0xff;
        }

        for (let i = j; i < 72; i++) {
            buf[i] = pickcolor;
        }


        pins.i2cWriteBuffer(0x65, buf);
    }

    /**
    * show animation
    */
    //% blockId=animation
    //% block="show animation"
    export function animation(): void {
        let buf = pins.createBuffer(6);
        buf[0] = 0x0c;
        buf[1] = 255;
        buf[2] = 255;
        buf[3] = 0x88;
        buf[4] = 0x13;
        buf[5] = 1;
        pins.i2cWriteBuffer(0x65, buf);
    }

    /**
    * set orientation
    */
    //% blockId=orientation
    //% block="orientation %orient|"
    export function orientation(orient: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = 0xb4;
        buf[1] = orient;
        pins.i2cWriteBuffer(0x65, buf);
    }

    /**
    * show pic
    */
    //% blockId=pic
    //% block="show pic %i|"
    export function pic(i: number): void {
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
        pins.i2cWriteBuffer(0x65, buf, false);
    }
}