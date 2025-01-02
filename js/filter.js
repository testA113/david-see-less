/*
 * David See-Less - Content Script
 *
 * This is the primary JS file that manages the detection and filtration of words from the web page.
 */

var xpathPatterns = [
  [
    "//body//*[not(self::script or self::style)]/text()[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'seymour')]",
    "seymour",
  ],
  [
    "//body//a[contains(translate(@href, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'seymour')]",
    "seymour",
  ],
  [
    "//body//img[contains(translate(@src, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'seymour')]",
    "seymour",
  ],
  [
    "//body//img[contains(translate(@alt, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'seymour')]",
    "seymour",
  ],
];

function filterNodes() {
  let nodes = [];
  for (let i = 0; i < xpathPatterns.length; i++) {
    let xpathResult = document.evaluate(
      xpathPatterns[i][0],
      document,
      null,
      XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
      null
    );
    let thisNode = xpathResult.iterateNext();
    while (thisNode) {
      let regex = new RegExp(
        "(\\b|_)(" + xpathPatterns[i][1] + ")(\\b|_|s)",
        "i"
      );
      if (regex.test(thisNode.data)) {
        nodes.push(findNearestParent(thisNode));
      }
      thisNode = xpathResult.iterateNext();
    }
  }

  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i] !== null) nodes[i].remove();
  }
}

function findNearestParent(node) {
  const parentSelectors = {
    google: (node) => {
      let element = node;
      while (element && element.parentNode?.attributes) {
        if (
          element.parentNode.attributes["data-ved"] &&
          element.parentNode.attributes["data-hveid"]
        ) {
          return element.parentNode;
        }
        element = element.parentNode;
      }
      return null;
    },
    stuff: (node) => {
      let element = node;
      while (element && element.parentNode?.classList) {
        if (
          element.parentNode.classList.contains("story-card") ||
          element.parentNode?.classList?.contains("content-item")
        ) {
          return element.parentNode;
        }
        element = element.parentNode;
      }
      return null;
    },
    thepress: (node) => {
      let element = node;
      while (element && element.parentNode) {
        if (
          element.parentNode?.tagName === "ION-CARD" ||
          element.parentNode?.classList?.contains("content-item")
        ) {
          return element.parentNode;
        }
        element = element.parentNode;
      }
      return null;
    },
    thepost: (node) => {
      let element = node;
      while (element && element.parentNode) {
        if (
          element.parentNode?.tagName === "ION-CARD" ||
          element.parentNode?.classList?.contains("content-item")
        ) {
          return element.parentNode;
        }
        element = element.parentNode;
      }
      return null;
    },
    reddit: (node) => {
      let element = node;
      while (element) {
        if (
          element.parentNode?.tagName === "ARTICLE" ||
          element.parentNode?.tagName === "SHREDDIT-COMMENT"
        ) {
          return element.parentNode;
        }
        element = element.parentNode;
      }
      return null;
    },
    rnz: (node) => {
      let element = node;
      //  get all attributes of the node
      const matchingClasses = ["o-digest--extended", "list-item"];
      while (element) {
        if (
          matchingClasses.some(
            (className) =>
              element.parentNode?.classList?.contains(className) ||
              node.parentNode.tagName === "P"
          )
        ) {
          return element.parentNode;
        }
        element = element.parentNode;
      }
      return null;
    },
    newsroom: (node) => {
      let element = node;
      while (element) {
        if (
          element.parentNode?.attributes?.["data-post-id"] ||
          node.parentNode.tagName === "P"
        ) {
          return element.parentNode;
        }
        element = element.parentNode;
      }
      return null;
    },
    odt: (node) => {
      let element = node;
      while (element) {
        if (
          element.parentNode?.tagName === "ARTICLE" ||
          node.parentNode.tagName === "P"
        ) {
          return element.parentNode;
        }
        element = element.parentNode;
      }
      return null;
    },
    nzherald: (node) => {
      let element = node;
      while (element) {
        if (
          element.parentNode?.tagName === "ARTICLE" ||
          node.parentNode.tagName === "P"
        ) {
          return element.parentNode;
        }
        element = element.parentNode;
      }
      return null;
    },
    thespinoff: (node) => {
      let element = node;
      while (element) {
        if (
          element.parentNode?.tagName === "ARTICLE" ||
          node.parentNode.tagName === "P"
        ) {
          return element.parentNode;
        }
        element = element.parentNode;
      }
      return null;
    },
  };

  const hostname = window.location.hostname;
  let selectorFn = null;
  for (const key in parentSelectors) {
    if (hostname.includes(`${key}.`)) {
      selectorFn = parentSelectors[key];
      break;
    }
  }

  if (selectorFn) {
    return selectorFn(node) || node.parentNode;
  }
  return node.parentNode;
}

function findClosestParent(node, matchingFunction) {
  let element = node;
  while (element && typeof element.hasAttribute === "function") {
    if (matchingFunction(element)) {
      return element;
    }
    element = element.parentNode;
  }
  return null;
}

window.addEventListener("load", function () {
  filterNodes();
});

setTimeout(filterNodes, 200);
setTimeout(filterNodes, 500);
setTimeout(filterNodes, 1000);
setInterval(filterNodes, 2000);

window.addEventListener("scroll", function () {
  filterNodes();
});
