(function () {
    'use strict';

    /**
     * Class constructor
     * @param context
     * @constructor
     */
    Draw.Arc = function (context) {
        this.context = context;
    };

    Draw.Arc.prototype.constructor = Draw.Arc;

    Draw.Arc.prototype.context = null;

    /**
     * Color to use when not set by caller
     */
    Draw.Arc.prototype.defaultColor = 'black';

    /**
     * Width to use when not set by caller
     */
    Draw.Arc.prototype.defaultWidth = 1;

    /**
     * Draw a solid arc on canvas
     * @param layer
     * @param start
     * @param end
     * @param options
     */
    Draw.Arc.prototype.drawSolid = function (start, radius, startAngle, endAngle, options) {
        var counterClockwise = options.counterClockwise ? true : false;

        // Start new canvas path
        this.context.beginPath();

        // Draw arc
        this.context.arc(start.x, start.y, radius, startAngle, endAngle, counterClockwise);

        // End canvas path
        this.context.closePath();

        // Set line styles
        this.context.lineWidth   = typeof options.width === 'number' ? options.width : this.defaultWidth;
        this.context.strokeStyle = typeof options.color === 'string' ? options.color : this.defaultColor;

        // Display line
        this.context.stroke();

        return this;
    };
})();