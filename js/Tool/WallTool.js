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
    Tool.WallTool = function (GridFrame, KeyFrame) {
        // Call parent constructor
        Tool.Common.AbstractTool.call(this, GridFrame, KeyFrame);
    };

    /**
     * Extends Abstract Tool
     * @type {Tool.Common.AbstractTool}
     */
    Tool.WallTool.prototype = Object.create(Tool.Common.AbstractTool.prototype);
    Tool.WallTool.prototype.constructor = Tool.WallTool;

    Tool.Common.AbstractTool.prototype.name      = 'WallTool';
    Tool.Common.AbstractTool.prototype.layerName = 'WallLayer';

    Tool.WallTool.prototype.current = {
        start: null,
        end: null
    };

    Tool.WallTool.prototype.getCommands = function () {
        return [
            { input: 'user.mouse', action: 'down', method: this.startDrawing, context: this, args: [] },
            { input: 'user.mouse', action: 'move', method: this.isDrawing   , context: this, args: [] },
            { input: 'user.mouse', action: 'up',   method: this.stopDrawing , context: this, args: [] }
        ];
    };

    Tool.WallTool.prototype.startDrawing = function (event) {
        if (this.gridFrame.isOnGrid(event.clientX, event.clientY)) {
            // Initialize wall
            this.current.start = this.current.end = this.gridFrame.getPosition(event.clientX, event.clientY);

            this.addKey('WallKey', this.current.start);
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

                // Replace end
                this.current.end = wallEnd;

                // Draw new wall
                this.layer.drawWall(this.current);

                // Redraw existing walls
                this.layer.draw();
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

            // Redraw existing walls
            this.layer.draw();
        }

        // Clear current drawing
        this.current.start = null;
        this.current.end   = null;

        return this;
    };
})();