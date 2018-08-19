/*
 *  ssJS JavaScript Library v0.1.0
 *  Copyright 2018-2018 (c) Doron Mor <mobclown@gmail.com>
 *  Licensed under the MIT License.
 */

(function(global) {

  var utterance;
  var data = {};
  var ssComponents = [];

  function init(args) {
    utterance = new SpeechSynthesisUtterance();

    // utterance.voiceURI = 'Google UK English Female';
    utterance.lang = args.lang;
    utterance.pitch = args.pitch;
    utterance.rate = args.rate;
    utterance.text = args.text;
    utterance.volume = args.volume;

    data.lang = args.lang;
    data.pitch = args.pitch;
    data.rate = args.rate;
    data.text = args.text;
    data.volume = args.volume;

    return this;
  }

  function speak() {
    speechSynthesis.speak(utterance);
  }

  function getVoices() {
    // voice list is loaded async to the page
    // then sen an event listener
    window.speechSynthesis.onvoiceschanged = function() {
      var voices = window.speechSynthesis.getVoices();
      //  console.log(voices);
    };

    return this;
  }

  function setUtterance(args) {

    utterance = new SpeechSynthesisUtterance();

    utterance.lang = args.lang;
    utterance.pitch = args.pitch;
    utterance.rate = args.rate;
    utterance.text = args.text;
    utterance.volume = args.volume;

    ssComponents.push(utterance);

    return this;
  }

  var ss = {
    data: data,
    init: init,
    speak: speak,
    getVoices: getVoices,
    setUtterance: setUtterance,
    components: ssComponents
  };

  global.ss = ss;

})(this);