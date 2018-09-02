# ss.js

A lightweight javascript library for SpeechSynthesis API.

## Using the `ss` Object

the ss library provides an easy to use interface for using `Web Speech API`, enabling the user to speak text from the DOM.

Initialization is via the `.init()` method in use.js. This method scans the DOM, initialized and stores all ss voice items.

in ss js there are only 3 attributes needed to use the library:
data-ss-item and data-ss-play, data-ss-playIndex

example:

<p data-ss-item="ss-item-1" data-ss-play="standart">

for a standard scan (the default DOM scan which scans each sub-tree of the DOM element) use data-ss-play="standart"

example:

<p data-ss-item="ss-item-20" data-ss-play="standart">

for a custom scan with a custom-defined playlist, use:
data-ss-playlist="custom" and then specify the order on which you would like the children to be spoken using data-ss-playIndex

example:

<div data-ss-item="ss-item-1" data-ss-playlist="custom">
    <p data-ss-playIndex="3"> third </p>
    <p data-ss-playIndex="1"> first </p>
    <p data-ss-playIndex="2"> second </p>
</div> 
the above code will result in speaking 'first second third'

for other kind of scans: for example: data-ss-playlist="BFS" which scans the tree of the DOM element in BFS style.

Speak is via the `.speak()` method and works only after initialization.

use.js:
just ss.init();
and and then ss.playAllItems() for playing all items

ss.createItem(item) - add new item to ss.ssItems

for playing a specific item:
ss.selectItem('ss-item-1'); // the item's name in the html file

## License

ss.js is licensed under the MIT License.

Have fun!
