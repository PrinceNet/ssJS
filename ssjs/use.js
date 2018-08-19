var matches = document.querySelectorAll("[class*='ssComponent']");
console.log(matches)
// default utteran
ss.init({
  lang: 'en-GB', // DOMString
  pitch: 1, // float 0 - 2
  rate: 1, // float 0.1 - 10
  text: 'test', // DOMString
  volume: 1, // float 0 - 1
}).getVoices().speak();

for (var i = 0; i < matches.length; i++) {
  console.log('matches:', matches[i].textContent);
  ss.setUtterance({
    lang: 'en-GB', // DOMString
    pitch: 1, // float 0 - 2
    rate: 1, // float 0.1 - 10
    text: matches[i].textContent,
    volume: 1, // float 0 - 1
  }).getVoices().speak();
}

console.log('ssComponents:', ss.components);