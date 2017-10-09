'use strict';

function NewCountdown() {
	this.tempName, this.tempDate;

	this.introName = document.getElementById('introName');
	this.formName = document.getElementById('formName');
	this.inputName = document.getElementById('inputName');
	this.introDate = document.getElementById('introDate');
	this.formDate = document.getElementById('formDate');
	this.inputDate = document.getElementById('inputDate');

	this.submitName = this.submitName.bind(this);
	this.handleInputDate = this.handleInputDate.bind(this);
}

NewCountdown.prototype.initialize = function() {
	this.introName.style.display = 'block';
	Velocity(introName, { opacity: 1, translateY: '-10px' }, { duration: transitionLong });
	this.formName.addEventListener('submit', this.submitName);
}

NewCountdown.prototype.submitName = function(event) {
	event.preventDefault();
	this.tempName = this.inputName.value;

	Velocity(this.introName, { opacity: 0 }, { duration: transitionShort });
	setTimeout(function() {
		this.introName.style.display = 'none';
		this.formName.reset();
		this.formName.removeEventListener('submit', this.submitName);
	}, transitionShort);

	this.introDate.style.display = 'block';
	Velocity(this.introDate, { opacity: 1, translateY: '-10px' }, { duration: transitionLong });
	this.inputDate.addEventListener('keypress', this.handleInputDate);
}

NewCountdown.prototype.handleInputDate = function(e) {
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

NewCountdown.prototype.submitDate = function() {
	Velocity(this.introDate, { opacity: 0 }, { duration: transitionShort });
	setTimeout(function() {
		this.introDate.style.display = 'none';
		this.formDate.reset();
		this.inputDate.removeEventListener('keypress', this.handleInputDate);
	}.bind(this), transitionShort);

	localStorage.setItem('name', this.tempName);
	localStorage.setItem('date', this.tempDate);
	localStorage.setItem('initialized', true);

	Until.initialize();
}
