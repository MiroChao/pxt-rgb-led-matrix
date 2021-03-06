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

//% weight=10 color=#A5825B icon="\uf00a" block="RGB Matrix"
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
    * light up a line in specified color
    * @param x eg:1
    */
    //% blockId=colorline
    //% block="led bar level $x with color $pickcolor"
    //% x.min=1 x.max=8
    //% pickcolor.shadow="colorNumberPicker"
    export function colorline(x: number, pickcolor: number): void {
        let buf = pins.createBuffer(72);
        let j = 72 - 8 * x;
        let truecolor: number = 0;

        buf[0] = 0x05;         //I2C_CMD_DISP_CUSTOM
        buf[1] = 0xD0;         //(duration_time & 0xff); duration_time = 2000
        buf[2] = 0x07;         //((duration_time >> 8) & 0xff); duration_time = 2000
        buf[3] = 1;
        buf[4] = 1;            //frame number
        buf[5, 6, 7] = 0;

        switch (pickcolor) {
            case 0xff0000: truecolor = 0x03; break;
            case 0xff8000: truecolor = 0x19; break;
            case 0xffff00: truecolor = 0x25; break;
            case 0xff9da5: truecolor = 0xe7; break;

            case 0x00ff00: truecolor = 0x55; break;
            case 0xb09eff: truecolor = 0xd0; break;
            case 0x00ffff: truecolor = 0x75; break;
            case 0x007fff: truecolor = 0x96; break;

            case 0x65471f: truecolor = 0xff; break;
            case 0x0000ff: truecolor = 0xaa; break;
            case 0x7f00ff: truecolor = 0xcc; break;
            case 0xff0080: truecolor = 0xe9; break;

            case 0xff00ff: truecolor = 0xd4; break;
            case 0xffffff: truecolor = 0xfe; break;
            case 0x999999: truecolor = 0xfe; break;
            case 0x000000: truecolor = 0xff; break;
            default: truecolor = 0xff; break;
        }

        for (let i = 8; i < j; i++) {
            buf[i] = 0xff;
        }

        for (let i = j; i < 72; i++) {
            buf[i] = truecolor;
        }

        pins.i2cWriteBuffer(0x65, buf);
    }

    /**
    * draw a heart
    * @param x eg:1
    */
    //% blockId=drawheart
    //% block="heart level $x with color $pickcolor"
    //% x.min=1 x.max=8
    //% pickcolor.shadow="colorNumberPicker"
    export function heart(x: number, pickcolor: number): void {
        let buf = pins.createBuffer(72);
        let j = 72 - 8 * x;
        let truecolor: number = 0;

        let bufclear = pins.createBuffer(0);
        bufclear[0] = 0x06;
        pins.i2cWriteBuffer(0x65, bufclear, false);

        buf[0] = 0x05;         //I2C_CMD_DISP_CUSTOM
        buf[1] = 0xD0;         //(duration_time & 0xff); duration_time = 2000
        buf[2] = 0x07;         //((duration_time >> 8) & 0xff); duration_time = 2000
        buf[3] = 1;
        buf[4] = 1;            //frame number
        buf[5, 6, 7] = 0;

        switch (pickcolor) {
            case 0xff0000: truecolor = 0x03; break;
            case 0xff8000: truecolor = 0x19; break;
            case 0xffff00: truecolor = 0x25; break;
            case 0xff9da5: truecolor = 0xe7; break;

            case 0x00ff00: truecolor = 0x55; break;
            case 0xb09eff: truecolor = 0xd0; break;
            case 0x00ffff: truecolor = 0x75; break;
            case 0x007fff: truecolor = 0x96; break;

            case 0x65471f: truecolor = 0xff; break;
            case 0x0000ff: truecolor = 0xaa; break;
            case 0x7f00ff: truecolor = 0xcc; break;
            case 0xff0080: truecolor = 0xe9; break;

            case 0xff00ff: truecolor = 0xd4; break;
            case 0xffffff: truecolor = 0xfe; break;
            case 0x999999: truecolor = 0xfe; break;
            case 0x000000: truecolor = 0xff; break;
            default: truecolor = 0xff; break;
        }

        for (let i = 8; i < j; i++) {
            buf[i] = 0xff;
        }

        for (let i = j; i < 72; i++) {
            buf[i] = truecolor;
        }

        if (x >= 1) {
            buf[64] = 0xff;
            buf[65] = 0xff;
            buf[66] = 0xff;
            buf[69] = 0xff;
            buf[70] = 0xff;
            buf[71] = 0xff;
        }
        if (x >= 2) {
            buf[56] = 0xff;
            buf[57] = 0xff;
            buf[62] = 0xff;
            buf[63] = 0xff;
        }
        if (x >= 3) {
            buf[48] = 0xff;
            buf[55] = 0xff;
        }
        if (x >= 8) {
            buf[8] = 0xff;
            buf[11] = 0xff;
            buf[12] = 0xff;
            buf[15] = 0xff;
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
    //% block="show picture %i|"
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