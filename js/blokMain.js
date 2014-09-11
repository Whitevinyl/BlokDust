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



//--------------------------------------------------------------------------------------------

//    INITIALISE (on load)

//--------------------------------------------------------------------------------------------


function init() {
	
	////////////// SETUP CANVAS ////////////
	
	canvasA = document.getElementById("layerA");
	canvasA.addEventListener("mousedown", getPosition, false);
	canvasA.addEventListener("mouseup", mouseRelease, false);
	canvasA.addEventListener("mousemove", mouseMove, false);
	document.body.addEventListener('touchmove', function(event) {
	  event.preventDefault();
	}, false); 
	
    cxa = canvasA.getContext("2d");
	
	
	// SET CANVAS & DRAWING POSITIONS //
	measurement();
	
	
	
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
		block6[i] = new Emitter(position, outline[5], Vector.fromAngle(0*(Math.PI/180), 6), 30, 1.5);
		
	}
	
	
	loadPalette("img/blockPalette.gif",paletteLoaded1); 
	
	
} // END INIT



//--------------------------------------------------------------------------------------------

//    MAIN LOOP

//--------------------------------------------------------------------------------------------

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
	
	if (scene>0) {
	    testing(); //DISPLAY TESTED VARIABLES (FUNCTION AT VERY BOTTOM)
	}
	
}, 1000/FPS);

// END INTERVAL


//--------------------------------------------------------------------------------------------

//    UPDATE / STEP EVENT

//--------------------------------------------------------------------------------------------

function update() {
	
	cameraTween();
	
	// DRAG AND DROP //
	if (dragged!=='undefined') {
		dragged.position.x = Math.round(((mouseX-dx)/units)/grd)*grd;
		dragged.position.y = Math.round(((mouseY-dy)/units)/grd)*grd;
	}
	
	
	// PARTICLE ANIMATION //
	addNewParticles();
    plotParticles();
	
	
} /////   END UPDATE 




//--------------------------------------------------------------------------------------------

//    MISC

//--------------------------------------------------------------------------------------------


// DEFINE VECTOR //
function Vector(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}


// DO OUR SCALING //
function measurement() {
	
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
	
	units = (unitOne*0.06)*zoomLevel;
			
}


//--------------------------------------------------------------------------------------------

//    INTERACTION

//--------------------------------------------------------------------------------------------



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

// MOUSE MOVE //
function mouseMove(event) {
	var pos = findPos(this);
    var x = event.pageX - pos.x;
    var y = event.pageY - pos.y;

    var mox = x;
	var moy = y;
	
	mouseX = mox;
    mouseY = moy;
	
	if (stageDrag ==true) { // MOVE THE STAGE AROUND
		
		dragOffX = (mouseX - dragX);
		dragOffY = (mouseY - dragY);
		
		thisUnit = 1600/fullX; // movement relative to the pixel size Im developing at
		camTo(dragOffX*thisUnit,dragOffY*thisUnit,8,10);
	}
}

// MOUSE RELEASE //
function mouseRelease(event) {
	dragged = 'undefined';
	stageDrag = false;
}

// MOUSE DOWN //
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
				roll = outlineCheck(point.x,point.y,ref,mouseX,mouseY);
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
	
	
	
	// UPDATE AFTER CLICK //
	rollTimer(200);
}


// ROLLOVER CHECKS //


function squareCheck(x,y,w,h) { // IS POINT WITHIN GIVEN BOUNDARIES

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

function hudCheck(x,y,w,h) { // IS POINT WITHIN GIVEN BOUNDARIES

	mx = mouseX;
	my = mouseY;
	w = (w*unitOne);
	h = (h*unitOne);
	
	if (mx>x && mx<(x+w) && my>y && my<(y+h)) {
		return true;
	} else {return false};
	
}

function circleCheck(x,y,mx,my,rad) { // IS POINT WITHIN GIVEN RADIUS
	
	cx = dx + (x*units);
	cy = dy + (y*units);
	
    zx = cx-mx;
    zy = cy-my;
    zxzy =  Math.sqrt((zx * zx) + (zy * zy));
	if (zxzy<(rad+4)) {
		return true;
	} else {return false};
}


function outlineCheck(x,y,reference,checkX,checkY) { // IS POINT WITHIN GIVEN OUTLINE
	
	var ref = reference;
	var verts = ref.vertices;
	
	cxa.beginPath();
	cxa.moveTo(dx+(x*units)+((ref.shape[0].x*grd)*units),dy+(y*units)+((ref.shape[0].y*grd)*units));
	for (j=1;j<verts;j++) {
		cxa.lineTo(dx+(x*units)+((ref.shape[j].x*grd)*units),dy+(y*units)+((ref.shape[j].y*grd)*units));
	}
	cxa.closePath();
	
	if (cxa.isPointInPath(checkX,checkY)) {
        return true;
    } else {
		return false;
	}
	
	
}


// CLICK DELAY //
function rollTimer(t) { 
	setTimeout(function(){
	  rollCheck2();
	},t);
}




//--------------------------------------------------------------------------------------------

//    DRAW ANY TESTED VARIABLES

//--------------------------------------------------------------------------------------------



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
