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
var container;
var currentBlock = 0;

function initBlocks() {
  container = document.getElementById("container");

  prepareDataset();
  for (let i = 0; i < dataset.length; i++) {
    createBlock(dataset[i], i);
  }

  // goToBlock(1);
}

function prepareDataset() {
  for (let i = 0; i < dataset.length; i++) {
    dataset[i].index = i;
    dataset[i].id = indexToId(i);
  }
}

function createBlock(data) {
  var eventBlockWrapper = document.createElement("div");
  eventBlockWrapper.className = "block-wrapper";
  container.appendChild(eventBlockWrapper);

  var eventBlock = document.createElement("div");
  eventBlock.id = data.id;
  eventBlock.className = "block";
  eventBlockWrapper.appendChild(eventBlock);

  var title = document.createElement("div");
  title.className = "block-title";
  title.textContent = data.name;
  eventBlock.appendChild(title);
  var description = document.createElement("div");
  description.className = "block-description";
  description.innerHTML = data.description;
  eventBlock.appendChild(description);

  // Now that we have added all the content, we can calculate the height
  // of the div to determine an offset.
  if (data.index !== 0) {
    setRandomY(eventBlockWrapper);
  }
}

function setRandomY(element) {
  var height = element.clientHeight;
  var available = window.innerHeight - height;
  var offset = Math.floor((Math.random() - 0.5) * (available + height / 4));
  element.style.transform = "translateY(" + offset + "px)";
}

function moveToBlockBy(step) {
  goToBlock(currentBlock + step);
}

function indexToId(index) {
  return "event-" + index;
}

function goToBlock(newIndex) {
  if (newIndex >= dataset.length) {
    newIndex = 0;
  }
  if (newIndex < 0) {
    newIndex = dataset.length - 1;
  }
  var lastIndex = currentBlock;
  updateOldBlocks(lastIndex, newIndex);
  currentBlock = newIndex;
  updateNewBlocks();
  var e = document.getElementById(indexToId(currentBlock));
  container.style.transform = "translateX(" + -e.parentNode.offsetLeft + "px)";
}

function updateOldBlocks(lastIndex) {
  var e = document.getElementById(indexToId(lastIndex));
  setRandomY(e.parentNode);
}

function updateNewBlocks() {
  for (var i = 0; i < container.children.length; i++) {
    $(container.children[i].firstChild).toggleClass(
      "ancientHistory",
      Boolean(i < currentBlock)
    );
    $(container.children[i].firstChild).toggleClass(
      "futureHistory",
      Boolean(i > currentBlock)
    );
    if (i === currentBlock) {
      container.children[i].style.transform = "translateY(" + 0 + "px)";
    }
    // $(container.children[i]).toggleClass(
    //   "currentHistoryWrapper",
    //   Boolean(i === currentBlock)
    // );
  }
}
