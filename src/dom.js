var dataset = [
  {
    name: "DEFCON",
    type: "event",
    timestamp: 815183068,
    year: 1995,
    description: "uohwefiuwhfu"
  },
  {
    name: "BANK OF AMERICA",
    type: "hack",
    timestamp: 815183068,
    year: 1995,
    description: "uohwefiuwhfu"
  }
];

function w() {
  return window.innerWidth;
}
function h() {
  return window.innerHeight;
}
var blockDistance = w() / 2;
var container;

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

function goToBlock(index) {
  container.style.transform = "translateX(" + -index * blockDistance + "px)";
}

initBlocks();
