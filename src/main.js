/* globals project view Path Point */
/* exported onFrame onMouseMove onMouseUp onKeyDown */

var background = new Path.Rectangle({
  size: view.bounds.size,
  fillColor: "#000000"
});
var datapoint = new Path.Circle({
  radius: 50,
  fillColor: "white", //"#FDE9B5"
  opacity: 1,
  position: new Point(view.bounds.width / 4, view.bounds.height / 2)
});
datapoint.visible = true;
var plants = [];

anime({
  targets: datapoint.position,
  x: datapoint.position.x - 100,
  y: datapoint.position.y + 100,
  loop: true,
  duration: 3 * 1000,
  direction: "alternate",
  easing: "easeInOutSine",
  update: function(a) {}
});

// =========== ANIMATION ==============
function onFrame(event) {
  // datapoint.position = p;
}

// =========== INTERACTION ==============
function onMouseMove(event) {
  // datapoint.position = event.point;
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
  }
}
