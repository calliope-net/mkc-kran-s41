
namespace kran { // multiswitch.ts

    export enum eADDR { DIP_x03 = 0x03, DIP_SWITCH_x03 = 0x03 } // i2c Adressen

    export enum eRegister {
        I2C_CMD_GET_DEV_ID = 0x00,      // gets device ID information
        I2C_CMD_GET_DEV_EVENT = 0x01,	// gets device event status
        I2C_CMD_EVENT_DET_MODE = 0x02,	// enable button event detect mode
        I2C_CMD_BLOCK_DET_MODE = 0x03,	// enable button block detect mode
        I2C_CMD_AUTO_SLEEP_ON = 0xb2,	// enable device auto sleep mode
        I2C_CMD_AUTO_SLEEP_OFF = 0xb3,	// disable device auto sleep mode (default mode)
        I2C_CMD_SET_ADDR = 0xc0,	    // sets device i2c address
        I2C_CMD_RST_ADDR = 0xc1,    	// resets device i2c address
        I2C_CMD_TEST_TX_RX_ON = 0xe0,	// enable TX RX pin test mode
        I2C_CMD_TEST_TX_RX_OFF = 0xe1,	// disable TX RX pin test mode
        I2C_CMD_TEST_GET_VER = 0xe2,	// use to get software version
        I2C_CMD_GET_DEVICE_UID = 0xf1	// use to get chip id
    }
    export enum eSwitch {
        DIP1 = 1, DIP2 = 2, DIP3 = 3, DIP4 = 4, DIP5 = 5, DIP6 = 6,
        N = 1, W = 2, S = 3, O = 4, M = 5
    }
    export enum eONOFF { ON = 0, OFF = 1 } // Schalter aus wenn Bit 0 = 1



    //% group="Schalter auslesen aus Array"
    //% block="Schalter %pSwitch %pONOFF aus Array" weight=8
    export function getON(pSwitch: eSwitch, pONOFF: eONOFF): boolean {
        if (pins.i2cWriteBuffer(eADDR.DIP_x03, Buffer.fromArray([eRegister.I2C_CMD_GET_DEV_EVENT])) == 0) {
            let n_Buffer = pins.i2cReadBuffer(eADDR.DIP_x03, 10)
            if (n_Buffer != null && n_Buffer.length >= 10) {
                return (n_Buffer.getUint8(pSwitch + 3) & 0x01) == pONOFF // ON=0 OFF=1
            } else { return false }
        } else {
            return false
        }
    }

    //% group="Schalter auslesen aus Array"
    //% block="erster Schalter, der ON ist, (1-6;0) aus Array" weight=6
    export function getNumber() {
        for (let iSwitch = eSwitch.DIP1; iSwitch <= eSwitch.DIP6; iSwitch += 1) {
            if (getON(iSwitch, eONOFF.ON)) { return iSwitch }
        }
        return 0
    }

} // multiswitch.ts