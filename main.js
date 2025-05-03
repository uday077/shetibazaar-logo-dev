// Countdown Timer
let launchDate = new Date("Oct 2, 2025 12:00:00").getTime();

let timer = setInterval(tick, 1000);

function tick () {
  let now = new Date().getTime();
  let t = launchDate - now;

  if (t > 0) {
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    if (days < 10) days = "0" + days;

    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (hours < 10) hours = "0" + hours;

    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
    if (mins < 10) mins = "0" + mins;

    let secs = Math.floor((t % (1000 * 60)) / 1000);
    if (secs < 10) secs = "0" + secs;

    let time = `${days} : ${hours} : ${mins} : ${secs}`;
    document.querySelector('.countdown').innerText = time;
  } else {
    clearInterval(timer);
    document.querySelector('.countdown').innerText = "अब LIVE आहे!";
  }
}

// Background Image Rotator
const images = [
  "background1.jpg",
  "background2.jpg",
  "background3.jpg",
  "background4.jpg"
];

let current = 0;

setInterval(() => {
  current = (current + 1) % images.length;
  document.querySelector("header").style.backgroundImage = `url('${images[current]}')`;
}, 5000); // change every 5 seconds
