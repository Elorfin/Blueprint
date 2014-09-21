(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Tool.WindowTool = function (GridFrame) {
        // Call parent constructor
        Tool.Common.AbstractTool.call(this, GridFrame);
    };

    /**
     * Extends Abstract Tool
     * @type {Tool.Common.AbstractTool}
     */
    Tool.WindowTool.prototype = Object.create(Tool.Common.AbstractTool.prototype);
    Tool.WindowTool.prototype.constructor = Tool.WindowTool;

    Tool.WindowTool.prototype.name       = 'WindowTool';
    Tool.WindowTool.prototype.layerName  = 'WindowLayer';

    Tool.WindowTool.prototype.getCommands = function () {
        var commands = Tool.Common.AbstractTool.prototype.getCommands.call(this);

        commands.push({ input: 'user.mouse', action: 'clickLeft', method: this.draw, context: this, args: [] });

        return commands;
    };

    Tool.WindowTool.prototype.draw = function (event) {
        if (this.gridFrame.isOnGrid(event.clientX, event.clientY)) {
            console.log('draw window');
        }
    };
})();