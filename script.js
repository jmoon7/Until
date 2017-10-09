'use strict';

window.onload = function() {
	window.Until = new Until();
};

function Until() {

	this.transitionShort = 300;
	this.transitionLong = 900;
	this.settingsClicked = false;
	this.backgroundClicked = false;
	this.countdown;
	this.tempName, this.tempDate;

	this.bgKey = localStorage.getItem('bgKey');
	this.bgOptions = {
		'color1': {'type': 'color', 'value': '#35ead5, #3493e5'},
		'color2': {'type': 'color', 'value': '#f44292, #f45641'},
		'color3': {'type': 'color', 'value': '#f47641, #ebf441'},
		'image1': {'type': 'image', 'value': 'image0.jpeg'},
		'image2': {'type': 'image', 'value': 'image1.jpeg'}
	};

	this.container = document.getElementById('container');
	this.introName = document.getElementById('introName');
	this.formName = document.getElementById('formName');
	this.inputName = document.getElementById('inputName');
	this.introDate = document.getElementById('introDate');
	this.formDate = document.getElementById('formDate');
	this.inputDate = document.getElementById('inputDate');
	this.main = document.getElementById('main');
	this.mainDate = document.getElementById('mainDate');
	this.mainName = document.getElementById('mainName');
	this.settings = document.getElementById('settings');
	this.settingsOption = document.getElementById('settingsOption');
	this.settingsButton = document.getElementById('settingsButton');
	this.settingsOptionCountdown = document.getElementById('newCountdown');
	this.settingsOptionBackground = document.getElementById('background');
	this.backgroundOptions = document.getElementById('backgroundOptions');
	this.backgroundOptionsList = document.getElementById('backgroundOptionsList');
	this.backgroundExit = document.getElementById('backgroundExit');
	this.whiteOverlay = document.getElementById('whiteOverlay');

	this.submitName = this.submitName.bind(this);
	this.handleInputDate = this.handleInputDate.bind(this);
	this.settingsClick = this.settingsClick.bind(this);
	this.newCountdown = this.newCountdown.bind(this);
	this.background = this.background.bind(this);
	this.buildBackgroundOptions = this.buildBackgroundOptions.bind(this);
	this.loadImage = this.loadImage.bind(this);

	// Add buttons with listeners for background options
	this.buildBackgroundOptions();

	// Retrieve and set background
	if (this.bgKey !== null) {
		var entry = this.bgOptions[this.bgKey];
		this.loadImage(entry);
	} else {
		this.bgKey = 'color1';
		localStorage.setItem('bgKey', 'color1');
	}

	// Initialize or create a new countdown
	if (localStorage.getItem('initialized') === 'true') {
		this.initialize();
	} else {
		Velocity(introName, { opacity: 1, translateY: '-10px' }, { duration: this.transitionLong });
		this.formName.addEventListener('submit', this.submitName);
	}
}

Until.prototype.submitName = function(event) {
	event.preventDefault();
	this.tempName = this.inputName.value;

	Velocity(this.introName, { opacity: 0 }, { duration: this.transitionShort });
	setTimeout(function() {
		this.introName.style.display = 'none';
		this.formName.reset();
		this.formName.removeEventListener('submit', this.submitName);
	}, this.transitionShort);

	this.introDate.style.display = 'block';
	Velocity(this.introDate, { opacity: 1, translateY: '-10px' }, { duration: this.transitionLong });
	this.inputDate.addEventListener('keypress', this.handleInputDate);
}

Until.prototype.handleInputDate = function(e) {
	if (e.which === 13) {
		if (Date.now() > new Date(this.inputDate.value)) {
			alert("Date must be after today.");
		} else if (new Date(this.inputDate.value) > new Date('9999-12-31')) {
			alert("Ok, but by this time you might not exist. Let's wait for something... closer :)");
		} else {
			this.tempDate = inputDate.value;
			this.submitDate();
		}
	}
}

Until.prototype.submitDate = function() {
	Velocity(this.introDate, { opacity: 0 }, { duration: this.transitionShort });
	setTimeout(function() {
		this.introDate.style.display = 'none';
		this.formDate.reset();
		this.inputDate.removeEventListener('keypress', this.handleInputDate);
	}.bind(this), this.transitionShort);

	localStorage.setItem('name', this.tempName);
	localStorage.setItem('date', this.tempDate);
	localStorage.setItem('initialized', true);

	this.initialize();
}

Until.prototype.initialize = function() {
	var name = localStorage.getItem('name');
	var date = localStorage.getItem('date');

	this.mainName.textContent = name;

	// Initialize the first second immediately
	this.mainDate.textContent = this.counter(date);

	// Then every 1 second
	this.countdown = setInterval(function() {
		this.mainDate.textContent = this.counter(date);
	}.bind(this), 1000);

	this.main.style.display = 'block';
	this.settings.style.display = 'block';
	Velocity(this.main, { opacity: 1, translateY: '-10px' }, { duration: this.transitionLong });
	Velocity(this.settings, { opacity: 1, translateY: '-10px' }, { duration: this.transitionLong });

	this.settingsButton.addEventListener('click', this.settingsClick);
	this.settingsOptionCountdown.addEventListener('click', this.newCountdown);
	this.settingsOptionBackground.addEventListener('click', this.background);
}

Until.prototype.settingsClick = function() {
	if (this.settingsClicked === true) {
		this.settingsClicked = false;
		Velocity(this.settingsOption, { opacity: 0, translateY: '10px' }, { duration: this.transitionShort });
		setTimeout(function() { this.settingsOption.style.display = 'none'; }.bind(this), this.transitionShort);
	} else {
		this.settingsClicked = true;
		this.settingsOption.style.display = 'block';
		this.formName.addEventListener('submit', this.submitName);
		Velocity(this.settingsOption, { opacity: 1, translateY: '-10px' }, { duration: this.transitionShort });
	}
}

Until.prototype.newCountdown = function() {
	this.settingsButton.removeEventListener('click', this.settingsClick);
	this.settingsOptionCountdown.removeEventListener('click', this.newCountdown);
	this.settingsClicked = false;

	Velocity(this.settingsOption, { opacity: 0, translateY: '10px' }, { duration: this.transitionShort });
	Velocity(this.main, { opacity: 0, translateY: '10px' }, { duration: this.transitionShort });
	Velocity(this.settings, { opacity: 0, translateY: '10px' }, { duration: this.transitionShort });
	setTimeout(function() {
		this.main.style.display = 'none';
		this.settings.style.display = 'none';
		this.settingsOption.style.display = 'none';
		clearInterval(this.countdown);
	}.bind(this), this.transitionShort);

	this.introName.style.display = 'block';
	Velocity(this.introName, { opacity: 1, translateY: '-10px' }, { duration: this.transitionLong });
}

Until.prototype.background = function() {
	if (this.backgroundClicked === true) {
		this.backgroundClicked = false;
		Velocity(this.backgroundOptions, { opacity: 0 }, { duration: this.transitionShort });
		setTimeout(function() { this.backgroundOptions.style.display = 'none'; }.bind(this), this.transitionShort);
	} else {
		this.settingsClick()
		this.backgroundClicked = true;
		this.backgroundOptions.style.display = 'block';
		this.backgroundExit.addEventListener('click', this.background);
		Velocity(this.backgroundOptions, { opacity: 1 }, { duration: this.transitionShort });
	}
}

Until.prototype.buildBackgroundOptions = function() {
	var backgroundOptionsListHtml = ''
	for (var key in this.bgOptions) {
		backgroundOptionsListHtml += '<button class="input buttonInput" id="' + key + '">' + key + '</button>';
	}
	this.backgroundOptionsList.innerHTML = backgroundOptionsListHtml;
	for (var key in this.bgOptions) {
		(function(key, dict, container) {
			document.getElementById(key).addEventListener('click', function() {
				localStorage.setItem('bgKey', key);
				var entry = dict[key];
				if (entry.type == 'color') {
					container.style.background = 'linear-gradient(45deg, ' + entry.value + ')';
				} else if (entry.type == 'image') {
					container.style.backgroundImage = 'url(' + entry.value + ')';
					container.style.backgroundSize = 'cover';
				}
			});
		}(key, this.bgOptions, this.container));
	}
}

Until.prototype.counter = function(date) {
	// Locale conversion
	var localeConvertedDate = new Date(date).getTime() + new Date().getTimezoneOffset() * 60 * 1000;
	var diff = localeConvertedDate - Date.now();
	if (diff <= 0) {
		return "The time has come!"
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
}

Until.prototype.loadImage = function(entry) {
	if (entry.type == 'image') {
		var img = new Image();
		img.onload = function() {
			this.container.style.backgroundImage = 'url(' + entry.value + ')';
			this.container.style.backgroundSize = 'cover';
			Velocity(this.whiteOverlay, { opacity: 0 }, { duration: this.transitionLong });
			setTimeout(function() {
				this.whiteOverlay.style.display = 'none';
			}, this.transitionLong);
		}.bind(this);
		img.src = entry.value;
	} else if (entry.type = 'color') {
		this.container.style.background = 'linear-gradient(45deg, ' + entry.value + ')';
		Velocity(this.whiteOverlay, { opacity: 0 }, { duration: this.transitionLong });
		setTimeout(function() {
			this.whiteOverlay.style.display = 'none';
		}, this.transitionLong);
	}
}
