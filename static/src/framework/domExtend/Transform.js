Transform = function(ext, element) {

	ext.rect = function() {
		return element.getBoundingClientRect();
	};

	ext.width = function(v) {
		if(v) element.style.width = v + "px";
		return ext.rect().width;
	};

	ext.height = function(v) {
		if(v) element.style.height = v + "px";
		// TODO: Check if returning element.scrollHeight isn't more reliable
		return ext.rect().height;
	};

	ext.x = 0;
	ext.y = 0;
	ext.z = 0;
	ext.rotX = 0;
	ext.rotY = 0;
	ext.rotZ = 0;
	ext.scaleX = 1;
	ext.scaleY = 1;
	ext.scaleZ = 1;

	ext.transformToString = function(values, force2d) {
		values = values || ext;

		var t = "";

		if(values.x) t += "translateX(" + values.x + "px)";
		if(values.y) t += "translateY(" + values.y + "px)";
		if(values.z && Simplrz.css3d && !force2d) t += "translateZ(" + values.z + "px)";
		
		if(values.rotX && Simplrz.css3d && !force2d) t += "rotateX(" + values.rotX + "deg)";
		if(values.rotY && Simplrz.css3d && !force2d) t += "rotateY(" + values.rotY + "deg)";
		if(values.rotZ && Simplrz.css3d && !force2d) t += "rotateZ(" + values.rotZ + "deg)";
		else if(values.rotZ) t += "rotate(" + values.rotZ + "deg)";
		
		if(values.scaleX != 1) t += "scaleX(" + values.scaleX + ")";
		if(values.scaleY != 1) t += "scaleY(" + values.scaleY + ")";
		if(values.scaleZ != 1 && Simplrz.css3d && !force2d) t += "scaleZ(" + values.scaleZ + ")";
	
		return t;
	};

	ext.transform = function(values, force2d) {
		if(values) {
			for(var i in values) {
				ext[i] = values[i];
			}
		}

		var t = ext.transformToString(ext, force2d);
		element.style[Simplrz.prefix.js + "Transform"] = t;
		// element.style["transform"] = t;
	};

	var anim;

	// Used to set frame based animation, created with ../Animation.js
	ext.setAnimation = function(anm, delay) {
		if(anim) anim.cancel();

		anim = anm.applyTo(ext).onUpdate(function(v) { 
			ext.transform();
		}).onEnd(function() { 
			anim = null;
		}).start(delay);

		return anim;
	}
};







