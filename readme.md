# ss.js

A lightweight javascript library for SpeechSynthesis API.

## Using the `ss` Object

ss provide an easy to use interface for using `Web Speech API`.

Initialization is via the `.init(params)` method. Speak is via the `.speak()` method and works only after initialization.

```js
ss.init({
    lang: 'en-GB',          // DOMString
    pitch: 1,               // float 0 - 2
    rate: 1,                // float 0.1 - 10
    text: 'This is a test', // DOMString
    volume: 1,              // float 0 - 1
}).speak();
```

## License

ss.js is licensed under the MIT License.


Have fun!
