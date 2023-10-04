//"use strict"

const c = 400
//const cstars = 200

let lastUpdate = Date.now();

const pi2 = 2 * Math.PI

let cFPS = 0
let showFPS = 0

let sa = [],
    xa = [],
    ya = [],
    sxa = [],
    sya = [],
    colora = [],

    starX = [],
    starY = [],
    starS = []


function game() {

    clear()

    //drawStars()

    for (let i = 0; i < c; ++i) {

        s = sa[i]

        x = xa[i]
        y = ya[i]

        sx = sxa[i]
        sy = sya[i]


        //
        if (x > w + s)
            x = -s
        if (y > h + s)
            y = -s
        if (x < -s)
            x = w + s
        if (y < -s)
            y = h + s
        //

        /*
            // <Wall>
            if (x > w) {
                sx = -sx
            }
            if (x < 0) {
                sx = -sx
            }
            if (y > h) {
                sy = -sy
            }
            if (y < 0) {
                sy = -sy
            }
            // </Wall>
        */

        //
        for (let j = 0; j < c; ++j) {

            if (j === i) continue

            dx = xa[j] - x
            dy = ya[j] - y

            if (dx === 0 && dy === 0) {
                //if (Math.random() > 0.5)
                //    sx = -sx
                //else
                //    sy = -sy
                continue
            }

            r = Math.sqrt(dx * dx + dy * dy)

            px = 0.0003 * dx / (1 + r)
            py = 0.0003 * dy / (1 + r)

            sx += px
            sy += py

        }
        //

        // <Friction>
        sx /= 1.0001
        sy /= 1.0001
        // </Friction>

        //
        x += sx
        y += sy
        //

        xa[i] = x
        ya[i] = y

        sxa[i] = sx
        sya[i] = sy

        circle(x, y, 2, colora[i])
    }

    ++cFPS

    ctx.fillStyle = "#0a0";
    ctx.font = "30px Verdana";
    ctx.fillText("FPS " + showFPS, 20, 40);

    window.requestAnimationFrame(game)
}

//

function start() {

    /*
    for (let i = 0; i < cstars; ++i) {

        starX[i] = rand(0, w)
        starY[i] = rand(0, h)
        starS[i] = Math.random()

    }
    */

    for (let i = 0; i < c; ++i) {

        sa[i] = rand(1, 5)

        xa[i] = w / 2
        ya[i] = h / 2

        let speed = 5 + 10 * Math.random()

        let speedy = speed * Math.random()
        let speedx = Math.sqrt(speed * speed - speedy * speedy)

        if (Math.random() > 0.5) {
            let tmp = speedy
            speedy = speedx
            speedx = tmp
        }

        if (rand(0, 1) === 0)
            speedx = -speedx

        if (rand(0, 1) === 0)
            speedy = -speedy

        sxa[i] = speedx
        sya[i] = speedy

        colora[i] = getColor()

    }

}

function drawStars() {

    ctx.fillStyle = "#777"

    for (let i = 0; i < cstars; ++i) {

        starY[i] -= starS[i]

        if (starY[i] < 0) {
            starY[i] = h
            starX[i] = w * Math.random()
        }

        //if (starY[i] > h)
        //    starY[i] = 0

        ctx.fillRect(starX[i], starY[i], starS[i], starS[i])
    }
}

function getColor() {

    let r = rand(25, 255)
    let g = rand(25, 255)
    let b = rand(25, 255)

    if (r < g && r < b) {
        r /= 1.4
        g *= 1.2
        b *= 1.2
    } else if (g < b && g < r) {
        r *= 1.2
        g /= 1.4
        b *= 1.2
    } else if (b < r && b < g) {
        r *= 1.2
        g *= 1.2
        b /= 1.4
    }

    if (r > 255) r = 255
    if (g > 255) g = 255
    if (b > 255) b = 255

    return "rgb(" + r + "," + g + "," + b + ")"
}

function circle(x, y, s, c) {
    ctx.beginPath()
    ctx.arc(x, y, s, 0, pi2)
    ctx.fillStyle = c
    ctx.fill()
}

function clear() {
    //ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, w, h)

}

function resize() {
    w = window.innerWidth
    h = window.innerHeight
    canv.width = w
    canv.height = h
}

function rand(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1))
}

function FPS() {

    now = Date.now()
    delta = now - lastUpdate
    lastUpdate = now

    showFPS = Math.round(cFPS * 1000 / delta)

    cFPS = 0

}

window.onload = function () {

    canv = document.getElementById("gc")
    resize()
    ctx = canv.getContext("2d")

    start()

    window.addEventListener("resize", resize)
    setInterval(FPS, 1000)

    window.requestAnimationFrame(game)
}
