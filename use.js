
ss.init({
    lang: 'en-GB',          // DOMString
    pitch: 1,               // float 0 - 2
    rate: 1,                // float 0.1 - 10
    text: 'This is a test', // DOMString
    volume: 1,              // float 0 - 1
}).shallow().speakShallows();

console.log(ss);
