const incrementSessionLengthBtn = document.querySelector("#session-increment");
const decrementSessionLengthBtn = document.querySelector("#session-decrement");
const incrementBreakLengthBtn = document.querySelector("#break-increment");
const decrementBreakLengthBtn = document.querySelector("#break-decrement");
const sessionLengthEl = document.querySelector("#session-length");
const breakLengthEl = document.querySelector("#break-length");
const timeLeftEl = document.querySelector("#time-left");

incrementSessionLengthBtn.addEventListener("click", () => {
  sessionLengthEl.innerHTML = Number(sessionLengthEl.innerHTML) + 1;
  timeLeftEl.innerHTML = `${Number(sessionLengthEl.innerHTML)}:00`;
});

decrementSessionLengthBtn.addEventListener("click", () => {
  sessionLengthEl.innerHTML = Number(sessionLengthEl.innerHTML) - 1;
  timeLeftEl.innerHTML = `${Number(sessionLengthEl.innerHTML)}:00`;
});

incrementBreakLengthBtn.addEventListener("click", () => {
  breakLengthEl.innerHTML = Number(breakLengthEl.innerHTML) + 1;
});

decrementBreakLengthBtn.addEventListener("click", () => {
  breakLengthEl.innerHTML = Number(breakLengthEl.innerHTML) - 1;
});

/* OLD VERSION - START FROM SCRACTH DELETE THIS ALL WHEN YOU'RE DONE */

// const startStop = document.getElementById("start_stop");
// const reset = document.getElementById("reset");
// const breakLength = document.getElementById("break-length");
// const sessionLength = document.getElementById("session-length");
// const timeLeft = document.getElementById("time-left");
// const timeLeftTab = document.getElementById("title-tab");
// const breakInc = document.getElementById("break-increment");
// const breakDec = document.getElementById("break-decrement");
// const sessionInc = document.getElementById("session-increment");
// const sessionDec = document.getElementById("session-decrement");
// const incrementButtons = [sessionInc, sessionDec, breakInc, breakDec];
// const timerLabel = document.getElementById("timer-label");
// const beep = document.getElementById("beep");
// let timerIsRunning = false;
// let interval = 0;
// let onBreak = false;
// let time = sessionLength.innerHTML * 60;
// const now = Date.now();
// let endTime;

// console.log(Date.now());

// //increment/decrement buttons
// const updateTimeLeft = () => {
//   let breakTime = breakLength.innerHTML;
//   let sessionTime = sessionLength.innerHTML;
//   if (onBreak) {
//     timeLeft.innerHTML = `${breakTime < 10 ? "0" + breakTime : breakTime}:00`;
//     timeLeftTab.innerHTML = `${
//       breakTime < 10 ? "0" + breakTime : breakTime
//     }:00 Break`;

//     time = breakLength.innerHTML * 60;
//   } else {
//     timeLeft.innerHTML = `${
//       sessionTime < 10 ? "0" + sessionTime : sessionTime
//     }:00`;
//     timeLeftTab.innerHTML = `${
//       sessionTime < 10 ? "0" + sessionTime : sessionTime
//     }:00 Focus`;
//     time = sessionLength.innerHTML * 60;
//   }
// };

// //increment and decrement button functionality (refactored)
// incrementButtons.map((button) => {
//   let breakOrSession = button.id.includes("session") ? "session" : "break";
//   let plusMinus = button.id.includes("increment") ? "++" : "--";
//   button.addEventListener("click", () => {
//     let length = breakOrSession + "Length" + ".innerHTML";
//     let inputTime = eval(`${length}`);
//     if (inputTime > 1 && inputTime < 60) {
//       eval(`${length}${plusMinus}`);
//       updateTimeLeft();
//     } else if (inputTime == 1 && button.id.includes("increment")) {
//       eval(`${length}++`);
//       updateTimeLeft();
//     } else if (inputTime == 60 && button.id.includes("decrement")) {
//       eval(`${length}--`);
//       updateTimeLeft();
//     }
//   });
// });

// //decrements total time by one second
// let updateTime = () => {
//   if (time == 0) {
//     onBreak = !onBreak;
//     onBreak
//       ? (timerLabel.innerHTML = "Break")
//       : (timerLabel.innerHTML = "Session");
//     time = onBreak
//       ? breakLength.innerHTML * 60 + 1
//       : sessionLength.innerHTML * 60 + 1;
//     beep.play();
//   } else {
//     time--;
//     let minutes = Math.floor(time / 60);
//     let seconds = time % 60;
//     timeLeft.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${
//       seconds < 10 ? "0" + seconds : seconds
//     }`;
//     timeLeftTab.innerHTML = `${minutes < 10 ? "0" + minutes : minutes}:${
//       seconds < 10 ? "0" + seconds : seconds
//     } ${onBreak ? "Break" : "Focus"}`;
//   }
// };

// //handle start stop
// startStop.addEventListener("click", () => {
//   timerIsRunning = !timerIsRunning;
//   if (timerIsRunning) {
//     endTime = now + Number();

//     interval = setInterval(updateTime, 1000);
//     startStop.innerHTML = "Stop";
//   } else {
//     clearInterval(interval);
//     startStop.innerHTML = "Start";
//   }
// });

// ///handle reset
// reset.addEventListener("click", () => {
//   //stop timer
//   clearInterval(interval);
//   //breakLength should return 5
//   breakLength.innerHTML = 5;
//   //sessionLength should return to 25
//   sessionLength.innerHTML = 25;
//   //timeLeft should reset to default state
//   timeLeft.innerHTML = "25:00";
//   timeLeftTab.innerHTML = "25:00" + " Focus";

//   //clear interval
//   clearInterval(interval);
//   //set timer back to off
//   toggleOnOff = false;
//   startStop.innerHTML = "Start";
//   //reset time
//   time = sessionLength.innerHTML * 60;
//   //reset timer label to Session
//   onBreak = false;
//   timerLabel.innerHTML = "Session";
//   // pause audio and rewind it
//   beep.pause();
//   beep.currentTime = 0;
// });
