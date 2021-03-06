'use strict';

Draw.Line = function (context) {
    this.context = context;
};

Draw.Line.prototype = {
    context: null,

    /**
     * Color to use when not set by caller
     */
    defaultColor: 'black',

    /**
     * Width to use when not set by caller
     */
    defaultWidth: 1,

    defaultDash: 5,

    defaultRadius: 1,

    /**
     * Class constructor
     */
    constructor: Draw.Line,

    /**
     * Draw a solid line on canvas
     * @param layer
     * @param start
     * @param end
     * @param options
     */
    drawSolid: function (start, end, options) {
        // Start new canvas path
        this.context.beginPath();

        // Move to start of line position
        this.context.moveTo(start.x, start.y);

        // Draw to end of line position
        this.context.lineTo(end.x, end.y);

        // End canvas path
        this.context.closePath();

        // Set line styles
        this.context.lineWidth   = typeof options.width === 'number' ? options.width : this.defaultWidth;
        this.context.strokeStyle = typeof options.color === 'string' ? options.color : this.defaultColor;

        // Display line
        this.context.stroke();

        return this;
    },

    /**
     * Draw a dashed line on canvas
     * @param layer
     * @param start
     * @param end
     * @param options
     */
    drawDashed: function (start, end, options) {
        this.context.beginPath();

        var lt = function (a, b) { return a <= b; };
        var gt = function (a, b) { return a >= b; };
        var capmin = function (a, b) { return Math.min(a, b); };
        var capmax = function (a, b) { return Math.max(a, b); };

        var checkX = { thereYet: gt, cap: capmin };
        var checkY = { thereYet: gt, cap: capmin };

        if (start.y - end.y > 0) {
            checkY.thereYet = lt;
            checkY.cap = capmax;
        }
        if (start.x - end.x > 0) {
            checkX.thereYet = lt;
            checkX.cap = capmax;
        }

        this.context.moveTo(start.x, start.y);
        var offsetX = start.x;
        var offsetY = start.y;

        var len = typeof options.dash === 'number' ? options.dash : this.defaultDash;

        var dash = true;
        while (!(checkX.thereYet(offsetX, end.x) && checkY.thereYet(offsetY, end.y))) {
            var ang = Math.atan2(end.y - start.y, end.x - start.x);

            offsetX = checkX.cap(end.x, offsetX + (Math.cos(ang) * len));
            offsetY = checkY.cap(end.y, offsetY + (Math.sin(ang) * len));

            if (dash) this.context.lineTo(offsetX, offsetY);
            else this.context.moveTo(offsetX, offsetY);

            dash = !dash;
        }

        // End canvas path
        this.context.closePath();

        // Set line styles
        this.context.lineWidth   = typeof options.width === 'number' ? options.width : this.defaultWidth;
        this.context.strokeStyle = typeof options.color === 'string' ? options.color : this.defaultColor;

        // Display line
        this.context.stroke();

        return this;
    },

    /**
     * Draw a dotted line on canvas
     * @param layer
     * @param start
     * @param end
     * @param options
     */
    drawDotted: function (start, end, options) {
        this.context.beginPath();

        var lt = function (a, b) { return a <= b; };
        var gt = function (a, b) { return a >= b; };
        var capmin = function (a, b) { return Math.min(a, b); };
        var capmax = function (a, b) { return Math.max(a, b); };

        var checkX = { thereYet: gt, cap: capmin };
        var checkY = { thereYet: gt, cap: capmin };

        if (start.y - end.y > 0) {
            checkY.thereYet = lt;
            checkY.cap = capmax;
        }
        if (start.x - end.x > 0) {
            checkX.thereYet = lt;
            checkX.cap = capmax;
        }

        this.context.moveTo(start.x, start.y);
        var offsetX = start.x;
        var offsetY = start.y;

        var radius  = typeof options.radius  === 'number' ? options.radius  : this.defaultRadius;
        var spacing = typeof options.spacing === 'number' ? options.spacing : radius * 2;

        var dot = true;
        while (!(checkX.thereYet(offsetX, end.x) && checkY.thereYet(offsetY, end.y))) {
            var ang = Math.atan2(end.y - start.y, end.x - start.x);

            offsetX = checkX.cap(end.x, offsetX + (Math.cos(ang) * (spacing)));
            offsetY = checkY.cap(end.y, offsetY + (Math.sin(ang) * (spacing)));

            if (dot) {
                // Draw dot
                this.context.arc(offsetX, offsetY, radius, 0, 2 * Math.PI, false);
            }
            else {
                // Move to next position
                this.context.moveTo(offsetX, offsetY);
            }

            dot = !dot;
        }

        // End canvas path
        this.context.closePath();

        // Set dots styles
        this.context.fillStyle = typeof options.color === 'string' ? options.color : this.defaultColor;

        // Display line
        this.context.fill();

        return this;
    }
};