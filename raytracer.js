 var Sphere = function(position, r, color) { //color in form [r, g, b]
 	this.position = position;
	this.x = position.x;
	this.y = position.y;
	this.z = position.z;
	this.r = r;
	this.color = color;
}

//z = up
var Camera = function(direction, position) { //rotation on the x, y, and z axis
	this.createRays = function(distanceX, distanceZ) {
		for(var i = 0; i < canvas.width; i++) {
			for(var j = 0; j < canvas.height; j++) {
				var currentRay = new Ray(direction, new Vector.Rect((position.x + (i * distanceX)) - (position.x + (canvas.width * distanceX)) / 2, position.y, position.z + (j * distanceZ) - (position.z + (canvas.height * distanceZ)) / 2), [i, j]);
				currentRay.update();
			}
			console.log((((canvas.width * i) + j) / (canvas.width * canvas.height)) * 100 + "%");
		}
	}
}

//each ray is a polar vector and a rectangular vector
//the polar vector, (magnitude, rx, rz), says the length and direction
//the rectangular vector, (x, y, z), says the origin or last reflection of the ray
//rotation on the x axis moves ray in the z directions
//rotation on the z axis moves ray in the x directions
//rotation on the y axis is "tilt", it isn't necessary for a ray. x and z are all that are needed to point in any direction
//y = forward (movement if no angle)
var precision = 0.1; //lower number = higher precision (0 bounded)
var maxIterations = 250; //max times that a ray can go without rendering as white
var Ray = function(direction, position, pixel) { //pixel = what pixel this ray was sent from
	this.color = "#FFFFFF";
	this.iterations = 0;
	this.done = false;
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(pixel[0], pixel[1], 1, 1);
	}
	this.update = function() {
		while(!this.done) {
			this.iterations += 1;
			position.x += -precision * Math.sin(direction.rz); //trig functions take radians
			position.y += precision * Math.cos(direction.rx);
			position.z += precision * Math.sin(direction.rx);
			for (var sphereIndex = 0; sphereIndex < Scene.length; sphereIndex++) {
				var currentSphere = Scene[sphereIndex];
				var distanceToSphere = Vector.subtract(currentSphere.position, position).toPolar().magnitude;
				if(distanceToSphere < currentSphere.r) {
					this.bounces += 1;
					this.color = currentSphere.color;
					this.done = true;
					//to reflect a vector over a normal:
					//Vnew = -2*(V dot N)*N + V
				}
			}
			if(this.iterations > maxIterations) {
				this.done = true;
			}
		}
		this.draw();
	}
}

window.onload = function() {
	progressBar = document.getElementById("progressBar");
	canvas = document.getElementById("raytraceCanvas");
	ctx = canvas.getContext("2d");
	Scene = [new Sphere(new Vector.Rect(0, 20, 0), 100, "#0000FF"),
			 new Sphere(new Vector.Rect(-50, 6, -30), 24, "#FF0000"),
			 new Sphere(new Vector.Rect(50, 6, -30), 24, "#FF0000"),
			 new Sphere(new Vector.Rect(0, 0, 6), 15, "#FF0000")];
	SceneCamera = new Camera(new Vector.Polar(1, 0, 0), new Vector.Rect(0,0,0));
	//SceneCamera.createRays(1, 1);
}
