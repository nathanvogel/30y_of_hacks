/* exported onNewVisual_renderer initPixi toggleDisplacement */
/* globals pixiReady */

// PixiJS checks
let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
  console.warn("WebGL isn't supported (PIXI)");
  type = "canvas";
}
PIXI.utils.sayHello(type);

// PixiJS aliases
let resources = PIXI.loader.resources;

// Create a Pixi Application
let ratio = window.devicePixelRatio;
let app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true, // default: false
  transparent: OPTIONS.transparentPixiCanvas,
  autoResize: true,
  resolution: ratio // default: 1
});
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
// Add the canvas that Pixi automatically created for you to the HTML document
document.body.insertBefore(app.view, document.getElementById("container"));

// Link canvas
let paperCanvas = document.getElementById("canvas");
let base = new PIXI.BaseTexture.fromCanvas(paperCanvas),
  texture = new PIXI.Texture(base),
  paperSprite = new PIXI.Sprite(texture);
paperSprite.height = paperSprite.height / ratio;
paperSprite.width = paperSprite.width / ratio;
// It seems that we're forced to add it as a child. for the transform to be
// reflected when we use it as mask.
app.stage.addChild(paperSprite);
paperSprite.visible = true;

// Runtimes
var filter_displacement, filter_ascii, filter_bloom;

PIXI.loader
  .add([{ name: "map", url: OPTIONS.displacementFile }])
  .load(imageLoaded);

function imageLoaded() {
  pixiReady();
}

function initPixi() {
  setupFilters();
  app.ticker.add(delta => gameLoop(delta));
}

function setupFilters() {
  // Displacement sprite
  resources.map.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  const displacementSprite = new PIXI.Sprite(resources.map.texture);
  app.stage.addChild(displacementSprite);
  displacementSprite.scale.set(2);
  // Displacement filter
  filter_displacement = new PIXI.filters.DisplacementFilter(
    displacementSprite,
    OPTIONS.displacementScaleX,
    OPTIONS.displacementScaleY
  );
  filter_displacement.enabled = OPTIONS.displacementEnabled;
  filter_displacement.global = true;
  // ASCII filter
  filter_ascii = new PIXI.filters.AsciiFilter(OPTIONS.asciiScale);
  filter_ascii.enabled = OPTIONS.asciiEnabled;
  filter_ascii.global = true;
  var f1 = gui.addFolder("AsciiFilter");
  f1.add(filter_ascii, "enabled");
  f1.add(filter_ascii, "size", 1, 40);
  f1.open();
  // Bloom filter
  // filter_bloom = new PIXI.filters.AdvancedBloomFilter({
  //   threshold: 0.5,
  //   bloomScale: 1,
  //   brightness: 5,
  //   blur: OPTIONS.bloomBlur,
  //   quality: OPTIONS.bloomQuality,
  //   resolution: OPTIONS.bloomResolution
  // });
  // filter_bloom = new PIXI.filters.AdvancedBloomFilter({
  //   threshold: 0.1,
  //   bloomScale: 100,
  //   brightness: 500,
  //   blur: 100,
  //   quality: 50,
  //   resolution: 10,
  //   pixelSize: 3,
  //   kernels: [1, 1, 1, 1, 1, 1, 1, 1, 1]
  // });
  // filter_bloom = new PIXI.filters.AdvancedBloomFilter();
  filter_bloom = new PIXI.filters.BloomFilter(
    OPTIONS.bloomBlur,
    OPTIONS.bloomQuality
  );
  filter_bloom.enabled = OPTIONS.bloomEnabled;
  filter_bloom.global = true;
  app.stage.filters = [filter_displacement, filter_ascii, filter_bloom];
}

function gameLoop(/* arg1 = delta */) {
  paperSprite.texture.update();
  filter_displacement.maskSprite.transform.position.x +=
    OPTIONS.displacementSpeedX;
  filter_displacement.maskSprite.transform.position.y +=
    OPTIONS.displacementSpeedY;
}

function toggleDisplacement() {
  filter_displacement.enabled = !filter_displacement.enabled;
}

function onNewVisual_renderer(datapoint) {
  var ascii_scale = OPTIONS.asciiScale;
  if (datapoint.visualValueSuffix.indexOf("$") >= 0) {
    ascii_scale = map_range(
      datapoint.visualValue,
      1000000,
      1000000000,
      16,
      6,
      false
    );
    console.log("Ascii scale: ", ascii_scale);
  }
  filter_ascii.size = ascii_scale;
  // switch (datapoint.type) {
  //   case ""
  //
  // }
}
