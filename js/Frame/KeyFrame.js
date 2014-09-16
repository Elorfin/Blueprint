/**
 * KeyFrame
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Frame.KeyFrame = function () {

    };

    Frame.KeyFrame.prototype.constructor = Frame.KeyFrame;

    Frame.KeyFrame.prototype.keys = [];

    Frame.KeyFrame.prototype.add = function (keyName, position) {
        // Calculate ID of the key
        var id = keyName + '-' + position.line + '-' + position.column;

        // Check if the key already exists
        if (typeof this.keys[id] === 'undefined') {
            var key = new Key[keyName](this.grid, this.userInput, position);

            this.keys[id] = key;
        }

        return this;
    };
})();