/*
*  ssJS JavaScript Library v0.1.0
*  Copyright 2018-2018 (c) Doron Mor <mobclown@gmail.com>
*  Licensed under the MIT License.
*/

(function(global) {

    let utterance;
    let data = {};
    let shallowArr = [];

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

    function speakShallows() {
        let $this = this;
        this.shallowArr.forEach(function(element) {
            let u = new SpeechSynthesisUtterance();
            u.lang = $this.data.lang;
            u.pitch = $this.data.pitch;
            u.rate = $this.data.rate;
            u.text = $this.data.text;
            u.volume = $this.data.volume;
            u.text = element.text;
            speechSynthesis.speak(u);
        });
    }

    function shallow() {
        let shallow = document.querySelectorAll(".ss-shallow");
        let text = '';

        shallow.forEach(function(element) {
            text = '';
            element.childNodes.forEach(function(child) {
                if(child.nodeType === Node.TEXT_NODE){
                    text += ' ' + child.nodeValue.replace(/\s\s+/g, ' ').trim();
                }
            });

            shallowArr.push({
                domElement: element,
                text: text,
            });
        });

        return this;
    }

    function getVoices() {
        // voice list is loaded async to the page
        // then sen an event listener
        window.speechSynthesis.onvoiceschanged = function() {
            let voices = window.speechSynthesis.getVoices();
            console.log(voices);
        };

        return this;
    }

    let ss = {
        data: data,
        init: init,
        speak: speak,
        getVoices: getVoices,
        shallow: shallow,
        shallowArr: shallowArr,
        speakShallows: speakShallows,
    };

    global.ss = ss;

})(this);
