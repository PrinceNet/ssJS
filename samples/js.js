var inputTxt = document.querySelector('.read-me');
var btnSelect = document.querySelector('.start-read');

// var voices = [];


// var voices = window.speechSynthesis.getVoices();
// console.log(voices);


// function speak(){
//     if (window.speechSynthesis.speaking) {
//         console.error('speechSynthesis.speaking');
//         return;
//     } else {
//         var msg = new SpeechSynthesisUtterance();
//         // var voices = window.speechSynthesis.getVoices();
//         // console.log(voices);
//         // msg.voice = voices[3]; // Note: some voices don't support altering params
//         msg.voiceURI = 'Google UK English Female';
//         msg.volume = 1; // 0 to 1
//         msg.rate = 1; // 0.1 to 10
//         msg.pitch = 1; //0 to 2
//         msg.lang = 'en-GB';
//         msg.text = inputTxt.innerHTML;
//
//         window.speechSynthesis.speak(msg);
//         // SpeechSynthesis.cancel();
//   }
// }

var speechUtteranceChunker = function (utt, settings, callback) {
    settings = settings || {};
    var newUtt;
    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
    if (utt.voice && utt.voice.voiceURI === 'native') { // Not part of the spec
        newUtt = utt;
        newUtt.text = txt;
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
            }
            if (callback !== undefined) {
                callback();
            }
        });
    }
    else {
        var chunkLength = (settings && settings.chunkLength) || 160;
        var pattRegex = new RegExp('^[\\s\\S]{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[.!?,]{1}|^[\\s\\S]{1,' + chunkLength + '}$|^[\\s\\S]{1,' + chunkLength + '} ');
        var chunkArr = txt.match(pattRegex);

        if (chunkArr[0] === undefined || chunkArr[0].length <= 2) {
            //call once all text has been spoken...
            if (callback !== undefined) {
                callback();
            }
            return;
        }
        var chunk = chunkArr[0];
        newUtt = new SpeechSynthesisUtterance(chunk);
        var x;
        for (x in utt) {
            if (utt.hasOwnProperty(x) && x !== 'text') {
                newUtt[x] = utt[x];
            }
        }
        newUtt.addEventListener('end', function () {
            if (speechUtteranceChunker.cancel) {
                speechUtteranceChunker.cancel = false;
                return;
            }
            settings.offset = settings.offset || 0;
            settings.offset += chunk.length - 1;
            speechUtteranceChunker(utt, settings, callback);
        });
    }

    if (settings.modifier) {
        settings.modifier(newUtt);
    }
    console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
    //placing the speak invocation inside a callback fixes ordering and onend issues.
    setTimeout(function () {
        speechSynthesis.speak(newUtt);
    }, 0);
};







// const speak = async text => {
//
//   const message = new SpeechSynthesisUtterance(text);
//   message.voiceURI = 'Google UK English Female';
//   message.lang = 'en-GB';
//   message.rate = 1; // 0.1 to 10
//   message.pitch = 1; //0 to 2
//   speechSynthesis.speak(message);
// }

btnSelect.onclick = function(){
  // console.log(inputTxt.textContent);
  // speak(inputTxt.textContent);
  // speak('This is somehow working...');

  //create an utterance as you normally would...
  var myLongText = inputTxt.textContent;

  var utterance = new SpeechSynthesisUtterance(myLongText);

  //modify it as you normally would
  var voiceArr = speechSynthesis.getVoices();
  console.log(voiceArr);
  utterance.voice = voiceArr[3];
  utterance.voiceURI = 'Google UK English Female';
  utterance.lang = 'en-GB';
  // utterance.rate = 0.5; // 0.1 to 10
  // utterance.pitch = 1; //0 to 2

  //pass it into the chunking function to have it played out.
  //you can set the max number of characters by changing the chunkLength property below.
  //a callback function can also be added that will fire once the entire text has been spoken.
  speechUtteranceChunker(utterance, {
      chunkLength: 120
  }, function () {
      //some code to execute when done
      console.log('done');
  });
}
