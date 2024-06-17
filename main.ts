function status_anzeigen () {
    if (radio.chSwitch()) {
        basic.showNumber(radio.getSwitch())
    } else if (radio.getSwitch() == 0) {
        radio.plotBIN(radio.funkgruppe(), 1)
    }
    if (radio.receivedStringChanged()) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 15, lcd16x2rgb.lcd16x2_text(radio.receivedStringText()))
    }
}
function rgb_anzeigen () {
    if (radio.getMagnet()) {
        basic.setLedColor(basic.rgb(0, 7, 0))
    } else {
        basic.setLedColor(basic.rgb(0, 0, 7))
    }
}
if (!(radio.simulator())) {
    radio.beimStart(239, true)
    radio.enableButtonSendReset(true)
    lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
}
loops.everyInterval(400, function () {
    rgb_anzeigen()
    if (radio.joystickQwiic()) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 3, radio.joystickValue(radio.eJoystickValue.xmotor, 5))
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 4, 7, radio.joystickValue(radio.eJoystickValue.servo16, 5))
    }
    if (radio.isSwitch(radio.eStatus.nicht_angeschlossen) && radio.buttonOnOff()) {
        radio.fill_sendBuffer19()
        radio.setBetriebsart(radio.radio_sendBuffer19(), radio.e0Betriebsart.p0)
        radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.m0, radio.eBufferOffset.b0_Motor, radio.joystickValue(radio.eJoystickValue.xmotor, 5))
        radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.m0, radio.eBufferOffset.b1_Servo, radio.joystickValue(radio.eJoystickValue.servo16, 5, 10))
        radio.setaktiviert(radio.radio_sendBuffer19(), radio.e3aktiviert.m0, true)
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b0, !(input.buttonIsPressed(Button.A)) && input.buttonIsPressed(Button.B))
        radio.sendData(radio.radio_sendBuffer19())
    } else {
        radio.i2cReadSwitch()
        radio.fill_sendBuffer19()
        radio.setBetriebsart(radio.radio_sendBuffer19(), radio.e0Betriebsart.p0)
        if (radio.isSwitch(radio.eStatus.fahren)) {
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.m0, radio.eBufferOffset.b0_Motor, radio.joystickValue(radio.eJoystickValue.xmotor, 5))
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.m0, radio.eBufferOffset.b1_Servo, radio.joystickValue(radio.eJoystickValue.servo16, 5, 10))
            radio.setaktiviert(radio.radio_sendBuffer19(), radio.e3aktiviert.m0, true)
        } else if (radio.isSwitch(radio.eStatus.seilrolle)) {
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.ma, radio.eBufferOffset.b0_Motor, radio.joystickValue(radio.eJoystickValue.xmotor, 5))
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.mb, radio.eBufferOffset.b0_Motor, radio.joystickValue(radio.eJoystickValue.ymotor, 5))
            radio.setaktiviert(radio.radio_sendBuffer19(), radio.e3aktiviert.ma, true)
            radio.setaktiviert(radio.radio_sendBuffer19(), radio.e3aktiviert.mb, true)
        } else if (radio.isSwitch(radio.eStatus.zahnstange)) {
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.mc, radio.eBufferOffset.b0_Motor, radio.joystickValue(radio.eJoystickValue.xmotor, 5))
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.mb, radio.eBufferOffset.b0_Motor, radio.joystickValue(radio.eJoystickValue.ymotor, 5))
            radio.setaktiviert(radio.radio_sendBuffer19(), radio.e3aktiviert.mc, true)
            radio.setaktiviert(radio.radio_sendBuffer19(), radio.e3aktiviert.mb, true)
        }
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b0, !(input.buttonIsPressed(Button.A)) && input.buttonIsPressed(Button.B))
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b1, radio.getMagnet())
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b6, true)
        radio.sendData(radio.radio_sendBuffer19())
    }
    status_anzeigen()
    basic.turnRgbLedOff()
})
