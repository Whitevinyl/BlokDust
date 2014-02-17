// JavaScript Document



// INIT //
var canvasA;
var cxa;
var FPS = 60;

var scene = 0;
var mode = 1; // build/play
var titleIn = 100;
var titleOut = 0;
var titleOutYes = 0;
var introAlpha = 100;


// COLOUR //
var copyColor = "#888";
var bgColor = "#2c243e";
var col = ["#40e6ff","#1add8d","#730081","#fdff4b","#f22a54","#fff","#ff90a7"];


// MEASUREMENT //
var halfX = 0;
var halfY = 0;
var fullX = 0;
var fullY = 0;
var units = 0;
var unitOne = 0;
var headerType = 40;
var menuType = 18;
var midType = 26;
var bodyType = 12;
var dx = 0;
var dy = 0;
var sx = 0;
var sy = 0;
var grd = 30; // GRID SNAP SIZE


// CAMERA //
var camX = 0;
var camY = 0;
var camDestX = 0;
var camDestY = 0;
var camSpeed = 6;
var camSpeedDest = 6;


// ZOOM //
var zoomLevel = 1;
var zoomDest = 1;
var zSpeed = 2;
var zSpeedDest = 2;
var zoomSlot = 4;
var zoomSlots = [0.15, 0.24, 0.39, 0.625, 1, 1.6, 2.56, 4.1];



// ROLLOVER //  - MOST OF THIS CAN GO
var wvOver = false;
var shareOver = false;
var infoOver = false;
var shareA = 0;
var shareState = 1;
var restoreSpeed = 0;
var infoA = 0;
var infoState = 1;

var roll = [false];
var mouseX = 0;
var mouseY = 0;


// COMPONENTS //
var block1 = [];
var block2 = [];
var block3 = [];
var block4 = [];
var block5 = [];
var block6 = [];
var outline = [];


// STAGE DRAGGING //
var stageDrag = false;
var dragX = 0;
var dragY = 0;
var dragOffX = 0;
var dragOffY = 0;
var dragged = 'undefined';





function init() {
	
	////////////// SETUP CANVAS ////////////
	
	canvasA = document.getElementById("layerA");
	keyInput = document.getElementById("keyLayer"); // REFERENCES AN EMPTY DIV TO "FOCUS"
	/*if (BrowserDetect.browser!=="Safari") {
		keyInput.focus();
	}*/
	canvasA.addEventListener("mousedown", getPosition, false);
	canvasA.addEventListener("mouseup", mouseRelease, false);
	canvasA.addEventListener("mousemove", mouseMove, false);
	document.body.addEventListener('touchmove', function(event) {
	  event.preventDefault();
	}, false); 
	
    cxa = canvasA.getContext("2d");
	
	
	// SET CANVAS & DRAWING POSITIONS //
	resize_canvas();
	units = (unitOne*0.06)*zoomLevel;
	
	
	/////////////// COMPONENT SETUP /////////////////
	
	function Component(point,reference) {// COMPONENT CONSTRUCTOR
	  this.position = point || new Vector(0, 0); 
	  this.reference = reference;
	}
	
	outline[0] = new Outline( 6, new Vector(-1,0), new Vector(1,-2), new Vector(2,-1), new Vector(2,0), new Vector(0,2), new Vector(-1,1));
	outline[1] = new Outline( 6, new Vector(-1,0), new Vector(0,-1), new Vector(1,-1), new Vector(2,0), new Vector(1,1), new Vector(0,1));
	outline[2] = new Outline( 4, new Vector(0,-1), new Vector(1,-2), new Vector(1,3), new Vector(0,4));
	outline[3] = new Outline( 5, new Vector(-2,0), new Vector(0,-2), new Vector(2,0), new Vector(1,1),  new Vector(-1,1));
	outline[4] = new Outline( 6, new Vector(-1,0), new Vector(0,-1), new Vector(1,0), new Vector(1,1), new Vector(0,2), new Vector(-1,1));
	outline[5] = new Outline( 6, new Vector(-2,0), new Vector(-1,0), new Vector(0,-1), new Vector(1,0), new Vector(2,0), new Vector(0,2));
	
	
	// TEMP //
	function randPos() { // GEN A RANDOM GRIDDED POSITION
		return position = new Vector(-300 +  Math.round((Math.random()*600)/grd)*grd,-150 + Math.round((Math.random()*300)/grd)*grd);
	}
	
	// FOR TESTING - PLACE RANDOM COMPONENTS
	for (i=0;i<2;i++) {
		
		randPos();
		block1[i] = new Component(position,outline[0]);
		
	}
	for (i=0;i<2;i++) {
		
		randPos();
		block2[i] = new Component(position,outline[1]);
		
	}
	for (i=0;i<2;i++) {
		
		randPos();
		block3[i] = new Component(position,outline[2]);
		
	}
	for (i=0;i<2;i++) {
		
		randPos();
		block4[i] = new Component(position,outline[3]);
		
	}
	for (i=0;i<2;i++) {
		
		randPos();
		block5[i] = new Component(position,outline[4]);
		
	}
	for (i=0;i<1;i++) {
		
		position = new Vector(-Math.round((Math.random()*300)/grd)*grd,-Math.round((Math.random()*150)/grd)*grd);
		block6[i] = new Emitter(position, outline[5], Vector.fromAngle(Math.PI*0.5, 6), 180, 1.5);
		
	}
	
	
	scene = 1; // FINISHED INITALISING, GO TO SCENE 1
	
} // END INIT


////////////////////////////// ON EVERY FRAME CALL THESE FUNCTIONS ///////////////////////////////////
setInterval(function() {
	
	if (scene==1) { // FULLSCREEN CHOICE
		drawBG();
		drawIntro();
	} else if (scene==2) { // TITLE SEQUENCE
		update();
		drawBG();
		drawIntro2();
	} else if (scene==3) { // PRIMARY SCENE
		update();
		drawBG();
		drawScene();
		drawDisplay();
	}
	
	testing(); //DISPLAY TESTED VARIABLES (FUNCTION AT VERY BOTTOM)
	
}, 1000/FPS);

// END INTERVAL



//////////////////////////////////////// UPDATE EVENTS /////////////////////////////////////////////////
function update() {
	
	// ZOOMING //
	zCalc = ((zoomDest-zoomLevel)/100)*zSpeed;
	zoomLevel += zCalc; 
	zSpeed += ((zSpeedDest-zSpeed)/100)*2;
	units = (unitOne*0.06)*zoomLevel; // UPDATE SCALED UNITS
	
	
	// CAMERA POSITION //
	camX += ((camDestX-camX)/100)*camSpeed;
	camY += ((camDestY-camY)/100)*camSpeed;
	camSpeed += ((camSpeedDest-camSpeed)/100)*2;
	dx = halfX + (camX*(unitOne*0.1)); // UPDATE ORIGIN
	dy = halfY + (camY*(unitOne*0.1));
	
	keyInput = document.getElementById("keyLayer");
	keyInput.focus();
	
	
	// DRAG AND DROP //
	if (dragged!=='undefined') {
		dragged.position.x = Math.round(((mouseX-dx)/units)/grd)*grd;
		dragged.position.y = Math.round(((mouseY-dy)/units)/grd)*grd;
	}
	
	
	// PARTICLE ANIMATION //
	addNewParticles();
    plotParticles();
	
	
	// SHARE BOX - SIMPLIFY ME
	if (shareState==2 && shareA<10) {
		shareA += 1;
	} else if (shareState==3) {
		shareA -= 1;
		if (shareA==0) {
			shareState = 1;
		}
	}
	var d = document.getElementById('sharing');
    d.style.opacity = shareA/10;
	d.style.filter = 'alpha(opacity=' + shareA*10 + ')';
	if (shareA==0) {
		d.style.display = 'none';
	}
	
	
	
} /////   END UPDATE 


/////////////////////////////////////// VECTOR FUNCTIONS ///////////////////////////////////////////

// REF for a lot of this stuff: http://html5hub.com/build-a-javascript-particle-system

function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector.prototype.add = function(vector) {
  this.x += vector.x;
  this.y += vector.y;
}
 
Vector.prototype.getMagnitude = function () {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
 
Vector.prototype.getAngle = function () {
  return Math.atan2(this.y,this.x);
};
 
Vector.fromAngle = function (angle, magnitude) {
  //angle = angle*(Math.PI/180);
  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};


////////////////////////////////// PARTICLE FUNCTIONS //////////////////////////////////////////////


function Particle(point, velocity, size, life, acceleration ) { // PARTICLE CONSTRUCTOR
  this.position = point || new Vector(0, 0);
  this.velocity = velocity || new Vector(0, 0);
  this.acceleration = acceleration || new Vector(0, 0);
  this.size = size || 0;
  this.life = life || 500;
}

Particle.prototype.move = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
}


function Emitter(point, reference, velocity, spread, size) { // EMITTER CONSTRUCTOR
  this.position = point; // Vector
  this.reference = reference;
  this.velocity = velocity; // Vector
  this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
  this.size = size || 0;
}

function Outline(vertices,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10) { // OUTLINE CONSTRUCTOR
  this.vertices = vertices || 0;
  this.shape = [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10]; // Array of Vectors
}


Emitter.prototype.emitParticle = function() { // CREATE A PARTICLE
  var angle = this.velocity.getAngle() + (this.spread - (Math.random() * this.spread * 2))*(Math.PI/180);
  var magnitude = this.velocity.getMagnitude();
  var position = new Vector(this.position.x, this.position.y);
  var velocity = Vector.fromAngle(angle, magnitude);
  var size = 1 + Math.random()*this.size;
  return new Particle(position,velocity,size);
}


var particles = [];
var maxParticles = 2000;
var emissionRate = 20;
var emitCount = 0;
 
function addNewParticles() {
  
  if (mode==1 || particles.length > maxParticles) return; // BREAK IF MAX PARTICLES HIT
  emitCount += 1;
  
  if (emitCount==emissionRate) {
	  for (var i = 0; i < block6.length; i++) {
          particles.push(block6[i].emitParticle());
	  
      }
  emitCount = 0;
  }
  
  
}

function plotParticles() {
  var currentParticles = []; // PARTICLE MANAGEMENT ARRAY
 
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
	particle.life -= 1;
 
    if (particle.life<1) continue;
    particle.move();
    currentParticles.push(particle); // UPDATE MANAGEMENT
  }
  particles = currentParticles; // UPDATE ORIGINAL ARRAY
}


	

////////////////////////////////////////////   DRAWING   ////////////////////////////////////////////
////////////////////////////////////////////   _______   ////////////////////////////////////////////



///////  CAMERA  ///////////////

function zoomTo(z,d,s) { // ZOOM
	zSpeed = s;
	zSpeedDest = d;
	zoomDest = z;
}

function camTo(x,y,d,s) { // PAN / DRAG
	camSpeed = s;
	camSpeedDest = d;
	camDestX = x;
	camDestY = y;
}


//////// BACKGROUND ////////////////

function drawBG() {
	
	cxa.globalAlpha = 1;
	cxa.fillStyle = bgColor;
	cxa.fillRect(0,0,fullX,fullY);
	
	
}

/////////////////// MAIN STAGE ///////////////////

function drawScene() {
	
	cxa.strokeStyle = col[5];
	cxa.lineWidth = 1;
	cxa.globalAlpha = 1;
	
	
	
	
	cxa.fillStyle = col[0];
	for (i=0;i<block1.length;i++) {
		cxa.globalAlpha = 1;
		if (block1[i]==dragged) {
			cxa.globalAlpha = 0.5;
		}
		var position = block1[i].position;
		
		sx = dx + ((position.x)*units);
	    sy = dy + ((position.y)*units);
		
		cxa.fillStyle = col[0]; // BLUE
		cxa.beginPath();
		cxa.moveTo(sx-((1*grd)*units),sy); //l
		cxa.lineTo(sx+((1*grd)*units),sy-((2*grd)*units)); //t
		cxa.lineTo(sx+((2*grd)*units),sy-((1*grd)*units)); //r
		cxa.lineTo(sx+((2*grd)*units),sy); //r
		cxa.lineTo(sx,sy+((2*grd)*units)); //b
		cxa.lineTo(sx-((1*grd)*units),sy+((1*grd)*units)); //b
		cxa.closePath();
		cxa.fill();
		
		cxa.fillStyle = col[1]; // GREEN
		cxa.beginPath();
		cxa.moveTo(sx,sy); //l
		cxa.lineTo(sx+((1*grd)*units),sy-((1*grd)*units)); //r
		cxa.lineTo(sx+((2*grd)*units),sy); //r
		cxa.lineTo(sx,sy+((2*grd)*units)); //b
		cxa.closePath();
		cxa.fill();
		
		cxa.fillStyle = col[5]; // WHITE
		cxa.beginPath();
		cxa.moveTo(sx-((1*grd)*units),sy); //l
		cxa.lineTo(sx+((1*grd)*units),sy-((2*grd)*units)); //r
		cxa.lineTo(sx+((1*grd)*units),sy-((1*grd)*units)); //r
		cxa.lineTo(sx,sy); //b
		cxa.closePath();
		cxa.fill();
	}
	
	
	
	cxa.fillStyle = col[3]; // YELLOW
	for (i=0;i<block2.length;i++) {
		cxa.globalAlpha = 1;
		if (block2[i]==dragged) {
			cxa.globalAlpha = 0.5;
		}
		var position = block2[i].position;
		
		sx = dx + ((position.x)*units);
	    sy = dy + ((position.y)*units);
		
		cxa.beginPath();
		cxa.moveTo(sx-((1*grd)*units),sy); //l
		cxa.lineTo(sx,sy-((1*grd)*units)); //t
		cxa.lineTo(sx+((1*grd)*units),sy-((1*grd)*units)); //t
		cxa.lineTo(sx+((2*grd)*units),sy); //r
		cxa.lineTo(sx+((1*grd)*units),sy+((1*grd)*units)); //b
		cxa.lineTo(sx,sy+((1*grd)*units)); //b
		cxa.closePath();
		cxa.fill();
		
		
	}
	
	
	cxa.fillStyle = col[0]; // BLUE
	for (i=0;i<block3.length;i++) {
		cxa.globalAlpha = 1;
		if (block3[i]==dragged) {
			cxa.globalAlpha = 0.5;
		}
		var position = block3[i].position;
		
		sx = dx + ((position.x)*units);
	    sy = dy + ((position.y)*units);
		
		cxa.beginPath();
		cxa.moveTo(sx,sy-((1*grd)*units)); //t
		cxa.lineTo(sx+((1*grd)*units),sy-((2*grd)*units)); //t
		cxa.lineTo(sx+((1*grd)*units),sy+((3*grd)*units)); //b
		cxa.lineTo(sx,sy+((4*grd)*units)); //b
		cxa.closePath();
		cxa.fill();
	}
	
	
	for (i=0;i<block4.length;i++) {
		cxa.globalAlpha = 1;
		if (block4[i]==dragged) {
			cxa.globalAlpha = 0.5;
		}
		var position = block4[i].position;
		
		sx = dx + ((position.x)*units);
	    sy = dy + ((position.y)*units);
		
		cxa.fillStyle = col[2]; // PURPLE
		cxa.beginPath();
		cxa.moveTo(sx-((2*grd)*units),sy); //l
		cxa.lineTo(sx,sy-((2*grd)*units)); //t
		cxa.lineTo(sx+((2*grd)*units),sy); //r
		cxa.lineTo(sx+((1*grd)*units),sy+((1*grd)*units)); //b
		cxa.lineTo(sx-((1*grd)*units),sy+((1*grd)*units)); //b
		cxa.closePath();
		cxa.fill();
		
		cxa.fillStyle = col[5]; // WHITE
		cxa.beginPath();
		cxa.moveTo(sx-((2*grd)*units),sy); //l
		cxa.lineTo(sx,sy-((2*grd)*units)); //t
		cxa.lineTo(sx,sy); //c
		cxa.lineTo(sx-((1*grd)*units),sy+((1*grd)*units)); //b
		cxa.closePath();
		cxa.fill();
		
		cxa.fillStyle = col[1]; // GREEN
		cxa.beginPath();
		cxa.moveTo(sx,sy-((2*grd)*units)); //t
		cxa.lineTo(sx+((1*grd)*units),sy-((1*grd)*units)); //r
		cxa.lineTo(sx,sy); //c
		cxa.closePath();
		cxa.fill();
	}
	
	
	
	cxa.fillStyle = col[4];
	for (i=0;i<block5.length;i++) {
		cxa.globalAlpha = 1;
		if (block5[i]==dragged) {
			cxa.globalAlpha = 0.5;
		}
		var position = block5[i].position;
		
		sx = dx + ((position.x)*units);
	    sy = dy + ((position.y)*units);
		
		cxa.fillStyle = col[2]; // PURPLE
		cxa.beginPath();
		cxa.moveTo(sx-((1*grd)*units),sy); //l
		cxa.lineTo(sx,sy-((1*grd)*units)); //t
		cxa.lineTo(sx+((1*grd)*units),sy); //r
		cxa.lineTo(sx+((1*grd)*units),sy+((1*grd)*units)); //b
		cxa.lineTo(sx,sy+((2*grd)*units)); //b
		cxa.lineTo(sx-((1*grd)*units),sy+((1*grd)*units)); //b
		cxa.closePath();
		cxa.fill();
		
		cxa.fillStyle = col[5]; // WHITE
		cxa.beginPath();
		cxa.moveTo(sx-((1*grd)*units),sy); //l
		cxa.lineTo(sx,sy-((1*grd)*units)); //t
		cxa.lineTo(sx+((1*grd)*units),sy); //r
		cxa.lineTo(sx,sy+((1*grd)*units)); //b
		cxa.closePath();
		cxa.fill();
	}
	
	
	
	
	cxa.fillStyle = col[5]; // THE PARTICLE EMITTERS //
	for (i=0;i<block6.length;i++) {
		cxa.globalAlpha = 1;
		if (block6[i]==dragged) {
			cxa.globalAlpha = 0.5;
		}
		var position = block6[i].position;
		
		sx = dx + ((position.x)*units);
	    sy = dy + ((position.y)*units);
		
		
		cxa.fillStyle = col[2];
		cxa.beginPath();
		cxa.moveTo(sx-((2*grd)*units),sy); //l
		cxa.lineTo(sx+((2*grd)*units),sy); //r
		cxa.lineTo(sx,sy+((2*grd)*units)); //b
		cxa.closePath();
		cxa.fill();
		
		cxa.fillStyle = col[4];
		cxa.beginPath();
		cxa.moveTo(sx-((1*grd)*units),sy); //l
		cxa.lineTo(sx,sy-((1*grd)*units)); //t
		cxa.lineTo(sx+((1*grd)*units),sy); //r
		cxa.lineTo(sx,sy+((1*grd)*units)); //b
		cxa.closePath();
		cxa.fill();
	}
	
	
	// PARTICLES //
	cxa.fillStyle = col[4];
	cxa.globalAlpha = 1;
	for (var i = 0; i < particles.length; i++) {
	  var position = particles[i].position;
   
	  sx = dx + (position.x*units);
	  sy = dy + (position.y*units);
	  
	  pSize = particles[i].size;
	  
	  cxa.beginPath();
		cxa.moveTo(sx-((3*pSize)*units),sy); //l
		cxa.lineTo(sx,sy-((3*pSize)*units)); //t
		cxa.lineTo(sx+((3*pSize)*units),sy); //r
		cxa.lineTo(sx,sy+((3*pSize)*units)); //b
		cxa.closePath();
		cxa.fill();
	  
	}
	
	
	
}

// FULLSCREEN SELECT SCREEN//
function drawIntro() {
	cxa.globalAlpha = 1;
	cxa.lineWidth = 1;
	cxa.fillStyle = "#000";
	cxa.fillRect(0,0,fullX,fullY);
	
	cxa.strokeStyle = "#888";
	cxa.font = "200 "+(midType)+"px Dosis";
	
	cxa.fillStyle = "#888";
	if (mouseX<halfX) { // SELECT //
		cxa.fillStyle = "#fff";
	}
	cxa.textAlign = 'right';
	cxa.fillText('FULL SCREEN', halfX-(unitOne*1.6), halfY+(unitOne*0.7));
	
	
	cxa.fillStyle = "#888";
	if (mouseX>halfX) { // SELECT //
		cxa.fillStyle = "#fff";
	}
	cxa.textAlign = 'left';
	cxa.fillText('NO THANKS', halfX+(unitOne*1.6), halfY+(unitOne*0.7));
	
	cxa.fillStyle = "#888";
	cxa.textAlign = 'center';
	cxa.font = "400 italic "+(bodyType)+"px PT Sans";
	cxa.fillText('Some caveat about using the latest Chrome or Safari for webAudio.', halfX, halfY+(unitOne*12));
	
	cxa.beginPath();
	cxa.moveTo(halfX,halfY-(unitOne*3.2)); //l
	cxa.lineTo(halfX,halfY+(unitOne*3.2)); //r
	cxa.stroke();
}

// TITLE SEQUENCE //
function drawIntro2() {
	cxa.globalAlpha = 1;
	cxa.fillStyle = "#000";
	cxa.fillRect(0,0,fullX,fullY);
	
	
	cxa.fillStyle = "#888";
	cxa.textAlign = 'center';
	cxa.font = "200 "+(headerType*2)+"px Dosis";
	cxa.fillText('BLOKDUST', halfX, halfY+(unitOne*2.4));
	
	/// FADE IN ///
	if (titleIn>0) {
		cxa.globalAlpha = titleIn/100;
		cxa.fillStyle = "#000";
		cxa.fillRect(0,0,fullX,fullY);
		titleIn -= 1;
	}
	/// FADE OUT ///
	if (titleOutYes==1 && titleOut<100) {
		cxa.globalAlpha = titleOut/100;
		cxa.fillStyle = bgColor;
		cxa.fillRect(0,0,fullX,fullY);
		titleOut += 1;
	}
	if (titleOut==100) { // ONVE FADED OUT, PROGRESS TO NEXT SCENE
		scene=3;
	}
	
}




// HUD DISPLAY //
function drawDisplay() {
	
	// HEADER BAR //
	cxa.globalAlpha = 0.9;
	cxa.fillStyle = "#000";
	cxa.fillRect(0,0,fullX,unitOne*7);
	
	// TITLE //
	cxa.textAlign = 'left'; 
	cxa.globalAlpha = 1;
	cxa.fillStyle = "#888";
	cxa.font = "200 "+(headerType)+"px Dosis";
	cxa.fillText("BLOKDUST", unitOne*2, unitOne*4.8);
	
	// MENU //
	cxa.textAlign = 'center';
	cxa.font = "400 "+(menuType)+"px Dosis"; 
	
	cxa.fillText("ENERGY", halfX-(unitOne*18), unitOne*4);
	cxa.fillText("ACTIVE", halfX-(unitOne*6), unitOne*4);
	cxa.fillText("PASSIVE", halfX+(unitOne*6), unitOne*4);
	cxa.fillText("INPUT", halfX+(unitOne*18), unitOne*4);
	
	cxa.strokeStyle = "#888";
	cxa.beginPath();
	cxa.moveTo(halfX,unitOne*2); //t
	cxa.lineTo(halfX,unitOne*5); //b
	cxa.stroke();
	cxa.beginPath();
	cxa.moveTo(halfX-(unitOne*12),unitOne*2); //t
	cxa.lineTo(halfX-(unitOne*12),unitOne*5); //b
	cxa.stroke();
	cxa.beginPath();
	cxa.moveTo(halfX+(unitOne*12),unitOne*2); //t
	cxa.lineTo(halfX+(unitOne*12),unitOne*5); //b
	cxa.stroke();
	
	cxa.textAlign = 'right';
	if (mode==1) {
		cxa.fillStyle = col[2];
		cxa.beginPath();
		cxa.moveTo(fullX-(unitOne*5),unitOne*2.5); //t
		cxa.lineTo(fullX-(unitOne*3),unitOne*3.5); //c
		cxa.lineTo(fullX-(unitOne*5),unitOne*4.5); //b
		cxa.fill();
		
	} else {
		cxa.fillStyle = col[4];
		cxa.fillRect(fullX-(unitOne*5),unitOne*2.5,unitOne*2,unitOne*2);
		cxa.fillStyle = col[6];
		cxa.beginPath();
		cxa.moveTo(fullX-(unitOne*5),unitOne*2.5); //t
		cxa.lineTo(fullX-(unitOne*3),unitOne*2.5); //c
		cxa.lineTo(fullX-(unitOne*5),unitOne*4.5); //b
		cxa.fill();
	}
	
	// ZOOM BUTTONS //
	cxa.globalAlpha = 1;
	cxa.fillStyle = "#888";
	cxa.font = "200 "+headerType+"px Dosis";
	cxa.textAlign = 'center'; 
	
	sx = unitOne*3;
	sy = fullY - (unitOne*2);
	cxa.fillText("+", sx, sy);
	
	sx = unitOne*8;
	sy = fullY - (unitOne*2);
	cxa.fillText("-", sx, sy);
	
	
	// SHARE OVERLAY//
	if (shareA>0) {
		cxa.globalAlpha = (shareA*0.8)/10;
	    cxa.fillStyle = "#000";
		cxa.fillRect(0,0,fullX,fullY);
		cxa.textAlign = 'center';
		cxa.globalAlpha = shareA/10;
		cxa.fillStyle = "#fff";
		cxa.font = (midType*0.9)+"px Dosis";
		cxa.fillText("Share the console with others...", halfX, halfY-(unitOne*0.8));
		shareWidth = (cxa.measureText("Share the console with others...").width)/2;
		cxa.strokeStyle = '#fff';
		cxa.beginPath();
		cxa.moveTo(halfX-shareWidth,halfY-(unitOne*0.4));
		cxa.lineTo(halfX+shareWidth,halfY-(unitOne*0.4));
		cxa.stroke();
	}
	
	
	if (scene==3 && introAlpha>0) {
		if (introAlpha>0) {
			introAlpha -= 2;
		}
		cxa.globalAlpha = introAlpha/100;
		cxa.fillStyle = bgColor;
	    cxa.fillRect(0,0,fullX,fullY);
	}
	
}





////////////////////////////// RESIZE EVERYTHING ////////////////////////////


function resize_canvas() {
	
	canvasDestW = window.innerWidth;
	canvasDestH = window.innerHeight;
	canvasA.width  = canvasDestW;
	canvasA.height = canvasDestH;
	
	
	// UNIT SIZES //
	halfX = Math.round(canvasA.width/2);
	halfY = Math.round(canvasDestH/2);
	fullX = canvasA.width;
	fullY = canvasDestH;
	
	unitOne = (canvasA.width/100); // USED ON GUI 
	if (unitOne<8) {
		unitOne = 8;
	}
	units = unitOne*zoomLevel; // USED ON STAGE - ZOOM/PAN AFFECTED
		
	
	// TEXT SIZES //
	headerType = Math.round(canvasA.width/28);
	midType = Math.round(canvasA.width/35);
	menuType = Math.round(canvasA.width/70);
	bodyType = Math.round(canvasA.width/60);
	subType = Math.round(canvasA.width/90);
	
	if (headerType<26) {
		headerType = 26;
	}
	if (midType<24) {
		midType = 24;
	}
	if (menuType<12) {
		menuType = 12;
	}
	if (bodyType<16) {
		bodyType = 16;
	}
	if (subType<6) {
		subType = 6;
	}
	
	
			
}


//////////////////////////////  MOUSE/KEYBOARD/TOUCH FUNCTIONS ////////////////////////////////


function findPos(obj) { // ENSURE CURSOR IS WHERE WE THINK IT IS
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function mouseMove(event) {
	var pos = findPos(this);
    var x = event.pageX - pos.x;
    var y = event.pageY - pos.y;

    var mox = x;
	var moy = y;
	
	mouseX = mox;
    mouseY = moy;
	
	
	rollCheck2();
	
	if (stageDrag ==true) { // MOVE THE STAGE AROUND
		
		dragOffX = (mouseX - dragX);
		dragOffY = (mouseY - dragY);
		
		thisUnit = 1600/fullX; // movement relative to the pixel size Im developing at
		camTo(dragOffX*thisUnit,dragOffY*thisUnit,8,10);
	}
}

function mouseRelease(event) {
	dragged = 'undefined';
	stageDrag = false;
}




function rollCheck2() { // IS CURSOR WITHIN GIVEN BOUNDARIES
	
	mox = mouseX;
	moy = mouseY;
	
	if (scene==3) {
		//shareOver = hudCheck(0,fullY-(unitOne*1),unitOne*1,unitOne*1);
	}
	
}

function squareCheck(x,y,w,h) { // IS CURSOR WITHIN GIVEN BOUNDARIES

    cx = dx + (x*units);
	cy = dy + (y*units);
	//cw = 24*sUnit;
	//ch = 24*sUnit;
	
	mx = mouseX;
	my = mouseY;
	
	if (mx>cx && mx<(cx+w) && my>cy && my<(cy+h)) {
		return true;
	} else {return false};
	
}

function hudCheck(x,y,w,h) { // IS CURSOR WITHIN GIVEN BOUNDARIES

	mx = mouseX;
	my = mouseY;
	w = (w*unitOne);
	h = (h*unitOne);
	
	if (mx>x && mx<(x+w) && my>y && my<(y+h)) {
		return true;
	} else {return false};
	
}



function circleCheck(x,y,mx,my,rad) { // IS CURSOR WITHIN GIVEN RADIUS
	
	cx = dx + (x*units);
	cy = dy + (y*units);
	
    zx = cx-mx;
    zy = cy-my;
    zxzy =  Math.sqrt((zx * zx) + (zy * zy));
	if (zxzy<(rad+4)) {
		return true;
	} else {return false};
}


function outlineCheck(x,y,reference) {
	
	var ref = reference;
	var verts = ref.vertices;
	
	cxa.beginPath();
	cxa.moveTo(dx+(x*units)+((ref.shape[0].x*grd)*units),dy+(y*units)+((ref.shape[0].y*grd)*units));
	for (j=1;j<verts;j++) {
		cxa.lineTo(dx+(x*units)+((ref.shape[j].x*grd)*units),dy+(y*units)+((ref.shape[j].y*grd)*units));
	}
	cxa.closePath();
	
	
	
	if (cxa.isPointInPath(mouseX,mouseY)) {
        return true;
    } else {
		return false;
	}
	
	
}


function rollTimer(t) { // CLICK DELAY
	setTimeout(function(){
				
				rollCheck2();
				},t);
}





function getPosition(event) { // ANY MOUSECLICK

	
	mox = mouseX;
	moy = mouseY;
	dragX = (mouseX-dragOffX);
	dragY = (mouseY-dragOffY);
	
	//ZOOM BUTTONS//
	roll = hudCheck(1*unitOne,fullY-(5*unitOne),4,4);
	if (roll==true) {
		if (zoomSlot<7) {
		    zoomSlot += 1;
		}
		zoomTo(zoomSlots[zoomSlot],15,10);	
		return;
	}
	roll = hudCheck(6*unitOne,fullY-(5*unitOne),4,4);
	if (roll==true) {
		if (zoomSlot>0) {
		    zoomSlot -= 1;
		}
		zoomTo(zoomSlots[zoomSlot],15,10);	
		return;
	} 
	
	// MODE SELECT //
	roll = hudCheck(fullX-(7*unitOne),1*unitOne,6,5);
	if (roll==true) {
		if (mode==1) {
		    mode = 2;
		} else {
			mode = 1;
		}
		return;
	}
	
	//CHECK IF ANY COMPONENTS ARE CLICKED ON//
	if (scene>2) {
		if (mode==1) {
			var comps = block1.concat(block2,block3,block4,block5,block6);
			compCheck = comps.length;
			for (i=0;i<comps.length;i++) {
				var point = comps[i].position;
				var ref = comps[i].reference;
				roll = outlineCheck(point.x,point.y,ref);
				if (roll==true) {
					dragged = comps[i]; // YES, STOP LOOKING
					break;
				}
			}
		}
		if (dragged=='undefined') { // ELSE DRAG THE STAGE
			stageDrag = true;
		}	
	}
	
	
	
	if (scene==1) { // GO FULLSCREEN & MOVE TO NEXT SCENE
		
		if (screenfull.enabled && mox<halfX) {
			screenfull.request();
		}
		scene = 2;
		setTimeout(function(){
			titleOutYes = 1; // SCENE TRANSITION
	    },3000);
	}
	
	
	
	
	////// OUTGOING //////
	
	if (wvOver==true && shareState==1) {
		window.location = "http://whitevinyldesign.com";
	}
	if (shareOver==true && shareState==1) {
		var d = document.getElementById('sharing');
		d.style.display = 'block';
		d.style.left = (halfX-110)+"px";
		d.style.top = halfY+"px";
		shareState = 2;
	}
	if (shareState==2&&shareA>5) {
		shareState = 3;
	}
	
	
	rollTimer(200);
}








function testing() {
	
    // TEXT
	cxa.globalAlpha = 1;
	cxa.textAlign = 'center';
	cxa.fillStyle = "#fff";
	cxa.font = "20px PT Sans";
	//cxa.fillText(  unitOne , halfX, 130);
	//cxa.fillText(  stageDrag, halfX, 80);
	//cxa.fillText(  test3, halfX, 110);
	
}
