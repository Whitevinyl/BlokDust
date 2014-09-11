// JavaScript Document

//--------------------------------------------------------------------------------------------

//    CAMERA EASING / POSITIONING

//--------------------------------------------------------------------------------------------


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

function cameraTween() {
	
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
}


//-------------------------------------------------------------------------------------------

//    DRAW USER INTERFACE

//-------------------------------------------------------------------------------------------

function drawDisplay() {
	
	// HEADER BAR //
	cxa.globalAlpha = 0.9;
	cxa.fillStyle = hud[2];
	cxa.fillRect(0,0,fullX,unitOne*7);
	
	// TITLE //
	cxa.textAlign = 'left'; 
	cxa.globalAlpha = 1;
	cxa.fillStyle = hud[1];
	cxa.font = "200 "+(headerType)+"px Dosis";
	cxa.fillText("BLOKDUST", unitOne*2, unitOne*4.8);
	
	// MENU //
	cxa.textAlign = 'center';
	cxa.font = "400 "+(menuType)+"px Dosis"; 
	
	cxa.fillText("ENERGY", halfX-(unitOne*18), unitOne*4);
	cxa.fillText("ACTIVE", halfX-(unitOne*6), unitOne*4);
	cxa.fillText("PASSIVE", halfX+(unitOne*6), unitOne*4);
	cxa.fillText("INPUT", halfX+(unitOne*18), unitOne*4);
	
	cxa.strokeStyle = hud[1];
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
	
	// PLAY / STOP //
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
	cxa.fillStyle = hud[1];
	cxa.font = "200 "+headerType+"px Dosis";
	cxa.textAlign = 'center'; 
	
	sx = unitOne*3;
	sy = fullY - (unitOne*2);
	cxa.fillText("+", sx, sy);
	
	sx = unitOne*8;
	sy = fullY - (unitOne*2);
	cxa.fillText("-", sx, sy);
	
	
	
	// FADE IN //
	if (scene==3 && introAlpha>0) {
		if (introAlpha>0) {
			introAlpha -= 2;
		}
		cxa.globalAlpha = introAlpha/100;
		cxa.fillStyle = hud[0];
	    cxa.fillRect(0,0,fullX,fullY);
	}
	
}