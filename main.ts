input.onButtonEvent(Button.A, ButtonEvent.Hold, function () {
    storage.putNumber(StorageSlots.s1, radio.getFunkgruppe(-1))
})
input.onButtonEvent(Button.B, ButtonEvent.Hold, function () {
    storage.putNumber(StorageSlots.s1, radio.getFunkgruppe(1))
})
function rgb_anzeigen () {
    if (sender.getMagnet()) {
        basic.setLedColor(basic.rgb(7, 0, 0))
    } else if (sender.joystickButtonOn()) {
        basic.setLedColor(basic.rgb(0, 0, 7))
    } else {
        basic.setLedColor(basic.rgb(0, 7, 0))
    }
}
sender.beimStart(storage.getNumber(StorageSlots.s1))
storage.putNumber(StorageSlots.s1, radio.getFunkgruppe(0))
loops.everyInterval(400, function () {
    rgb_anzeigen()
    if (sender.joystickQwiic()) {
    	
    }
    if (sender.isSwitch(sender.eStatus.nicht_angeschlossen) && sender.joystickButtonOn()) {
        if (!(sender.getGabelstapler())) {
            radio.fill_sendBuffer19()
            sender.sendM0(radio.radio_sendBuffer19())
            radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b0, !(input.buttonIsPressed(Button.A)) && input.buttonIsPressed(Button.B))
            radio.sendData(radio.radio_sendBuffer19())
        } else {
            radio.fill_sendBuffer19()
            sender.sendM01(radio.radio_sendBuffer19())
            radio.sendData(radio.radio_sendBuffer19())
        }
    } else if (sender.i2cReadSwitch()) {
        radio.fill_sendBuffer19()
        if (sender.isSwitch(sender.eStatus.fahren)) {
            sender.sendM0(radio.radio_sendBuffer19())
        } else if (sender.isSwitch(sender.eStatus.seilrolle)) {
            sender.sendMAB(radio.radio_sendBuffer19())
        } else if (sender.isSwitch(sender.eStatus.zahnstange)) {
            sender.sendMCB(radio.radio_sendBuffer19())
        }
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b0, !(input.buttonIsPressed(Button.A)) && input.buttonIsPressed(Button.B))
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b1, sender.getMagnet())
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b6, true)
        radio.sendData(radio.radio_sendBuffer19())
    }
    radio.zeige5x5Buffer(radio.radio_sendBuffer19())
    radio.zeige5x5Joystick(radio.radio_sendBuffer19())
    basic.turnRgbLedOff()
})
