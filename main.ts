function status_anzeigen () {
    if (radio.receivedStringChanged()) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 15, lcd16x2rgb.lcd16x2_text(radio.receivedStringText()))
    }
}
function rgb_anzeigen () {
    if (radio.getMagnet()) {
        basic.setLedColor(basic.rgb(7, 0, 0))
    } else if (radio.joystickButtonOn()) {
        basic.setLedColor(basic.rgb(0, 0, 7))
    } else {
        basic.setLedColor(basic.rgb(0, 7, 0))
    }
}
if (!(radio.simulator())) {
    radio.beimStart(239, true)
    radio.enableButtonSendReset(true)
    radio.enableButtonMotor1(true)
    lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
}
loops.everyInterval(400, function () {
    rgb_anzeigen()
    if (radio.joystickQwiic()) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 3, radio.joystickValue(radio.eJoystickValue.xmotor, 5))
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 4, 7, radio.joystickValue(radio.eJoystickValue.servo16, 5))
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 8, 15, radio.joystickButtonOn())
    }
    if (radio.isSwitch(radio.eStatus.nicht_angeschlossen) && radio.joystickButtonOn()) {
        if (!(radio.getGabelstapler())) {
            radio.fill_sendBuffer19()
            radio.sendM0(radio.radio_sendBuffer19(), 5, 10)
            radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b0, !(input.buttonIsPressed(Button.A)) && input.buttonIsPressed(Button.B))
            radio.sendData(radio.radio_sendBuffer19())
        } else {
            radio.fill_sendBuffer19()
            radio.sendM01(radio.radio_sendBuffer19(), 5, 60)
            radio.sendData(radio.radio_sendBuffer19())
        }
    } else if (radio.i2cReadSwitch()) {
        radio.fill_sendBuffer19()
        if (radio.isSwitch(radio.eStatus.fahren)) {
            radio.sendM0(radio.radio_sendBuffer19(), 5, 10)
        } else if (radio.isSwitch(radio.eStatus.seilrolle)) {
            radio.sendMAB(radio.radio_sendBuffer19(), 5)
        } else if (radio.isSwitch(radio.eStatus.zahnstange)) {
            radio.sendMCB(radio.radio_sendBuffer19(), 5)
        }
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b0, !(input.buttonIsPressed(Button.A)) && input.buttonIsPressed(Button.B))
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b1, radio.getMagnet())
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b6, true)
        radio.sendData(radio.radio_sendBuffer19())
    }
    radio.zeige5x5Status(radio.radio_sendBuffer19())
    status_anzeigen()
    basic.turnRgbLedOff()
})
