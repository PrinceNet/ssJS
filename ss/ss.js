/*
 *  ssJS JavaScript Library v0.1.0
 *  Copyright 2018-2018 (c) Itamar Silverstein <itamarzil12345@gmail.com>
 *  Licensed under the MIT License.
 */

(function(global) {
  var selectedItem;
  var ssItems = {};

  function init() {
    var matches = document.querySelectorAll("[data-ss-item]");
    for (var i = 0; i < matches.length; i++) {
      var play = matches[i].getAttribute("data-ss-play");
      var newItem;

      switch (
        play // the kind of DOM traverse on the current ss element
      ) {
        case "shallow":
          var el = matches[i];
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
            play: play,
            listToPlay: null,
            name: matches[i].getAttribute("data-ss-item"),
            domElement: matches[i],
            lang: "en-GB",
            pitch: 1,
            rate: 1,
            text: text,
            volume: 1
          });
          ss.addItem(newItem);

          break;

        case "deep": // ordinary DOM traverse
          newItem = ss.createItem({
            play: play,
            listToPlay: null,
            name: matches[i].getAttribute("data-ss-item"),
            domElement: matches[i],
            lang: "en-GB",
            pitch: 1,
            rate: 1,
            text: matches[i].textContent,
            volume: 1
          });
          ss.addItem(newItem);
          break;

        case "BFS": // BFS traverse
          break;

        case "custom": // traverse with custom playlist
          var arrangedItems = [];
          var playIndexes = matches[i].querySelectorAll("[data-ss-playIndex]");
          for (let j = 0; j < playIndexes.length; j++) {
            let index = playIndexes[j].getAttribute("data-ss-playIndex");
            let text = playIndexes[j].innerText;
            var newItem = createItem({
              play: play,
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
            play: play,
            listToPlay: arrangedItems,
            name: matches[i].getAttribute("data-ss-item"),
            domElement: matches[i],
            lang: "en-GB",
            pitch: 1,
            rate: 1,
            text: matches[i].textContent,
            volume: 1
          });
          ss.addItem(newItem);
          break;
      }
    }
    return this;
  }

  function speakSelectedItem() {
    speechSynthesis.speak(selectedItem);
  }

  function getVoices() {
    window.speechSynthesis.onvoiceschanged = function() {
      var voices = window.speechSynthesis.getVoices();
    };
    return this;
  }

  function selectItem(itemName) {
    selectedItem = ssItems[itemName];
  }

  function playItem(item) {
    selectItem(item);
    var play = selectedItem.play;
    if (play == "BFS") {
      // BFS DOM traverse
    } else if (play == "shallow") {
      getVoices();
      speakSelectedItem();
    } else if (play == "deep") {
      // normal DOM traverse
      getVoices();
      speakSelectedItem();
    } else {
      // custom playlist traverse
      var list = selectedItem.listToPlay;
      for (let i = 0; i < list.length; i++) {
        selectedItem = list[i];
        speakSelectedItem();
      }
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
    newItem.name = args.name;
    newItem.lang = args.lang;
    newItem.pitch = args.pitch;
    newItem.rate = args.rate;
    newItem.text = args.text;
    newItem.volume = args.volume;
    newItem.domElement = args.domElement;
    newItem.play = args.play;
    newItem.listToPlay = args.listToPlay;
    return newItem;
  }

  function removeItem(item) {
    // remove an item from the list of ss Items
  }

  function playAllItems() {
    Object.keys(ssItems).forEach(function(key, index) {
      ss.playItem(key);
    });
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
