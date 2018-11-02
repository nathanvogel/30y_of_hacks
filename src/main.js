/* globals project view Path Point */
/* globals toggleDisplacement moveToBlockBy paperReady */
/* exported onFrame onMouseMove onMouseUp onKeyDown */
/* eslint no-unused-vars: 0 */

var background = new Path.Rectangle({
  size: view.bounds.size,
  fillColor: "#000000"
});

var circle = new Path.Circle({
  radius: 50,
  fillColor: "#FBFBFB", //"#FDE9B5"
  opacity: 1,
  position: new Point(view.bounds.width / 4, view.bounds.height / 2)
});
circle.visible = true;
circle.applyMatrix = false;

var backgroundStuff = [];
for (var j = 0; j < 3; j++) {}

var plants = [];

var anime_circle = anime({
  targets: circle.position,
  x: circle.position.x - 100,
  y: circle.position.y + 100,
  loop: true,
  duration: 3 * 1000,
  direction: "alternate",
  easing: "easeInOutSine",
  update: function(a) {}
});

// =========== ANIMATION ==============
function onFrame(event) {
  // circle.position = p;
  // background.fillColor = event.count % 30 < 15 ? "#000000" : "#555555";
}

// =========== INTERACTION ==============
function onMouseMove(event) {
  // circle.position = event.point;
}

function onKeyDown(event) {
  switch (event.key) {
    case "space":
      // Skip all current anims
      var max = plants.length;
      for (var i = 0; i < max; i++) {
        var plant = plants[i];
        plant.animation.pause();
        plant.animation.seek(plant.animation.duration);
      }
      break;
    case "d":
      toggleDisplacement();
      break;
    case "left":
      moveToBlockBy(-1);
      break;
    case "right":
      moveToBlockBy(1);
      break;
  }
}

window.onNewVisual_anim = function(datapoint) {
  // circle.fillColor = "yellow";

  var possibleStops = COLORS[datapoint.type];
  var stops = possibleStops[Math.floor(Math.random() * possibleStops.length)];
  circle.fillColor = {
    gradient: {
      stops: stops,
      radial: true
    },
    origin: circle.position,
    destination: circle.bounds.rightCenter
  };

  var circle_scale = 1;
  if (datapoint.visualValueSuffix.indexOf("$") >= 0) {
    circle_scale = map_range(
      datapoint.visualValue,
      1000000,
      1000000000,
      0.3,
      6,
      true
    );
    console.log("Circle scale: ", circle_scale);
  }

  circle.scaling = circle_scale;

  // console.log(anime_circle);
  // circle.bounds.width =
};

paperReady();
