// JavaScript Document

// NEW SOUND CONTEXT
var Sound = new Sound();

function particleCollision(comp) {

	// PLAY NOTE
	Sound.playNote({
		// CUSTOM OPTIONS
		frequency: 640,
		oscType: 'square',
		envelope: [0, 0.5, 0, 0.1],
		volume: 0.2,
	});

}