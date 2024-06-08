
//% color=#7F003F icon="\uf0d1" block="Kran" weight=06
namespace kran { // kran.ts

    const n_Simulator: boolean = ("€".charCodeAt(0) == 8364) // true, wenn der Code im Simulator läuft



    //% group="calliope-net.github.io/mkc-kran-s41"
    //% block="Simulator" 
    export function simulator() { return "€".charCodeAt(0) == 8364 }


    //% group="calliope-net.github.io/mkc-kran-s41"
    //% block="beim Start Funkgruppe %funkgruppe" 
    //% funkgruppe.min=0 funkgruppe.max=255 funkgruppe.defl=239
    export function beimStart(funkgruppe: number) {

        radio.beimStart(funkgruppe)
    }




} // kran.ts