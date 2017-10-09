'use strict';

function Background() {

	this.backgroundClicked = false;

	this.container = document.getElementById('container');
	this.backgroundOptions = document.getElementById('backgroundOptions');
	this.backgroundOptionsList = document.getElementById('backgroundOptionsList');
	this.backgroundExit = document.getElementById('backgroundExit');
	this.whiteOverlay = document.getElementById('whiteOverlay');

	this.initialize = this.initialize.bind(this);
	this.click = this.click.bind(this);
	this.backgroundExit.addEventListener('click', this.click);
	this.loadImage = this.loadImage.bind(this);

	this.initialize();
}

Background.prototype.initialize = function() {
	var backgroundOptionsListHtml = '';
	var firstImg = false;
	for (var key in bgOptions) {
		if (bgOptions[key].type == "image" && firstImg == false) {
			firstImg = true;
			backgroundOptionsListHtml += '<br/>';
		}
		backgroundOptionsListHtml += '<button class="input buttonInput bgOption" id="' + key + '">' + key + '</button>';
	}
	this.backgroundOptionsList.innerHTML = backgroundOptionsListHtml;
	for (var key in bgOptions) {
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
		}(key, bgOptions, this.container));
	}
}

Background.prototype.click = function() {
	if (this.backgroundClicked === true) {
		this.backgroundClicked = false;
		Velocity(this.backgroundOptions, { opacity: 0 }, { duration: transitionShort });
		setTimeout(function() { this.backgroundOptions.style.display = 'none'; }.bind(this), transitionShort);
	} else {
		this.backgroundClicked = true;
		this.backgroundOptions.style.display = 'block';
		Velocity(this.backgroundOptions, { opacity: 1 }, { duration: transitionShort });
	}
}

Background.prototype.loadImage = function(entry) {
	if (entry.type == 'image') {
		var img = new Image();
		img.onload = function() {
			this.container.style.backgroundImage = 'url(' + entry.value + ')';
			this.container.style.backgroundSize = 'cover';
			Velocity(this.whiteOverlay, { opacity: 0 }, { duration: transitionLong });
			setTimeout(function() {
				this.whiteOverlay.style.display = 'none';
			}, transitionLong);
		}.bind(this);
		img.src = entry.value;
	} else if (entry.type = 'color') {
		this.container.style.background = 'linear-gradient(45deg, ' + entry.value + ')';
		Velocity(this.whiteOverlay, { opacity: 0 }, { duration: transitionLong });
		setTimeout(function() {
			this.whiteOverlay.style.display = 'none';
		}, transitionLong);
	}
}
