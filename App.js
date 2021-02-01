let startStop = document.getElementById("start-stop");
let reset = document.getElementById("reset");
let breakLength = document.getElementById("break-length");
let sessionLength = document.getElementById("session-length");
let timeLeft = document.getElementById("time-left");
let time = sessionLength.innerHTML * 60;

let updateTime = () => {
  time--;
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timeLeft.innerHTML = `${minutes}:${seconds}`;
};

startStop.addEventListener("click", () => {
  setInterval(updateTime, 1000);
});

///handle reset
reset.addEventListener("click", () => {
  //timer should stop

  //breakLength should return 5
  breakLength.innerHTML = 5;
  //sessionLength should return to 25
  sessionLength.innerHTML = 25;

  //timeLeft should reset to default state
  timeLeft.innerHTML = "25:00";
});
