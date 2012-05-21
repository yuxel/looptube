// ==UserScript==
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
// @include        https://*.youtube.com/watch?*
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

        //get playerSwf element for YouTube JS API
        var playerSwf = document.getElementById('movie_player'),
            playerHTML5 = document.getElementsByTagName("video") && document.getElementsByTagName("video")[0],
            loopActive = false;

        if (playerSwf || playerHTML5) {
            var callback = function () {
                if (playerSwf.getPlayerState() === 0) {
                    playerSwf.seekTo(0);
                    playerSwf.playVideo();
                }
            };

            var startLoop = function () {
                loopActive = true;
                if (playerSwf) {
                    timer = setInterval(callback, interval);
                }
                if (playerHTML5 && playerHTML5.ended) {
                    playerHTML5.play();
                }
            };

            var stopLoop = function () {
                loopActive = false;
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

            var state = (widget.preferences.alwaysLoop == 1)? true : false;
            createButton(state);

            if (playerHTML5) {
                playerHTML5.addEventListener("ended", function () {
                    if (loopActive) {
                        playerHTML5.play();
                    }
                }, false);
            }
        }

    }, false);
}(document));
