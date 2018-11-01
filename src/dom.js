var dataset = [
  {
    name: "DEFCON",
    type: "event",
    timestamp: 815183068,
    year: 1995,
    description: "uohwefiuwhfu"
  },
  {
    name: "TEST",
    type: "event",
    timestamp: 815183068,
    year: 1995,
    description: "hdrthdrhtdrh"
  },
  {
    name: "BANK OF AMERICA",
    type: "hack",
    timestamp: 815183068,
    year: 1996,
    description: "uohwefiuwhfu"
  }
];

$.getJSON("data/events.json", json => {
  // Remove hidden elements.
  for (var i = json.length - 1; i >= 0; i--) {
    if (json[i].hidden) {
      json.splice(i, 1);
    }
  }
  dataset = json;
  initBlocks();
});

function w() {
  return window.innerWidth;
}
function h() {
  return window.innerHeight;
}
var blockDistance = w() / 2;
var container;
var currentBlock = 0;

function initBlocks() {
  container = document.getElementById("container");

  prepareDataset();
  for (let i = 0; i < dataset.length; i++) {
    createBlock(dataset[i], i);
  }
}

function prepareDataset() {
  for (let i = 0; i < dataset.length; i++) {
    dataset[i].index = i;
    dataset[i].id = "event-" + i;
  }
}

function createBlock(data) {
  var eventBlock = document.createElement("div");
  eventBlock.id = data.id;
  eventBlock.className = "block";
  eventBlock.style.left = blockDistance * (data.index + 1) + "px";
  container.appendChild(eventBlock);

  // Now create and append to iDiv
  var title = document.createElement("div");
  title.className = "block-title";
  title.textContent = data.name;
  eventBlock.appendChild(title);
}

function moveToBlockBy(step) {
  goToBlock(currentBlock + step);
}

function goToBlock(index) {
  if (index >= dataset.length) {
    index = 0;
  }
  if (index < 0) {
    index = dataset.length - 1;
  }
  var lastIndex = currentBlock;
  currentBlock = index;
  container.style.transform = "translateX(" + -index * blockDistance + "px)";
}
