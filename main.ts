function status_anzeigen () {
    if (kran.chStatus()) {
        basic.showNumber(kran.getStatus())
        if (kran.getMagnet()) {
            rgb = basic.rgb(7, 0, 0)
        } else {
            rgb = basic.rgb(0, 7, 0)
        }
    }
    if (kran.receivedStringChanged()) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 15, kran.receivedString().substr(2, 16))
    }
}
let rgb = 0
if (!(kran.simulator())) {
    kran.beimStart(239)
    lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
    rgb = basic.rgb(7, 7, 7)
}
loops.everyInterval(400, function () {
    basic.setLedColor(rgb)
    if (kran.readSwitch()) {
    	
    }
    status_anzeigen()
    basic.turnRgbLedOff()
})
