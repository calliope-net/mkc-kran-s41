function status_anzeigen () {
    if (kran.chStatus()) {
        basic.showNumber(kran.getStatus())
    }
    if (kran.getMagnet()) {
        rgb = basic.rgb(7, 0, 0)
    } else {
        rgb = basic.rgb(0, 7, 0)
    }
}
let rgb = 0
if (!(kran.simulator())) {
    kran.beimStart(239)
}
rgb = basic.rgb(7, 7, 7)
loops.everyInterval(400, function () {
    basic.setLedColor(rgb)
    if (kran.readSwitch()) {
    	
    }
    status_anzeigen()
    basic.turnRgbLedOff()
})
