"use strict";

function Background() {
  this.backgroundClicked = false;

  this.container = document.getElementById("container");
  this.backgroundOptions = document.getElementById("backgroundOptions");
  this.backgroundOptionsList = document.getElementById("backgroundOptionsList");
  this.backgroundExit = document.getElementById("backgroundExit");
  this.whiteOverlay = document.getElementById("whiteOverlay");

  this.initialize = this.initialize.bind(this);
  this.click = this.click.bind(this);
  this.backgroundExit.addEventListener("click", this.click);
  this.loadImage = this.loadImage.bind(this);
  this.uploadFile = this.uploadFile.bind(this);

  this.initialize();
}

Background.prototype.initialize = function() {
  var backgroundOptionsListHtml = "";
  var firstImg = false;
  for (var key in bgOptions) {
    if (bgOptions[key].type == "image" && firstImg == false) {
      firstImg = true;
      backgroundOptionsListHtml += "<br/>";
    }
    backgroundOptionsListHtml +=
      '<span class="bgOption">' +
      '<button class="input buttonInput" id="' +
      key +
      '">' +
      '<div class="bgOptionThumb" id="' +
      key +
      "Thumb" +
      '"> </div>' +
      key +
      "</button>" +
      "</span>";
  }
  this.backgroundOptionsList.innerHTML = backgroundOptionsListHtml;
  for (var key in bgOptions) {
    (function(key, dict, container) {
      document.getElementById(key).addEventListener("click", function() {
        localStorage.setItem("bgKey", key);
        var entry = dict[key];
        if (entry.type == "color") {
          container.style.background =
            "linear-gradient(45deg, " + entry.value + ")";
        } else if (entry.type == "image") {
          container.style.backgroundImage = "url(" + entry.value + ")";
          container.style.backgroundSize = "cover";
        }
      });
    })(key, bgOptions, this.container);
  }
  for (var key in bgOptions) {
    var entry = bgOptions[key];
    if (entry.type === "color") {
      document.getElementById(key + "Thumb").style.backgroundColor =
        entry.thumb;
    }
    if (entry.type === "image") {
      document.getElementById(key + "Thumb").style.backgroundImage =
        "url(" + entry.thumb + ")";
    }
  }
  this.backgroundOptionsList.appendChild(document.createElement("BR"));
  var fileChild = document.createElement("INPUT");
  fileChild.id = "myFile";
  fileChild.type = "file";
  fileChild.onchange = this.uploadFile;
  this.backgroundOptionsList.appendChild(
    document.createElement("SPAN").appendChild(fileChild)
  );
};

// From W3schools
Background.prototype.uploadFile = function(event) {
  var fileImage = event.target.files[0];
  var reader = new FileReader();

  reader.onload = function(file) {
    // TODO: This was supposed to trigger reading the file, saving it into localStorage, then calling loadImage
    var entry = { type: "image", value: file.target.result };
    localStorage.setItem("bgKey", "uploaded");
    localStorage.setItem("uploadedFile", JSON.stringify(entry));
    this.loadImage(entry);
  }.bind(this);
  reader.readAsDataURL(fileImage);
};

Background.prototype.click = function() {
  if (this.backgroundClicked === true) {
    this.backgroundClicked = false;
    Velocity(
      this.backgroundOptions,
      { opacity: 0 },
      { duration: transitionShort }
    );
    setTimeout(
      function() {
        this.backgroundOptions.style.display = "none";
      }.bind(this),
      transitionShort
    );
  } else {
    this.backgroundClicked = true;
    this.backgroundOptions.style.display = "block";
    Velocity(
      this.backgroundOptions,
      { opacity: 1 },
      { duration: transitionShort }
    );
  }
};

Background.prototype.loadImage = function(entry) {
  if (entry.type === "image") {
    var img = new Image();
    img.onload = function() {
      this.container.style.backgroundImage = "url(" + entry.value + ")";
      this.container.style.backgroundSize = "cover";
      Velocity(this.whiteOverlay, { opacity: 0 }, { duration: transitionLong });
      setTimeout(function() {
        this.whiteOverlay.style.display = "none";
      }, transitionLong);
    }.bind(this);
    img.src = entry.value;
  } else if (entry.type === "color") {
    this.container.style.background =
      "linear-gradient(45deg, " + entry.value + ")";
    Velocity(this.whiteOverlay, { opacity: 0 }, { duration: transitionLong });
    setTimeout(function() {
      this.whiteOverlay.style.display = "none";
    }, transitionLong);
  }
};
