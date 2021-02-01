let startStop = document.getElementById("start_stop");
let reset = document.getElementById("reset");
let breakLength = document.getElementById("break-length");
let sessionLength = document.getElementById("session-length");
let timeLeft = document.getElementById("time-left");
let time = sessionLength.innerHTML * 60;
let toggleOnOff = false;
let interval = 0;

let updateTime = () => {
  time--;
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timeLeft.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

//handle start stop
startStop.addEventListener("click", () => {
  toggleOnOff = !toggleOnOff;
  if (toggleOnOff) {
    interval = setInterval(updateTime, 1000);
    startStop.innerHTML = "Stop";
  } else {
    clearInterval(interval);
    startStop.innerHTML = "Start";
  }
});

///handle reset
reset.addEventListener("click", () => {
  //breakLength should return 5
  breakLength.innerHTML = 5;
  //sessionLength should return to 25
  sessionLength.innerHTML = 25;
  //timeLeft should reset to default state
  timeLeft.innerHTML = "25:00";
  //clear interval
  clearInterval(interval);
  //set timer back to off
  toggleOnOff = false;
  startStop.innerHTML = "Start";
  //reset time
  time = sessionLength.innerHTML * 60;
});
