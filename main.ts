function status_anzeigen () {
    if (kran.chStatus()) {
        basic.showNumber(kran.getStatus())
    }
}
if (!(kran.simulator())) {
    kran.beimStart(239)
    lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
}
loops.everyInterval(1, function () {
    if (kran.readSwitch()) {
        status_anzeigen()
    }
})
