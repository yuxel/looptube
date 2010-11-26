/*jslint white: true, browser: true, devel: true, 
 windows: true, onevar: true, undef: true, 
 nomen: true, eqeqeq: true, plusplus: true, bitwise: true, 
 regexp: true, newcap: true, immed: true,  */
/*global window */

(function () {
    window.addEventListener("load", function () {
        var button,
            isActive = false,
            icons = {
                activated : "icons/logo_active.png",
                deActivated : "icons/logo_passive.png"
            };

        //create and append button to toolbar      
        button = opera.contexts.toolbar.createItem({
            disabled: false,
            title: "LoopTube Disabled",
            icon: icons.deActivated
        });

        opera.contexts.toolbar.addItem(button);

        //change isActive status on click
        button.addEventListener("click", function () {
            if (isActive) {
                button.title = "LoopTube Disabled";
                button.icon = icons.deActivated;
                isActive = false;
            }
            else {
                button.title = "LoopTube Enabled";
                button.icon = icons.activated;
                isActive = true;
            }
        }, false);

        //send response to userjs
        opera.extension.onmessage = function (e) {
            if (e.data === "isLoopTubeActive") { 
                e.source.postMessage(isActive); 
            }
        };

    }, false);
}());
