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
coinSfx.volume = 0.2

function clickLinkSfx(event) {
    if(event.type === "auxclick" && event.button !== 1) return
    
    coinSfx.currentTime = 0
    coinSfx.play()
}

const leafVideo = document.getElementById("leaf")
leafVideo.volume = 0.4

function beatLeaf() {
    leafVideo.currentTime = 0
    leafVideo.play()
}

const moeCounter = document.getElementById("moeCounter")

const birthday = new Date(2008,2,7,0,0)
const today = Date.now()
const daysWithoutSex = String(Math.floor((today - birthday) / (1000*60*60*24))).split("")

daysWithoutSex.forEach((digit) => {
    let newDigit = document.createElement("img")
    newDigit.src = `assets/digits/${digit}.gif`
    newDigit.alt = digit

    moeCounter.appendChild(newDigit)
})

const dontTouchButton = document.getElementById("dontTouch")
const screamerDiv = document.getElementById("screamer")
const screamerVideo = document.getElementById("screamerVideo")

function activeScreamer() {
    screamerDiv.classList.add("active")
    screamerVideo.play()
    setTimeout(() => {location.replace("https://www.youtube.com/watch?v=h-o2tbJ2zyc")}, 2000)
    screamerDiv.requestFullscreen?.()
}

const sandFrames = [
			"⠁",
			"⠂",
			"⠄",
			"⡀",
			"⡈",
			"⡐",
			"⡠",
			"⣀",
			"⣁",
			"⣂",
			"⣄",
			"⣌",
			"⣔",
			"⣤",
			"⣥",
			"⣦",
			"⣮",
			"⣶",
			"⣷",
			"⣿",
			"⡿",
			"⠿",
			"⢟",
			"⠟",
			"⡛",
			"⠛",
			"⠫",
			"⢋",
			"⠋",
			"⠍",
			"⡉",
			"⠉",
			"⠑",
			"⠡",
			"⢁"
		]
let sandCounter = 0
const sandSpan = document.getElementById("sand")

function sandAnimate() {
    sandSpan.textContent = sandFrames[sandCounter]

    if (sandCounter == sandFrames.length - 1) {
        sandCounter = 0
        
    }
    else {
        sandCounter++
    }

    setTimeout(sandAnimate, 120)
}


linksList.forEach((link) => {link.addEventListener("click", clickLinkSfx)})
linksList.forEach((link) => {link.addEventListener("auxclick", clickLinkSfx)})

rikaElement.addEventListener("click", nipah)

leafVideo.addEventListener("click", beatLeaf)
leafVideo.addEventListener("ended",() => {leafVideo.currentTime = 0})

dontTouchButton.addEventListener("click", activeScreamer)

setTimeout(sandAnimate, 120)

setInterval(animateTitle, 250)