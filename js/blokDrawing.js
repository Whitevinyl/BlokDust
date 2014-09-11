// JavaScript Document



//--------------------------------------------------------------------------------------------

//    DRAW BACKGROUND

//--------------------------------------------------------------------------------------------

function drawBG() {
	
	cxa.globalAlpha = 1;
	cxa.fillStyle = hud[0];
	cxa.fillRect(0,0,fullX,fullY);
	
	
}

//--------------------------------------------------------------------------------------------

//    DRAW MAIN STAGE

//--------------------------------------------------------------------------------------------

function drawScene() {
	
	cxa.strokeStyle = col[5];
	cxa.lineWidth = 1;
	cxa.globalAlpha = 1;
	
	
	
	// BLOCK 1 //
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
	
	
	// BLOCK 2 //
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
	
	
	// BLOCK 3 //
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
	
	
	// BLOCK 4 //
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
	
	
	// BLOCK 5 //
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
	
	
	// BLOCK 6 //
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
	drawParticles();
	
}


//--------------------------------------------------------------------------------------------

//    DRAW FULLSCREEN SELECTION SCENE

//--------------------------------------------------------------------------------------------

function drawIntro() {
	cxa.globalAlpha = 1;
	cxa.lineWidth = 1;
	cxa.fillStyle = hud[2];
	cxa.fillRect(0,0,fullX,fullY);
	
	cxa.strokeStyle = hud[1];
	cxa.font = "200 "+(midType)+"px Dosis";
	
	cxa.fillStyle = hud[1];
	if (mouseX<halfX) { // SELECT //
		cxa.fillStyle = hud[3];
	}
	cxa.textAlign = 'right';
	cxa.fillText('FULL SCREEN', halfX-(unitOne*1.6), halfY+(unitOne*0.7));
	
	
	cxa.fillStyle = hud[1];
	if (mouseX>halfX) { // SELECT //
		cxa.fillStyle = hud[3];
	}
	cxa.textAlign = 'left';
	cxa.fillText('NO THANKS', halfX+(unitOne*1.6), halfY+(unitOne*0.7));
	
	cxa.fillStyle = hud[1];
	cxa.textAlign = 'center';
	cxa.font = "400 italic "+(bodyType)+"px PT Sans";
	cxa.fillText('Some caveat about using the latest Chrome or Safari for webAudio.', halfX, halfY+(unitOne*12));
	
	cxa.beginPath();
	cxa.moveTo(halfX,halfY-(unitOne*3.2)); //l
	cxa.lineTo(halfX,halfY+(unitOne*3.2)); //r
	cxa.stroke();
}


//--------------------------------------------------------------------------------------------

//    DRAW TITLE FADE SCENE

//--------------------------------------------------------------------------------------------

function drawIntro2() {
	cxa.globalAlpha = 1;
	cxa.fillStyle = hud[2];
	cxa.fillRect(0,0,fullX,fullY);
	
	
	cxa.fillStyle = hud[1];
	cxa.textAlign = 'center';
	cxa.font = "200 "+(headerType*2)+"px Dosis";
	cxa.fillText('BLOKDUST', halfX, halfY+(unitOne*2.4));
	
	/// FADE IN ///
	if (titleIn>0) {
		cxa.globalAlpha = titleIn/100;
		cxa.fillStyle = hud[2];
		cxa.fillRect(0,0,fullX,fullY);
		titleIn -= 1;
	}
	/// FADE OUT ///
	if (titleOutYes==1 && titleOut<100) {
		cxa.globalAlpha = titleOut/100;
		cxa.fillStyle = hud[0];
		cxa.fillRect(0,0,fullX,fullY);
		titleOut += 1;
	}
	if (titleOut==100) { // ONVE FADED OUT, PROGRESS TO NEXT SCENE
		scene=3;
	}
	
}


