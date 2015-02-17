(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Tool.DoorTool = function (GridFrame) {
        // Call parent constructor
        Tool.Common.AbstractTool.call(this, GridFrame);
    };

    /**
     * Extends Abstract Tool
     * @type {Tool.Common.AbstractTool}
     */
    Tool.DoorTool.prototype = Object.create(Tool.Common.AbstractTool.prototype);
    Tool.DoorTool.prototype.constructor = Tool.DoorTool;

    Tool.DoorTool.prototype.name       = 'DoorTool';
    Tool.DoorTool.prototype.layerName  = 'DoorLayer';

    Tool.DoorTool.prototype.getCommands = function () {
        var commands = Tool.Common.AbstractTool.prototype.getCommands.call(this);

        commands.push({ input: 'user.mouse', action: 'clickLeft', method: this.draw, context: this, args: [] });

        return commands;
    };

    Tool.DoorTool.prototype.draw = function (event) {
        if (this.gridFrame.isOnGrid(event.clientX, event.clientY)) {
            console.log('draw door');

            var position = this.gridFrame.getPosition(event.clientX, event.clientY);
        }
    };
})();