(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Input.User.MouseInput = function () {
        Input.Common.WindowInput.call(this);
    };

    /**
     * Extends Window Input
     * @type {Input.Common.WindowInput}
     */
    Input.User.MouseInput.prototype = Object.create(Input.Common.WindowInput.prototype);
    Input.User.MouseInput.prototype.constructor = Input.User.MouseInput;

    /**
     * Available events
     * @type {Array}
     */
    Input.User.MouseInput.prototype.actionMap = {
        hover: 'mouseover',
        out:   'mouseout',
        move:  'mousemove',
        up:    'mouseup',
        down:  'mousedown',
        click: 'click'
    };

    Input.User.MouseInput.prototype.actions = {
        hover: [],
        out:   [],
        move:  [],
        up:    [],
        down:  [],
        click: []
    };
})();