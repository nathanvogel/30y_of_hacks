/* exported OPTIONS */

/***************************************
 * PREFERENCES
 ***************************************/
var OPTIONS = {
  displacementSpeedX: 1.5,
  displacementSpeedY: 1.5,
  // Effects
  displacementEnabled: true,
  displacementFile: "assets/textures/displacement_map.png",
  displacementScaleX: 300,
  displacementScaleY: 300,
  bloomEnabled: true,
  bloomBlur: 2,
  bloomQuality: 1,
  bloomResolution: undefined,
  asciiEnabled: true,
  asciiScale: 12,
  transparentPixiCanvas: true
};

var gui = new dat.gui.GUI();

var f2 = gui.addFolder("DisplacementFilter");
f2.add(OPTIONS, "displacementSpeedX", 0.1, 10);
f2.add(OPTIONS, "displacementSpeedY", 0.1, 10);
f2.open();
