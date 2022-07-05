function radar () {
    basic.clearScreen()
    led.plot(2, 2)
    if (stepsToGhost >= 1) {
        led.plot(Math.constrain(stepsToGhost * Math.cos(toRadians(ghostDirection - (input.compassHeading() + 90))), -2, 2) + 2, Math.constrain(stepsToGhost * Math.sin(toRadians(ghostDirection - (input.compassHeading() + 90))), -2, 2) + 2)
    }
}
input.onButtonPressed(Button.A, function () {
    win = 0
    led.stopAnimation()
    basic.clearScreen()
})
function toRadians (degree: number) {
    return degree * (Math.PI / 180)
}
function getGhost () {
    stepsToGhost = randint(4, 10)
    ghostDirection = randint(0, 359)
}
input.onButtonPressed(Button.AB, function () {
    win = 0
    led.stopAnimation()
    getGhost()
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    if (stepsToGhost >= 1) {
        makeStep()
    } else {
        win = 1
        basic.clearScreen()
        basic.showIcon(IconNames.Ghost)
    }
})
function makeStep () {
    _Y = stepsToGhost * Math.sin(toRadians(ghostDirection))
    _x = stepsToGhost * Math.cos(toRadians(ghostDirection))
    _Y = _Y - Math.sin(toRadians(input.compassHeading()))
    _x = _x - Math.cos(toRadians(input.compassHeading()))
    ghostDirection = Math.atan2(_Y, _x) * (180 / Math.PI)
    stepsToGhost = Math.sqrt(_x * _x + _Y * _Y)
}
let tempJump = 0
let magnetJump = 0
let direction = 0
let _x = 0
let _Y = 0
let ghostDirection = 0
let win = 0
let stepsToGhost = 0
stepsToGhost = 0
let magnetic = input.magneticForce(Dimension.Strength)
let temp = input.temperature()
win = -1
basic.forever(function () {
    magnetic = input.magneticForce(Dimension.Strength)
    direction = input.compassHeading()
    temp = input.temperature()
    magnetJump = 0
    tempJump = 0
    if (win == 0) {
        radar()
    }
})
loops.everyInterval(5000, function () {
    if (Math.abs(magnetic - input.magneticForce(Dimension.Strength)) > 15) {
        magnetJump = 1
    }
    if (Math.abs(temp - input.temperature()) > 2) {
        tempJump = 1
    }
    if (tempJump == 1 || magnetJump == 1) {
        if (win == 0) {
            getGhost()
            win = 0
        }
    }
})
