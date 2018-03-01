"use strict";

window.onload = function() {
  window.Until = new Until();
};

var transitionShort = 300;
var transitionLong = 900;
var imagesLength = 3;
var bgOptions = {
  color1: { type: "color", value: "#35ead5, #3493e5", thumb: "#3493e5" },
  color2: { type: "color", value: "#f44292, #f45641", thumb: "#f44292" },
  color3: { type: "color", value: "#f47641, #ebf441", thumb: "#f47641" }
};
for (var i = 0; i < imagesLength; i++) {
  bgOptions["image" + i] = {
    type: "image",
    value: "images/image" + i + ".jpeg",
    thumb: "images/thumb" + i + ".jpg"
  };
}

function Until() {
  this.NewCountdown = new NewCountdown();
  this.Settings = new Settings();
  this.Background = new Background();

  this.countdown;

  this.bgKey = localStorage.getItem("bgKey");

  this.container = document.getElementById("container");
  this.main = document.getElementById("main");
  this.mainDate = document.getElementById("mainDate");
  this.mainName = document.getElementById("mainName");

  this.newCountdown = this.newCountdown.bind(this);
  this.clearCountdown = this.clearCountdown.bind(this);

  var entry;

  // Retrieve and set background
  if (this.bgKey == null) {
    this.bgKey = "color1";
    localStorage.setItem("bgKey", "color1");
  }

  if (this.bgKey == "uploaded") {
    entry = JSON.parse(localStorage.getItem("uploadedFile"));
  } else {
    entry = bgOptions[this.bgKey];
  }
  this.Background.loadImage(entry);

  if (localStorage.getItem("initialized") !== "true") {
    this.newCountdown();
  } else {
    this.initialize();
  }
}

Until.prototype.initialize = function() {
  var name = localStorage.getItem("name");
  var date = localStorage.getItem("date");

  this.mainName.textContent = name;

  // Initialize the first second immediately
  this.mainDate.textContent = this.counter(date);

  // Then every 1 second
  this.countdown = setInterval(
    function() {
      this.mainDate.textContent = this.counter(date);
    }.bind(this),
    1000
  );

  this.main.style.display = "block";
  Velocity(
    this.main,
    { opacity: 1, translateY: "-10px" },
    { duration: transitionLong }
  );
  this.Settings.initialize();
};

Until.prototype.newCountdown = function() {
  this.NewCountdown.initialize();
};

Until.prototype.clearCountdown = function() {
  clearInterval(this.countdown);
};

Until.prototype.counter = function(date) {
  // Locale conversion
  var localeConvertedDate =
    new Date(date).getTime() + new Date().getTimezoneOffset() * 60 * 1000;
  var diff = localeConvertedDate - Date.now();
  if (diff <= 0) {
    return "The time has come!";
  }
  var time = diff / 1000;
  var seconds = Math.floor(time % 60);
  time /= 60;
  var minutes = Math.floor(time % 60);
  time /= 60;
  var hours = Math.floor(time % 24);
  time /= 24;
  var days = Math.floor(time);
  var message = "";
  if (days > 0) {
    message += days + " days ";
  }
  if (hours > 0) {
    message += hours + " hours ";
  }
  if (minutes > 0) {
    message += minutes + " min ";
  }
  message += seconds + " sec";
  return message;
};
