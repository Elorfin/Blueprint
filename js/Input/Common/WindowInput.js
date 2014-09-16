/**
 * Window Input
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Input.Common.WindowInput = function () {
        Input.Common.AbstractInput.call(this);

        // Attach events
        for (var actionName in this.actionMap) {
            this.view.addEventListener(this.actionMap[actionName], function (actionName, event) {
                this.callActions(actionName, event);
            }.bind(this, actionName), false);
        }
    };

    /**
     * Extends Abstract Input
     * @type {Input.Common.AbstractInput}
     */
    Input.Common.WindowInput.prototype = Object.create(Input.Common.AbstractInput.prototype);
    Input.Common.WindowInput.prototype.constructor = Input.Common.WindowInput;

    Input.Common.WindowInput.prototype.view = window;
})();