/*
 *  ssJS JavaScript Library v0.1.0
 *  Copyright 2018-2018 (c) Itamar Silverstein <itamarzil12345@gmail.com>
 *  Licensed under the MIT License.
 */

(function(global) {
  var ssItems = {};
  var defaultConfig;
  var selectedItem;
  var selectedConfig = {};

  ////////////////////////////
  // Initialization Methods //
  ////////////////////////////

  function init() {
    var domElements = getDOMElements();
    for (let i = 0; i < domElements.length; i++) {
      var playStyle = getPlayStyle(domElements[i]);
      selectedConfig.element = domElements[i];
      selectedConfig.playStyle = playStyle;

      switch (
        playStyle // The kind of DOM traverse on the current ss element */
      ) {
        case "ss-shallow": // only the element's text
          initShallowItems();
          break;

        case "deep": // DFS DOM traverse
          initDeepItems();
          break;

        case "customPlaylist": // traverse with custom playlist
          initCustomItems();
          break;
        case "BFS":
          break;
        case "default":
          break;
      }
    }
    return this;
  }

  function initDeepItems() {
    let newItem = ss.createItem();
    newItem = ss.setItem(newItem, {
      playStyle: selectedConfig.playStyle,
      name: selectedConfig.element.getAttribute("data-ss-item"),
      domElement: selectedConfig.element,
      text: selectedConfig.element.textContent
    });
    ss.addItem(newItem);
  }

  function initShallowItems() {
    let newItem = ss.createItem();
    newItem = ss.setItem(newItem, {
      playStyle: selectedConfig.playStyle,
      name: selectedConfig.element.getAttribute("data-ss-item"),
      domElement: selectedConfig.element,
      text: getShallowText()
    });
    ss.addItem(newItem);
  }
  function initCustomItems() {
    var arrangedItems = [];
    var playIndexes = selectedConfig.element.querySelectorAll(
      "[data-ss-playIndex]"
    );
    for (let j = 0; j < playIndexes.length; j++) {
      let index = playIndexes[j].getAttribute("data-ss-playIndex");
      let text = playIndexes[j].innerText;
      var newItem = createItem({
        playStyle: playStyle,
        playIndex: index,
        name: index,
        domElement: playIndexes[i],
        text: text
      });
      arrangedItems[index] = newItem;
    }
    newItem = ss.createItem({
      playStyle: playStyle,
      listToPlay: arrangedItems,
      name: dselectedConfig.element.getAttribute("data-ss-item"),
      domElement: selectedConfig.element,
      text: selectedConfig.element.textContent
    });
    ss.addItem(newItem);
  }

  ////////////////////////////
  //  Play/Speak Methods  ////
  ////////////////////////////

  function speakItem(item) {
    speechSynthesis.speak(item);
  }

  function speakSelectedItem() {
    speechSynthesis.speak(selectedItem);
  }
  function playItem(item) {
    selectItem(item);
    var playStyle = selectedItem.playStyle;
    switch (playStyle) {
      case "ss-shallow":
      case "deep":
        getVoices();
        speakSelectedItem();
        break;

      case "customPlaylist":
        playCustomItem();
        break;

      case "BFS":
        break;

      default:
        break;
    }
  }

  function playCustomItem() {
    var list = selectedItem.listToPlay;
    for (let i = 0; i < list.length; i++) {
      selectedItem = list[i];
      speakSelectedItem();
    }
  }

  function playAllItems() {
    Object.keys(ssItems).forEach(function(itemName) {
      ss.playItem(itemName);
    });
  }

  function getPlayStyle(domElement) {
    return domElement.getAttribute("data-ss-playStyle");
  }

  function getVoices() {
    window.speechSynthesis.onvoiceschanged = function() {
      window.speechSynthesis.getVoices();
    };
    return this;
  }

  ///////////////////
  // Other Methods //
  ///////////////////

  function selectItem(itemName) {
    selectedItem = ssItems[itemName];
  }

  function configItem(itemName, newConfig) {
    var item = ssItems[itemName];
    Object.assign(item, item, newConfig);
  }

  function createItem() {
    newItem = new SpeechSynthesisUtterance();
    Object.assign(newItem, newItem, defaultConfig);
    return newItem;
  }

  function setItem(newItem, properties) {
    Object.assign(newItem, newItem, properties);
    return newItem;
  }

  function addItem(item) {
    var itemWithKey = {};
    itemWithKey[item.name] = newItem;
    ssItems[item.name] = newItem;
    return this;
  }

  function getDOMElements() {
    return document.querySelectorAll("[data-ss-item]");
  }

  function getShallowText() {
    var el = selectedConfig.element;
    var child = el.firstChild;
    var texts = [];
    while (child) {
      if (child.nodeType == Node.TEXT_NODE) {
        texts.push(child.data);
      }
      child = child.nextSibling;
    }
    var text = texts.join("");
    return text;
  }

  function setDefaultConfig(config) {
    defaultConfig = config;
  }

  var publicAPI = {
    init: init,
    setDefaultConfig: setDefaultConfig,
    configItem: configItem,
    speakSelectedItem: speakSelectedItem,
    getVoices: getVoices,
    createItem: createItem,
    addItem: addItem,
    ssItems: ssItems,
    playAllItems: playAllItems,
    playItem: playItem,
    selectItem: selectItem,
    setItem: setItem
  };

  global.ss = publicAPI;
})(this);
