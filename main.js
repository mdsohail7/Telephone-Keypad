var longpress = 2500; // holds the start time
var start;
var long_press = false;
var buttonVal;

//Long Press Logic
jQuery(".btn").on("mousedown", function (e) {
  long_press = false;
  start = new Date().getTime();
});

jQuery(".btn").on("mouseleave", function (e) {
  start = 0;
});

jQuery(".btn").on("mouseup", function (e) {
  if (new Date().getTime() >= start + longpress) {
    long_press = true;
  }
});

//Keypad Values Object
var values = {
  1: [".", ",", "!"],
  2: ["a", "b", "c"],
  3: ["d", "e", "f"],
  4: ["g", "h", "i"],
  5: ["j", "k", "l"],
  6: ["m", "n", "o"],
  7: ["p", "q", "r", "s"],
  8: ["t", "u", "v"],
  9: ["w", "x", "y", "z"],
  10: [0],
  11: ["*"],
  12: ["#"],
};

//Some global Variables
var output = "";
var finalOutput = "";
var resultTimeout = 1125;
var lastOutput = "";

//Onclick Function
function pressed(buttonId) {
  buttonVal = parseInt(buttonId.slice(3));

  if (long_press) {
    output = buttonVal;
    long_press = false;
    document.getElementById("screen").value = finalOutput + output;
    lastOutput = finalOutput + output;
  }
  setOutput();
}
//Function for setting up final resul
function setOutput() {
  setTimeout(function () {
    finalOutput = lastOutput;
    clearTimeout(keyPressTimeout);
    timeout = 0;
  }, resultTimeout);
}

// Main function to process No. of Clicks and to set corresponding value
function process(evt) {
  {
    timeout = 750;

    keyPressTimeout = setTimeout(function () {
      if (evt.detail === 1 && long_press == true) {
        output = buttonVal;
        long_press = false;
      } else if (evt.detail === 1 && long_press == false) {
        if (buttonVal == 0) {
          output = "";
          finalOutput = "";
        } else if (buttonVal == "*") {
          output = values[buttonVal][0];
        } else if (buttonVal == "#") {
          output = values[buttonVal][0];
        } else {
          output = values[buttonVal][0];
        }
      } else if (evt.detail === 2) {
        output = values[buttonVal][1];
      } else if (evt.detail === 3) {
        output = values[buttonVal][2];
      } else if (evt.detail === 4 && (buttonVal == 7 || buttonVal == 9)) {
        output = values[buttonVal][3];
      } else if (evt.detail >= 4) {
        output = values[buttonVal][evt.detail % (values[buttonVal].length - 1)];
      }
      document.getElementById("screen").value = finalOutput + output;
      lastOutput = finalOutput + output;
    }, timeout);
  }
}

const keyButtons = document.querySelectorAll(".btn");
//Setting addEventListner to each button
keyButtons.forEach((el) => el.addEventListener("mousedown", process));
