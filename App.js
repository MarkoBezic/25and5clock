let startStop = document.getElementById("start_stop");
let reset = document.getElementById("reset");
let breakLength = document.getElementById("break-length");
let sessionLength = document.getElementById("session-length");
let timeLeft = document.getElementById("time-left");
let breakInc = document.getElementById("break-increment");
let breakDec = document.getElementById("break-decrement");
let sessionInc = document.getElementById("session-increment");
let sessionDec = document.getElementById("session-decrement");
let holdSessionLength = 25;
let holdBreakLength = 5;
let toggleOnOff = false;
let interval = 0;
let onBreak = false;
let time = onBreak ? holdBreakLength * 60 : holdSessionLength * 60;

// let startingMinutes = Math.floor(time / 60);
// let startingSeconds = time % 60;

//increment/decrement buttons
let inputTime = () => {
  if (onBreak) {
    timeLeft.innerHTML = `${breakLength.innerHTML}:00`;
    time = breakLength.innerHTML * 60;
  } else {
    timeLeft.innerHTML = `${sessionLength.innerHTML}:00`;
    time = sessionLength.innerHTML * 60;
  }
};
let storeSessionLength = () => {
  holdSessionLength = sessionLength.innerHTML;
};

breakInc.addEventListener("click", () => {
  breakLength.innerHTML++;
});

breakDec.addEventListener("click", () => {
  breakLength.innerHTML--;
});

sessionInc.addEventListener("click", () => {
  sessionLength.innerHTML++;
  storeSessionLength();
  inputTime();
});

sessionDec.addEventListener("click", () => {
  sessionLength.innerHTML--;
  storeSessionLength();
  inputTime();
});

//decrements total time by one second
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
  breakLength.innerHTML = holdBreakLength;
  //sessionLength should return to 25
  sessionLength.innerHTML = holdSessionLength;
  //timeLeft should reset to default state
  timeLeft.innerHTML = `${holdSessionLength}:00`;
  //clear interval
  clearInterval(interval);
  //set timer back to off
  toggleOnOff = false;
  startStop.innerHTML = "Start";
  //reset time
  time = sessionLength.innerHTML * 60;
});
