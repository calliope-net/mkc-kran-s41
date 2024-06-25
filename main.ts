function status_anzeigen () {
    if (sender.receivedStringChanged()) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 1, 0, 15, lcd16x2rgb.lcd16x2_text(sender.receivedStringText()))
    }
}
function rgb_anzeigen () {
    if (sender.getMagnet()) {
        basic.setLedColor(basic.rgb(7, 0, 0))
    } else if (sender.joystickButtonOn()) {
        basic.setLedColor(basic.rgb(0, 0, 7))
    } else {
        basic.setLedColor(basic.rgb(0, 7, 0))
    }
}
if (!(radio.simulator())) {
    sender.beimStart(175)
    sender.enableButtonSendReset(true)
    sender.enableButtonMotor1(true)
    lcd16x2rgb.initLCD(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E))
}
loops.everyInterval(400, function () {
    rgb_anzeigen()
    if (sender.joystickQwiic()) {
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 0, 3, sender.joystickValue(sender.eJoystickValue.xmotor, 5))
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 4, 7, sender.joystickValue(sender.eJoystickValue.servo16, 5))
        lcd16x2rgb.writeText(lcd16x2rgb.lcd16x2_eADDR(lcd16x2rgb.eADDR_LCD.LCD_16x2_x3E), 0, 8, 15, sender.joystickButtonOn())
    }
    if (sender.isSwitch(sender.eStatus.nicht_angeschlossen) && sender.joystickButtonOn()) {
        if (!(sender.getGabelstapler())) {
            radio.fill_sendBuffer19()
            sender.sendM0(radio.radio_sendBuffer19(), 5, 10)
            radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b0, !(input.buttonIsPressed(Button.A)) && input.buttonIsPressed(Button.B))
            radio.sendData(radio.radio_sendBuffer19())
        } else {
            radio.fill_sendBuffer19()
            sender.sendM01(radio.radio_sendBuffer19(), 5, 60)
            radio.sendData(radio.radio_sendBuffer19())
        }
    } else if (sender.i2cReadSwitch()) {
        radio.fill_sendBuffer19()
        if (sender.isSwitch(sender.eStatus.fahren)) {
            sender.sendM0(radio.radio_sendBuffer19(), 5, 10)
        } else if (sender.isSwitch(sender.eStatus.seilrolle)) {
            sender.sendMAB(radio.radio_sendBuffer19(), 5)
        } else if (sender.isSwitch(sender.eStatus.zahnstange)) {
            sender.sendMCB(radio.radio_sendBuffer19(), 5)
        }
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b0, !(input.buttonIsPressed(Button.A)) && input.buttonIsPressed(Button.B))
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b1, sender.getMagnet())
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b6, true)
        radio.sendData(radio.radio_sendBuffer19())
    }
    radio.zeige5x5Status(radio.radio_sendBuffer19())
    status_anzeigen()
    basic.turnRgbLedOff()
})
