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

    Draw.Arc.prototype.defaultDash = 5;

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

        if (options.fillStyle) {
            this.context.fillStyle = options.fillStyle;
            this.context.fill();
        }

        if (options.width) {
            this.context.lineWidth   = typeof options.width === 'number' ? options.width : this.defaultWidth;
            this.context.strokeStyle = typeof options.color === 'string' ? options.color : this.defaultColor;

            this.context.stroke();
        }

        return this;
    };

    Draw.Arc.prototype.drawDashed = function (start, radius, startAngle, endAngle, options) {
        var counterClockwise = options.counterClockwise ? true : false;
        var len = typeof options.dash === 'number' ? options.dash : this.defaultDash;

        var alpha = len / radius;

        if (counterClockwise) {
            alpha = -alpha;
        }

        if (startAngle > endAngle) {
            var loopIsFinished = function (start, end) {
                return start < end;
            };
        } else {
            var loopIsFinished = function (start, end) {
                return start > end;
            };
        }

        var dash = true;
        var dashStart = startAngle;
        while (!loopIsFinished(dashStart, endAngle)) {
            var nextAngle = dashStart + alpha;
            if (dash) {
                // Draw dash
                this.context.beginPath();

                this.context.arc(start.x, start.y, radius, dashStart, nextAngle, counterClockwise);

                this.context.lineWidth   = typeof options.width === 'number' ? options.width : this.defaultWidth;
                this.context.strokeStyle = typeof options.color === 'string' ? options.color : this.defaultColor;

                // Display line
                this.context.stroke();
            }

            dash = !dash;
            dashStart = nextAngle;
        }

        return this;
    };
})();