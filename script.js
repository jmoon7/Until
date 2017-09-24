'use strict';

window.onload = function() {
	window.Until = new Until();
};

function Until() {

	this.transitionShort = 300;
	this.transitionLong = 900;
	this.settingsClicked = false;
	this.countdown;
	this.tempName, this.tempDate;
	this.bgColors = ['#35ead5, #3493e5', '#f44292, #f45641', '#f47641, #ebf441'];
	this.bgImages = [
		'image0.jpeg',
		'image1.jpeg',
	];
	this.bgSwitch;
	this.bgColorIndex;
	this.bgImageIndex;

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
	this.settingsOptionBackgroundColor = document.getElementById('backgroundColor');
	this.settingsOptionBackgroundImage = document.getElementById('backgroundImage');

	this.submitName = this.submitName.bind(this);
	this.handleInputDate = this.handleInputDate.bind(this);
	this.settingsClick = this.settingsClick.bind(this);
	this.newCountdown = this.newCountdown.bind(this);
	this.backgroundColor = this.backgroundColor.bind(this);
	this.backgroundImage = this.backgroundImage.bind(this);

	var localBgSwitch = localStorage.getItem('bgSwitch');
	if (localBgSwitch !== null) {
		this.bgImageIndex = parseInt(localStorage.getItem('bgImageIndex'));
		this.bgColorIndex = parseInt(localStorage.getItem('bgColorIndex'));
		if (localBgSwitch == 'image') {
			this.container.style.backgroundImage = 'url(' + this.bgImages[this.bgImageIndex] + ')';
			this.container.style.backgroundSize = 'cover';
		} else if (localBgSwitch = 'color') {
			this.container.style.background = 'linear-gradient(45deg, ' + this.bgColors[this.bgColorIndex] + ')';
		}
	} else {
		this.bgColorIndex = 0;
		this.bgImageIndex = 0;
		this.bgSwitch = 'image';
		localStorage.setItem('bgColorIndex', 0);
		localStorage.setItem('bgImageIndex', 0);
		localStorage.setItem('bgSwitch', 'image');
	}

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
	this.settingsOptionBackgroundColor.addEventListener('click', this.backgroundColor);
	this.settingsOptionBackgroundImage.addEventListener('click', this.backgroundImage);
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

Until.prototype.backgroundColor = function() {
	this.bgColorIndex = (this.bgColorIndex + 1) % this.bgColors.length;
	localStorage.setItem('bgSwitch', 'color');
	localStorage.setItem('bgColorIndex', this.bgColorIndex);
	this.container.style.background = 'linear-gradient(45deg, ' + this.bgColors[this.bgColorIndex] + ')';
}

Until.prototype.backgroundImage = function() {
	this.bgImageIndex = (this.bgImageIndex + 1) % this.bgImages.length;
	localStorage.setItem('bgSwitch', 'image');
	localStorage.setItem('bgImageIndex', this.bgImageIndex);
	this.container.style.backgroundImage = 'url(' + this.bgImages[this.bgImageIndex] + ')';
	this.container.style.backgroundSize = 'cover';

}
