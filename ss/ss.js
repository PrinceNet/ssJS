/*
 *  ssJS JavaScript Library v0.1.0
 *  Copyright 2018-2018 (c) Itamar Silverstein <itamarzil12345@gmail.com>
 *  Licensed under the MIT License.
 */

(function(global) {
  var ssItems = {};
  var selectedItem;
  var selectedConfig = {};

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

  function speakItem(item) {
    speechSynthesis.speak(item);
  }

  function speakSelectedItem() {
    speechSynthesis.speak(selectedItem);
  }

  function getVoices() {
    window.speechSynthesis.onvoiceschanged = function() {
      window.speechSynthesis.getVoices();
    };
    return this;
  }

  function selectItem(itemName) {
    selectedItem = ssItems[itemName];
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

  function setVoice() {
    // setting the voice of the ss Item
  }

  function addItem(item) {
    var itemWithKey = {};
    itemWithKey[item.name] = newItem;
    ssItems[item.name] = newItem;
    return this;
  }

  function createItem(args) {
    newItem = new SpeechSynthesisUtterance();
    Object.assign(newItem, newItem, args);
    return newItem;
  }

  function removeItem(item) {
    // remove an item from the list of ss Items
  }

  function playAllItems() {
    Object.keys(ssItems).forEach(function(itemName) {
      ss.playItem(itemName);
    });
  }
  function getDOMElements() {
    return document.querySelectorAll("[data-ss-item]");
  }
  function initDeepItems() {
    newItem = ss.createItem({
      playStyle: selectedConfig.playStyle,
      listToPlay: null,
      name: selectedConfig.element.getAttribute("data-ss-item"),
      domElement: selectedConfig.element,
      lang: "en-GB",
      pitch: 1, // TODO: create default json properties
      rate: 1, //       to fill when not mentions by the use
      text: selectedConfig.element.textContent,
      volume: 1
    });
    ss.addItem(newItem);
  }
  function initShallowItems() {
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
    newItem = ss.createItem({
      playStyle: selectedConfig.playStyle,
      listToPlay: null,
      name: selectedConfig.element.getAttribute("data-ss-item"),
      domElement: selectedConfig.element,
      lang: "en-GB",
      pitch: 1,
      rate: 1,
      text: text,
      volume: 1
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
        listToPlay: null,
        name: index,
        domElement: playIndexes[i],
        lang: "en-GB",
        pitch: 1,
        rate: 1,
        text: text,
        volume: 1
      });
      arrangedItems[index] = newItem;
    }
    newItem = ss.createItem({
      playStyle: playStyle,
      listToPlay: arrangedItems,
      name: dselectedConfig.element.getAttribute("data-ss-item"),
      domElement: selectedConfig.element,
      lang: "en-GB",
      pitch: 1,
      rate: 1,
      text: selectedConfig.element.textContent,
      volume: 1
    });
    ss.addItem(newItem);
  }

  function getPlayStyle(domElement) {
    return domElement.getAttribute("data-ss-playStyle");
  }

  var publicAPI = {
    init: init,
    speakSelectedItem: speakSelectedItem,
    getVoices: getVoices,
    createItem: createItem,
    addItem: addItem,
    ssItems: ssItems,
    playAllItems: playAllItems,
    playItem: playItem,
    selectItem: selectItem
  };

  global.ss = publicAPI;
})(this);
