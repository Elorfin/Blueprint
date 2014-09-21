/**
 * Tool Factory
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Factory.ToolFactory = function (GridFrame) {
        // Call parent constructor
        Factory.Common.AbstractFactory.call(this, GridFrame);
    };

    /**
     * Extends AbstractFactory
     * @type {Factory.Common.AbstractFactory}
     */
    Factory.ToolFactory.prototype = Object.create(Factory.Common.AbstractFactory.prototype);
    Factory.ToolFactory.prototype.constructor = Factory.ToolFactory;

    Factory.ToolFactory.prototype.create = function (toolName) {
        var tool = null;
        if (Tool[toolName]) {
            tool = new Tool[toolName](this.gridFrame);
        } else {
            console.error('Tool Factory : Unknown Tool "' + toolName + '".');
        }

        return tool;
    };
})();