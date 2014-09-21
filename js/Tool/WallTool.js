/**
 * Wall Tool
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @param KeyLayer
     * @param GridFrame
     * @param WallLayer
     * @constructor
     */
    Tool.WallTool = function (GridFrame) {
        // Call parent constructor
        Tool.Common.AbstractTool.call(this, GridFrame);
    };

    /**
     * Extends Abstract Tool
     * @type {Tool.Common.AbstractTool}
     */
    Tool.WallTool.prototype = Object.create(Tool.Common.AbstractTool.prototype);
    Tool.WallTool.prototype.constructor = Tool.WallTool;

    Tool.WallTool.prototype.name       = 'WallTool';
    Tool.WallTool.prototype.layerName  = 'WallLayer';

    Tool.WallTool.prototype.current = {
        start: null,
        end: null
    };

    Tool.WallTool.prototype.getCommands = function () {
        var commands = Tool.Common.AbstractTool.prototype.getCommands.call(this);

        commands.push({ input: 'user.mouse', action: 'downLeft', method: this.startDrawing, context: this });
        commands.push({ input: 'user.mouse', action: 'move',     method: this.isDrawing   , context: this });
        commands.push({ input: 'user.mouse', action: 'upLeft',   method: this.stopDrawing , context: this });

        return commands;
    };

    Tool.WallTool.prototype.startDrawing = function (event) {
        if (this.gridFrame.isOnGrid(event.clientX, event.clientY)) {
            // Initialize wall
            this.current.start = this.current.end = this.gridFrame.getPosition(event.clientX, event.clientY);

            this.addKey('WallKey', this.current.start);

            // Disable cursor when user is drawing
            this.cursorEnabled = false;
        }

        return this;
    };

    Tool.WallTool.prototype.isDrawing = function (event) {
        if (this.gridFrame.isOnGrid(event.clientX, event.clientY) && this.current.start && this.current.end) {
            // Process current drawing wall
            var wallEnd = this.gridFrame.getPosition(event.clientX, event.clientY);
            if ( (wallEnd.line !== this.current.end.line || wallEnd.column !== this.current.end.column)
                && (wallEnd.line !== this.current.start.line || wallEnd.column !== this.current.start.column) ) {
                // Clear old wall
                this.layer.clearWall(this.current);

                // Clear old cursor
                this.layer.clearCursor(this.current.end);

                // Replace end
                this.current.end = wallEnd;

                // Draw new wall
                this.layer.drawWall(this.current);

                // Draw cursor
                this.layer.drawCursor(this.current.end);
            }
        }

        return this;
    };

    Tool.WallTool.prototype.stopDrawing = function (event) {
        if (this.gridFrame.isOnGrid(event.clientX, event.clientY)
            && this.current.start && this.current.end
            && this.current.start !== this.current.end) {
            // Clear old wall
            /*this.layer.clearWall(this.current);*/

            // Store generated wall
            this.layer.add({ start: this.current.start, end: this.current.end }); // Create new object to avoid references

            this.addKey('WallKey', this.current.end);
        }
        else {
            this.layer.clearWall(this.current);
        }

        // Enable cursor
        this.cursorEnabled = true;

        // Clear current drawing
        this.current.start = null;
        this.current.end   = null;

        return this;
    };
})();