'use strict';

function Settings() {
	this.settingsClicked = false;

	this.main = document.getElementById('main');
	this.settings = document.getElementById('settings');
	this.settingsOption = document.getElementById('settingsOption');
	this.settingsButton = document.getElementById('settingsButton');
	this.settingsOptionCountdown = document.getElementById('newCountdown');
	this.settingsOptionBackground = document.getElementById('background');

	this.initialize = this.initialize.bind(this);
	this.click = this.click.bind(this);
	this.settingsNewCountdown = this.settingsNewCountdown.bind(this);
	this.settingsBackground = this.settingsBackground.bind(this);
}

Settings.prototype.initialize = function() {
	this.settings.style.display = 'block';
	Velocity(this.settings, { opacity: 1, translateY: '-10px' }, { duration: transitionLong });

	this.settingsButton.addEventListener('click', this.click);
	this.settingsOptionCountdown.addEventListener('click', this.settingsNewCountdown);
	this.settingsOptionBackground.addEventListener('click', this.settingsBackground);
}

Settings.prototype.click = function() {
	if (this.settingsClicked === true) {
		this.settingsClicked = false;
		Velocity(this.settingsOption, { opacity: 0, translateY: '10px' }, { duration: transitionShort });
		setTimeout(function() { this.settingsOption.style.display = 'none'; }.bind(this), transitionShort);
	} else {
		this.settingsClicked = true;
		this.settingsOption.style.display = 'block';
		Velocity(this.settingsOption, { opacity: 1, translateY: '-10px' }, { duration: transitionShort });
	}
}

Settings.prototype.settingsNewCountdown = function() {
	this.settingsButton.removeEventListener('click', this.click);
	this.settingsOptionCountdown.removeEventListener('click', this.settingsNewCountdown);
	this.settingsClicked = false;

	Velocity(this.settingsOption, { opacity: 0, translateY: '10px' }, { duration: transitionShort });
	Velocity(this.main, { opacity: 0, translateY: '10px' }, { duration: transitionShort });
	Velocity(this.settings, { opacity: 0, translateY: '10px' }, { duration: transitionShort });
	setTimeout(function() {
		this.main.style.display = 'none';
		this.settings.style.display = 'none';
		this.settingsOption.style.display = 'none';
		Until.clearCountdown();
	}.bind(this), transitionShort);

	Until.newCountdown();
}

Settings.prototype.settingsBackground = function() {
	Until.Background.click();
	this.click()
}
