
namespace kran { // multiswitch.ts

    const i2cgroveMultiswitch_x03 = 0x03
    const i2c_CMD_GET_DEV_EVENT = 0x01	// gets device event status

    export enum eStatus {
        fahren = 5,
        drehen = 1,
        seil = 3,
        links = 2,
        rechts = 4,
        fehler = 0
    }

    let n_Status = eStatus.fehler
    let n_Status_changed = true


    //% group="Status"
    //% block="Schalter einlesen" weight=8
    export function readSwitch(): boolean {
        if (pins.i2cWriteBuffer(i2cgroveMultiswitch_x03, Buffer.fromArray([i2c_CMD_GET_DEV_EVENT])) != 0) {
            n_Status_changed = (n_Status != eStatus.fehler)
            n_Status = eStatus.fehler
            return false // i2c Fehler
        } else {
            let bu = pins.i2cReadBuffer(i2cgroveMultiswitch_x03, 10)
            // Byte 0-3: 32 Bit UInt32LE; Byte 4:Schalter 1 ... Byte 9:Schalter 6
            // Byte 4-9: 00000001:Schalter OFF; 00000001:Schalter ON; Bit 1-7 löschen & 0x01
            for (let iSwitch = 1; iSwitch <= 5; iSwitch += 1) { // Richtung N = 1, W = 2, S = 3, O = 4, M = 5
                if (bu[3 + iSwitch] == 0) { // ON=00000000 OFF=00000001
                    n_Status_changed = (n_Status != iSwitch)
                    n_Status = iSwitch // n_Status nur bei 1..5 ändern (Schalter gedrückt); nicht ändern bei 0 (losgelassen)
                }
            }
            return true
        }
    }


    //% group="Status"
    //% block="Status Änderung" weight=6
    export function chStatus(): boolean { return n_Status_changed }


    //% group="Status"
    //% block="Status %pStatus" weight=5
    export function isStatus(pStatus: eStatus): boolean { return pStatus == n_Status }

    //% group="Status"
    //% block="Status" weight=4
    export function getStatus(): eStatus { return n_Status }



} // multiswitch.ts