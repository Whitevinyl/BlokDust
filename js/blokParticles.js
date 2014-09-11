// JavaScript Document


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
  //angle = ang*(Math.PI/180);
  return new Vector(magnitude * Math.cos(angle), magnitude * Math.sin(angle));
};


//--------------------------------------------------------------------------------------------

//    MANAGE PARTICLES

//--------------------------------------------------------------------------------------------


// PARTICLE CONSTRUCTOR //
function Particle(point, velocity, size, life, acceleration ) { 
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

// EMITTER CONSTRUCTOR //
function Emitter(point, reference, velocity, spread, size) { 
  this.position = point; // Vector
  this.reference = reference;
  this.velocity = velocity; // Vector
  this.spread = spread || Math.PI / 32; // possible angles = velocity +/- spread
  this.size = size || 0;
}

// OUTLINE CONSTRUCTOR //
function Outline(vertices,p1,p2,p3,p4,p5,p6,p7,p8,p9,p10) { 
  this.vertices = vertices || 0;
  this.shape = [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10]; // Array of Vectors
}

// CREATE A PARTICLE //
Emitter.prototype.emitParticle = function() { 
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

// MOVE PARTICLES //
function plotParticles() {
  var currentParticles = []; // PARTICLE MANAGEMENT ARRAY
 
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
	particle.life -= 1;
 
    // COLLISION CHECK //
	particleHitTest(dx + (particle.position.x*units),dy + (particle.position.y*units),particle);
 
 
    if (particle.life<1) continue;
    particle.move();
    currentParticles.push(particle); // UPDATE MANAGEMENT
  }
  particles = currentParticles; // UPDATE ORIGINAL ARRAY
}

// PARTICLE COLLISION CHECK //
function particleHitTest(x,y,part) {
	var comps = block3;
	compCheck = comps.length;
	for (i=0;i<comps.length;i++) {
		var point = comps[i].position;
		var ref = comps[i].reference;
		
		if (outlineCheck(point.x,point.y,ref,x,y)==true) {
			part.life = -10000;
			particleCollision(comps[i]);
		}
	}
}

//--------------------------------------------------------------------------------------------

//    DRAW PARTICLES

//--------------------------------------------------------------------------------------------


function drawParticles() {
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