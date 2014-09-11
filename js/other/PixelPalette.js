// JavaScript Document


//-------------------------------------------------------------------------------------------
//  PALETTE LOADER
//-------------------------------------------------------------------------------------------

//INIT //
palettes = [];
col = [];
hud = [];

// FUNCTION //
function loadPalette(imgPath,callback) {
	
	
	var loader = new PxLoader(); //// Use PX Loader to handle image load
	var palette = loader.addImage(imgPath);
	
	loader.addCompletionListener(function() { //// callback that will be run once image is ready 
	
	    var len = palette.width; //// get number of colours
		cxa.drawImage(palette,0,0,len,1); //// temporarilly place image
		var imgd = cxa.getImageData(0,0,len,1); //// get the image data
		var pal = imgd.data;
		
		var thisPalette = []; //// Loop over each pixel and add the color to an array.
		for (var i = 0; i < (len*4); i += 4) {
			thisPalette[i/4] = "rgba("+pal[i]+", "+pal[i+1]+", "+pal[i+2]+", 1)";
		}
		
		palettes.push(thisPalette); //// Add this palette to an array containing all palletes
	
		
		if (callback) { //// Finished loading the pallete, run the callback if there is one
		    callback(); 
		}
	}); 
	
	loader.start(); //// begin downloading image
}

function paletteLoaded1() {
	loadPalette("img/uiPalette.gif",paletteLoaded2);
}
function paletteLoaded2() {
	// FINISHED INITALISING, GO TO SCENE 1
	col = palettes[0];
	hud = palettes[1];
	scene = 1;
}