const startStop = document.getElementById("start_stop");
const reset = document.getElementById("reset");
const breakLength = document.getElementById("break-length");
const sessionLength = document.getElementById("session-length");
const timeLeft = document.getElementById("time-left");
const timeLeftTab = document.getElementById("title-tab");
const breakInc = document.getElementById("break-increment");
const breakDec = document.getElementById("break-decrement");
const sessionInc = document.getElementById("session-increment");
const sessionDec = document.getElementById("session-decrement");
const incrementButtons = [sessionInc, sessionDec, breakInc, breakDec];
const timerLabel = document.getElementById("timer-label");
const beep = document.getElementById("beep");
const body = document.getElementById("body");
let timerIsRunning = false;
let onBreak = false;
let time = sessionLength.innerHTML * 60;
let time2 = 25 * 60;

///////adjust to account for setInterval's drift//////////
///// taken from: https://www.reddit.com/r/learnjavascript/comments/3aqtzf/issue_with_setinterval_function_losing_accuracy/ /////
///// posted by user: birjolaxew

function customSetInterval(func, time) {
  var lastTime = Date.now(),
    lastDelay = time,
    outp = {};

  function tick() {
    func();

    var now = Date.now(),
      dTime = now - lastTime;

    lastTime = now;
    lastDelay = time + lastDelay - dTime;
    outp.id = setTimeout(tick, lastDelay);
  }
  outp.id = setTimeout(tick, time);

  return outp;
}

//////////////////////////////////////////////////////////

//increment/decrement buttons
const updateTimeLeft = () => {
  let breakTime = breakLength.innerHTML;
  let sessionTime = sessionLength.innerHTML;
  if (onBreak) {
    timeLeft.innerHTML = `${breakTime < 10 ? "0" + breakTime : breakTime}:00`;
    timeLeftTab.innerHTML = `${
      breakTime < 10 ? "0" + breakTime : breakTime
    }:00 Break`;
    time = breakLength.innerHTML * 60;
  } else {
    timeLeft.innerHTML = `${
      sessionTime < 10 ? "0" + sessionTime : sessionTime
    }:00`;
    timeLeftTab.innerHTML = `${
      sessionTime < 10 ? "0" + sessionTime : sessionTime
    }:00 Focus`;
    time = sessionLength.innerHTML * 60;
  }
};

//increment and decrement button functionality (refactored)
incrementButtons.map((button) => {
  let breakOrSession = button.id.includes("session") ? "session" : "break";
  let plusMinus = button.id.includes("increment") ? "++" : "--";
  button.addEventListener("click", () => {
    let length = breakOrSession + "Length" + ".innerHTML";
    let inputTime = eval(`${length}`);
    if (inputTime > 1 && inputTime < 60) {
      eval(`${length}${plusMinus}`);
      updateTimeLeft();
    } else if (inputTime == 1 && button.id.includes("increment")) {
      eval(`${length}++`);
      updateTimeLeft();
    } else if (inputTime == 60 && button.id.includes("decrement")) {
      eval(`${length}--`);
      updateTimeLeft();
    }
  });
});
//change background color
let changeBackgroundColor = () => {
  if (onBreak) {
    body.classList.add("bg-danger");
    body.classList.remove("bg-info");
  } else {
    body.classList.add("bg-info");
    body.classList.remove("bg-danger");
  }
};
//set timer label
let setTimerLabel = () => {
  onBreak
    ? (timerLabel.innerHTML = "Break")
    : (timerLabel.innerHTML = "Session");
};
// set remaining time
let setRemainingTime = () => {
  time = onBreak
    ? breakLength.innerHTML * 60 + 1
    : sessionLength.innerHTML * 60 + 1;
};
//decrement time by one second
let decrementTimeByOneSecond = () => {
  time--;
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timeLeft.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
  timeLeftTab.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  } ${onBreak ? "Break" : "Focus"}`;
};

//decrements total time by one second
let updateTime = () => {
  if (time == 0) {
    onBreak = !onBreak;
    setTimerLabel();
    setRemainingTime();
    beep.play();
    changeBackgroundColor();
  } else {
    decrementTimeByOneSecond();
  }
};

//handle start stop
startStop.addEventListener("click", () => {
  timerIsRunning = !timerIsRunning;
  if (timerIsRunning) {
    runtimer = customSetInterval(updateTime, 1000);
    startStop.innerHTML = "Stop";
  } else {
    clearInterval(runtimer.id);
    startStop.innerHTML = "Start";
  }
});

///handle reset
reset.addEventListener("click", () => {
  //stop timer
  clearInterval(runtimer.id);
  //breakLength should return 5
  breakLength.innerHTML = 5;
  //sessionLength should return to 25
  sessionLength.innerHTML = 25;
  //timeLeft should reset to default state
  timeLeft.innerHTML = "25:00";
  timeLeftTab.innerHTML = "25:00" + " Focus";

  //set timer back to off
  timerIsRunning = false;
  startStop.innerHTML = "Start";
  //reset time
  time = sessionLength.innerHTML * 60;
  //reset timer label to Session
  onBreak = false;
  timerLabel.innerHTML = "Session";
  //reset background color
  body.classList.add("bg-info");
  body.classList.remove("bg-danger");
  // pause audio and rewind it
  beep.pause();
  beep.currentTime = 0;
});
