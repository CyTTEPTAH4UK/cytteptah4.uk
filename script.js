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

function copyLinkText(event) {
    if (event.type === "auxclick" && event.button !== 1) return
    
    const link = event.currentTarget
    const text = link.dataset.copy
    const note = link.parentElement.querySelector(".copied")
    navigator.clipboard.writeText(text)
    .then(() => { 
        note.textContent = `copied ${text}!`
        note.classList.add("show")
        clearTimeout(note.linkTimer)
        note.linkTimer = setTimeout(() => note.classList.remove("show"), 4000)
    })
    .catch(console.warn)
}


const leafVideo = document.getElementById("leaf")
leafVideo.volume = 0.4
const cursorSfx = new Audio("assets/cursor.mp3")
cursorSfx.volume = 0.02

function playCursorSfx() {
    cursorSfx.currentTime = 0
    cursorSfx.play().catch((err) => console.warn(err))
}

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

const lightbox = document.getElementById("lightbox")
const lightboxImg = document.getElementById("lightboxImg")
const photos = document.querySelector(".photos")
let lastPhoto = null

photos.querySelectorAll("img").forEach((img) => {
    img.tabIndex = 0
    img.setAttribute("role", "button")
})

function getImageLightbox(e) {
    if(e.target.tagName !== "IMG") {
        return
    }
    openLightbox(e.target)
}

function getImageLightboxKeyboard(e) {
    if(e.key === " " || e.key === "Enter") {
        e.preventDefault()
        getImageLightbox(e)
    }
}

function openLightbox(img) {
    lightboxImg.removeAttribute("src")
    lightboxImg.src = img.src
    lightboxImg.alt = img.alt
    lightboxImg.decode().catch((err) => console.warn(err)).finally(() => { 
        lightbox.classList.add("active")
        document.body.style.overflow = "hidden"
    })
    lastPhoto = img
}

function closeLightbox() {
    if(!lightbox.classList.contains("active")) return
    lightbox.classList.remove("active")
    document.body.style.overflow = ""
    lastPhoto.focus()
}

function closeLightboxEsc(e) {
    if (e.key === "Escape") {
        closeLightbox()
    }
}

function closeFakeCookies() {
    fakeCookies.close()
    document.body.style.overflow = ""
}

const fakeCookies = document.getElementById("fakeCookies")
const buttons = document.querySelectorAll("#fakeCookies button")

document.body.style.overflow = "hidden"
fakeCookies.addEventListener("cancel", (event) => {event.preventDefault()})
fakeCookies.showModal()
buttons.forEach((button) => {button.addEventListener("click", closeFakeCookies)})

photos.addEventListener("click", getImageLightbox)
photos.addEventListener("keydown", getImageLightboxKeyboard)
lightbox.addEventListener("click", closeLightbox)
document.addEventListener("keydown", closeLightboxEsc)

linksList.forEach((link) => {link.addEventListener("click", clickLinkSfx)})
linksList.forEach((link) => {link.addEventListener("auxclick", clickLinkSfx)})
linksList.forEach((link) => { link.addEventListener("click", copyLinkText) })
linksList.forEach((link) => { link.addEventListener("auxclick", copyLinkText) })


rikaElement.addEventListener("click", nipah)

leafVideo.addEventListener("click", beatLeaf)
leafVideo.addEventListener("ended",() => {leafVideo.currentTime = 0})
leafVideo.addEventListener("mouseenter", playCursorSfx)

dontTouchButton.addEventListener("click", activeScreamer)
dontTouchButton.addEventListener("mouseenter", playCursorSfx)

setTimeout(sandAnimate, 120)

setInterval(animateTitle, 250)