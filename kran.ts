
//% color=#7F003F icon="\uf0d1" block="Kran Sender" weight=06
namespace kran { // kran.ts

   // const n_Simulator: boolean = ("€".charCodeAt(0) == 8364) // true, wenn der Code im Simulator läuft



    //% group="calliope-net.github.io/mkc-kran-s41"
    //% block="Simulator" 
    export function simulator() { return "€".charCodeAt(0) == 8364 }


    //% group="calliope-net.github.io/mkc-kran-s41"
    //% block="beim Start Funkgruppe %funkgruppe" 
    //% funkgruppe.min=0 funkgruppe.max=255 funkgruppe.defl=239
    export function beimStart(funkgruppe: number) {
        radio.beimStart(funkgruppe)
    }

    // ========== wenn Text empfangen (Bluetooth Status zurück senden)

    let n_receivedString = ""
    let n_receivedStringChanged = false

    radio.onReceivedString(function (receivedString) {
        n_receivedStringChanged = n_receivedString != receivedString
        if (n_receivedStringChanged) {
            n_receivedString = receivedString
        }
    })



    // ========== group="Kran Status" subcategory="Status empfangen"

    //% group="Bluetooth" subcategory="Status empfangen"
    //% block="Kran Status Änderung" weight=4
    export function receivedStringChanged() { return n_receivedStringChanged }

    //% group="Bluetooth" subcategory="Status empfangen"
    //% block="Kran Status Text" weight=3
    export function receivedString() { return n_receivedString.substr(2) }



} // kran.ts