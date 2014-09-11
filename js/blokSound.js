// JavaScript Document

var Sound = (function () {
	function Sound() {
			this.NewBlock = Object.create(null, {
					connect: {
							value: function (target) {
									this.output.connect(target);
							}
					},
					disconnect: {
							value: function (target) {
									this.output.disconnect(target);
							}
					}
			});
			this.context = new AudioContext();
	}
	Sound.prototype.playNote = function (options) {
			var defaultOptions = {
					frequency: 440,
					oscType: 'sine',
					envelope: [0, 0.5, 0, 0.1],
					volume: 0.2,
					output: this.context.destination
			};

			if (typeof options == 'object') {
					options = $.extend(defaultOptions, options);
			} else {
					options = defaultOptions;
			}

			var oscillator = this.context.createOscillator();
			var gainNode = this.context.createGain();

			oscillator.type = options.oscType;
			oscillator.frequency.value = options.frequency;
			gainNode.gain.value = options.volume;

			oscillator.connect(gainNode);
			gainNode.connect(options.output);

			var attack = options.envelope[0], sustain = options.envelope[1], decay = options.envelope[2], release = options.envelope[3], now = this.context.currentTime;

			gainNode.gain.cancelScheduledValues(now);
			gainNode.gain.setValueAtTime(0, now);
			gainNode.gain.linearRampToValueAtTime(options.volume, now + attack);

			gainNode.gain.linearRampToValueAtTime(0, now + attack + sustain + decay + release);

			oscillator.start(0);

			setTimeout(function () {
					oscillator.disconnect();
			}, (attack + sustain + decay + release) * 1500);
	};

	Sound.prototype.Filter = function (options) {
			var defaultOptions = {
					frequency: {
							value: 800,
							min: 20,
							max: 22050,
							modifiable: true
					},
					Q: {
							value: 1,
							min: 0.001,
							max: 100,
							modifiable: true
					},
					gain: {
							value: 0,
							min: -40,
							max: 40,
							modifiable: true
					},
					filterType: {
							value: 1,
							min: 0,
							max: 7,
							modifiable: false
					},
					output: this.context.destination
			};

			// if (typeof options == 'object') {
			// 		options = $.extend(defaultOptions, options);
			// } else {
			// 		options = defaultOptions;
			// }
	};
	return Sound;
})();