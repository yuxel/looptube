// ==UserScript==
// @include        http://*.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// ==/UserScript==

/*jslint white: true, browser: true, devel: true, 
 windows: true, onevar: true, undef: true, 
 nomen: true, eqeqeq: true, plusplus: true, bitwise: true, 
 regexp: true, newcap: true, immed: true */

(function (document) {
    addEventListener("DOMContentLoaded", function () {
        var player,
            callback,
            interval = 1000; //1 second

        //get player element for YouTube JS API
        player = document.getElementById('movie_player');

        if (player) {
            callback = function () {
                //request isLoopTubeActived data from extension
                opera.extension.postMessage("isLoopTubeActive");
                opera.extension.onmessage = function (e) {
                    //if it's activated and player stopped, seek to start 
                    if (e.data === true && player.getPlayerState() === 0) {
                        player.seekTo(0);
                    }
                };
            };

            setInterval(callback, interval);
        }
    }, false);
}(document));
