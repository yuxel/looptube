// ==UserScript==
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// @include        https://*.youtube.com/watch?v=*
// @include        https://*.youtube.com/watch?v=*
// ==/UserScript==

/*jslint white: true, browser: true, devel: true, 
 windows: true, undef: true, 
 nomen: true, eqeqeq: true, plusplus: true, bitwise: true, 
 regexp: true, newcap: true, immed: true */
/*global window */

(function (document) {
    window.addEventListener("DOMContentLoaded", function () {
        var timer,
            interval = 1000; //1 second

        //get player element for YouTube JS API
        var player = document.getElementById('movie_player');

        if (player) {

            var callback = function () {
                if (player.getPlayerState() === 0) {
                    player.seekTo(0);
                }
            };

            var startLoop = function () {
                timer = setInterval(callback, interval);
            };

            var stopLoop = function () {
                clearInterval(timer);
            };

            var createButton = function (defaultState) {
                var buttonClass = defaultState ? "selected" : "";
                var containerSpan = document.createElement('span');
                var loopButtonStyle = "<style>";
                loopButtonStyle += "#loopTubeButton {margin-bottom:9px !important}";
                loopButtonStyle += "#loopTubeButton span.selected {color:#FF0000}";
                loopButtonStyle += "</style>";

                var loopButton = '<button id="loopTubeButton" ';
                loopButton += 'class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip"'; 
                loopButton += 'type="button" title="Loop this video">';
                loopButton += '<span id="loopTubeSpan" class="' + buttonClass + '">Loop</span>';
                loopButton += '</button>';

                containerSpan.innerHTML = loopButtonStyle + loopButton;
                document.getElementById("watch-actions-right").appendChild(containerSpan);

                var loopTubeSpan = document.getElementById("loopTubeSpan");

                if (defaultState) {
                    startLoop();
                }

                containerSpan.onclick = function () {
                    var className = loopTubeSpan.className;
                    if (className === "selected") {
                        className = "";
                        stopLoop();
                    }
                    else {
                        className = "selected";
                        startLoop();
                    }

                    loopTubeSpan.className = className;
                };
            };

            var state = widget.preferences.alwaysLoop ? true : false;
            createButton(state);
        }
    }, false);
}(document));
