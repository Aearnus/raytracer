var Vector = {};
Vector.Rect = function(x, y, z) {
	this.magnitude = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
	this.toRect = function() { return this; }
	this.toPolar = function() { return new Vector.Polar(this.magnitude, Math.acos(z/this.magnitude), Math.atan2(y, x)) }
	this.x = x;
	this.y = y;
	this.z = z;
	this.toString = function() { return "(" + x.toString() + ", " + y.toString() + ", " + z.toString() + ")" }
}
Vector.Polar = function(magnitude, rx, rz) { //rz = theta, rx = phi
	//this._vec = new Vector.Rect(-magnitude * Math.cos(rz), magnitude * Math.sin(rz), magnitude * Math.cos(rx));
	this._vec = new Vector.Rect(Math.cos(rz) * Math.cos(rx) * magnitude, Math.sin(rz) * Math.cos(rx) * magnitude, Math.sin(rx) * magnitude);
	this.magnitude = magnitude;
	this.toRect = function() { return new this._vec; }
	this.toPolar = function() { return this; }
	this.rx = rx;
	this.rz = rz;
	this.toString = function() { return "(" + magnitude.toString() + ", " + rx.toString() + ", " + rz.toString() + ")" }

}
Vector.add = function(v1, v2) {
	return new Vector.Rect(v1.toRect().x + v2.toRect().x, v1.toRect().y + v2.toRect().y, v1.toRect().z + v2.toRect().z);
}
Vector.subtract = function(v1, v2) {
	return new Vector.Rect(v1.toRect().x - v2.toRect().x, v1.toRect().y - v2.toRect().y, v1.toRect().z - v2.toRect().z);
}
Vector.product = function(s,v) {
	return new Vector.Rect(s * v.toRect().x, s * v.toRect().y, s * v.toRect().z);
}
Vector.dotProduct = function(v1, v2) {
	return (v1.toRect().x * v2.toRect().x + v1.toRect().y * v2.toRect().y + v1.toRect().z * v2.toRect().z);
}
Vector.crossProduct = function(v1, v2) {
	return new Vector.Rect(v1.toRect().y * v2.toRect().z - v1.toRect().z * v2.toRect().y, v1.toRect().z * v2.toRect().x - v1.toRect().x * v2.toRect().z, v1.toRect().x * v2.toRect().y - v1.toRect().y * v2.toRect().x);
}