const rikaElement = document.getElementById("rika")
const nipahSfx = new Audio("assets/nipah.mp3")

let nipahTimer

function nipah() {
    clearTimeout(nipahTimer)

    rikaElement.classList.add("nipah")

    nipahSfx.currentTime = 0
    nipahSfx.play()

    nipahTimer = setTimeout(() => {rikaElement.classList.remove("nipah")}, 1000)
}

const fullTitle = document.title
let counter = 0
let cursorFlag = false
let typing = true
let titleFrame = " "
const WAIT_TICKS = 12

function animateTitle() {
    if (typing) {
        if(!cursorFlag){
            counter++
            titleFrame = fullTitle.slice(0, counter)
        }
        
        if (cursorFlag) {
            titleFrame += "_"
            cursorFlag = false
        } else {
            cursorFlag = true
        }

        if (counter > fullTitle.length + WAIT_TICKS) {
            typing = false
            counter -= WAIT_TICKS
        }

    } else {
        counter--
        titleFrame = fullTitle.slice(0, counter) + "_"

        if (counter === 0) {
            typing = true
            cursorFlag = false
        }
    }
    document.title = titleFrame
}

const linksList = document.querySelectorAll(".links a")
const coinSfx = new Audio("assets/coin.mp3")

function clickLinkSfx() {
    coinSfx.currentTime = 0
    coinSfx.play()
}

linksList.forEach((link) => {link.addEventListener("click", clickLinkSfx)})
linksList.forEach((link) => {link.addEventListener("auxclick", clickLinkSfx)})
rikaElement.addEventListener("click", nipah)
setInterval(animateTitle, 250)