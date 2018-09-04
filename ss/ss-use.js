ss.setDefaultConfig({
  name: "A default ssItem Name",
  text: "A default ssItem Text",
  lang: "en-GB",
  pitch: 1,
  rate: 1,
  volume: 1,
  playStyle: null,
  listToPlay: null,
  playIndex: null,
  domElement: null
});

ss.init();

ss.configItem("ss-item-1", {
  lang: "en-GB",
  rate: 2
});

// ss.playItem("ss-item-1");
// ss.playItem("ss-item-0");
ss.playAllItems();
