function status_anzeigen () {
    if (kran.chSwitch()) {
        basic.showNumber(kran.getSwitch())
    }
    if (kran.receivedStringChanged()) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 15, kran.receivedString().substr(2, 16))
    }
}
if (!(kran.simulator())) {
    kran.beimStart(239)
    lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
}
loops.everyInterval(400, function () {
    basic.setLedColor(kran.getRGB())
    if (kran.isSwitch(kran.eStatus.fahren)) {
    	
    }
    status_anzeigen()
    basic.turnRgbLedOff()
})
