function status_anzeigen () {
    if (kran.chSwitch()) {
        basic.showNumber(kran.getSwitch())
    }
    if (kran.receivedStringChanged()) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 15, lcd16x2rgb.lcd16x2_text(kran.receivedString()))
    }
}
if (!(kran.simulator())) {
    kran.beimStart(239)
    lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
}
loops.everyInterval(400, function () {
    basic.setLedColor(kran.getRGB())
    if (kran.readSwitch() && radio.joystickQwiic()) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 3, radio.joystickValue(radio.eJoystickValue.motor, 5))
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 4, 7, radio.joystickValue(radio.eJoystickValue.servo16, 5))
        if (kran.isSwitch(kran.eStatus.fahren)) {
            radio.fill_sendBuffer19()
            radio.setBetriebsart(radio.radio_sendBuffer19(), radio.e0Betriebsart.p0)
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.m0, radio.eBufferOffset.b0_Motor, radio.joystickValue(radio.eJoystickValue.motor, 5))
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.m0, radio.eBufferOffset.b1_Servo, radio.joystickValue(radio.eJoystickValue.servo16, 5, 10))
            radio.setaktiviert(radio.radio_sendBuffer19(), radio.e3aktiviert.m0, true)
            radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b0, kran.getMagnet())
            radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b6, true)
            radio.sendData(radio.radio_sendBuffer19())
        } else {
        	
        }
    }
    status_anzeigen()
    basic.turnRgbLedOff()
})
