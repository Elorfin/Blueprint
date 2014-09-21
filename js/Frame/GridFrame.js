/**
 * Grid Frame
 * Used to position elements
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Frame.GridFrame = function (width, height) {
        this.resize(width, height);
    };

    Frame.GridFrame.prototype.constructor = Frame.GridFrame;

    /**
     * Current viewport
     * @type {object}
     */
    Frame.GridFrame.prototype.view = window;

    /**
     * Height of the Grid
     * @type {number}
     */
    Frame.GridFrame.prototype.height = 0;

    /**
     * Width of the Grid
     * @type {number}
     */
    Frame.GridFrame.prototype.width = 0;

    /**
     * Configuration of the grid
     * Options :
     *   - amount       : Number of squares on the larger side of the container
     *   - size         : Size of the lines
     *   - subdivisions : Number of squares (delimited by dotted lines) between two solid lines
     * @type {{
     *      amount      : number,
     *      size        : number,
     *      subdivisions: number
     * }}
     */
    Frame.GridFrame.prototype.config = {
        amount: 64,
        size: 1,
        subdivisions: 4
    };

    /**
     * Position Y for each line of the grid
     * @type {Array}
     */
    Frame.GridFrame.prototype.lines = [];

    /**
     * Position X for each column of the grid
     * @type {Array}
     */
    Frame.GridFrame.prototype.columns = [];

    /**
     * Registered callbacks to fire when Grid is recalculated
     * @type {Array}
     */
    Frame.GridFrame.prototype.onChangeCallbacks = [];

    /**
     * Get real position for line and column
     * @param   {number} line
     * @param   {number} column
     * @returns {{ x: number, y: number }}
     */
    Frame.GridFrame.prototype.getXY = function (line, column) {
        var y = this.lines[line];
        if (!y) {
            console.warn('Grid system : Unknown line number ' + line + '.');
            y = 0;
        }

        var x = this.columns[column];
        if (!x) {
            console.warn('Grid system : Unknown column number ' + column + '.');
            x = 0;
        }

        return { x: x, y: y };
    };

    /**
     * Get line and column from x and y position
     * @param   {number} x
     * @param   {number} y
     * @returns {{ line: number, column: number }}
     */
    Frame.GridFrame.prototype.getPosition = function (x, y) {
        var line   = 0;
        var column = 0;

        if (this.isOnGrid(x, y)) {
            line = this.lines.indexOf(y);
            if (-1 === line) {
                line = this.getNearest(this.lines, y);
            }

            column = this.columns.indexOf(x);
            if (-1 === column) {
                column = this.getNearest(this.columns, x);
            }
        }

        return { line: line, column: column };
    };

    /**
     * Get the nearest intersection for the given position
     * @param   {Array}  axe
     * @param   {number} position
     * @returns {number}
     */
    Frame.GridFrame.prototype.getNearest = function (axe, position) {
        var nearest = 0;

        for (var i = 0; i < axe.length; i++) {
            var current = axe[i];
            var next = axe[i + 1];

            if (typeof (next) === 'undefined') {
                nearest = i;
                break;
            } else if (current <= position && position <= next) {
                var intervalMin = position - current;
                var intervalMax = next - position;

                if (intervalMin <= intervalMax) {
                    nearest = i;
                } else {
                    nearest = i + 1;
                }

                break;
            }
        }

        return nearest;
    };

    /**
     * Check if coordinates are on the Grid
     * @param   {number} x
     * @param   {number} y
     * @returns {boolean}
     */
    Frame.GridFrame.prototype.isOnGrid = function (x, y) {
        var onGrid = true;
        if ( this.columns[0] > x || x > this.columns[this.columns.length - 1]
            || this.lines[0] > y || y > this.lines[this.lines.length - 1]) {
            onGrid = false;
        }

        return onGrid;
    };

    /**
     * Resize Grid
     * @param   {number} width
     * @param   {number} height
     * @returns {Frame.GridFrame}
     */
    Frame.GridFrame.prototype.resize = function (width, height) {
        this.width  = width;
        this.height = height;

        this.build();

        // Propagate on change event
        this.executeOnChange();

        return this;
    };

    /**
     * Get Grid config
     * @returns {{
     *      lines       : Array,
     *      columns     : Array,
     *      amount      : number,
     *      size        : number,
     *      subdivisions: number
     * }}
     */
    Frame.GridFrame.prototype.getConfig = function () {
        return {
            lines       : this.lines,
            columns     : this.columns,
            amount      : this.config.amount,
            size        : this.config.size,
            subdivisions: this.config.subdivisions
        };
    };

    /**
     * Build grid
     * @returns {Frame.GridFrame}
     */
    Frame.GridFrame.prototype.build = function () {
        this.lines = [];
        this.columns = [];

        var delta = this.config.size % 2 !== 0 ? 0.5 : 0;

        // Calculate square size
        var lineTotalSize = this.config.amount * this.config.size;
        var maxLength = Math.max(this.height, this.width);

        // Remove size which will be filled by grid lines
        maxLength -= lineTotalSize;

        var count = (maxLength - (maxLength % this.config.amount)) / this.config.amount;

        // Draw lines
        var modY = this.height % count;
        var nbLines = (this.height - modY) / count;

        var yOffset = Math.floor((modY - (nbLines * this.config.size)) / 2);

        for (var y = yOffset; y < this.height; y += count + this.config.size) {
            this.lines.push(y + delta);
        }

        // Draw columns
        var modX = this.width % count;
        var nbColumns = (this.width - modX) / count;

        var xOffset = Math.floor((modX - (nbColumns * this.config.size)) / 2);

        for (var x = xOffset; x < this.width; x += count + this.config.size) {
            this.columns.push(x + delta);
        }

        return this;
    };

    /**
     * Execute registered callbacks to Grid change event
     * @returns {Frame.GridFrame}
     */
    Frame.GridFrame.prototype.executeOnChange = function () {
        for (var i = 0; i < this.onChangeCallbacks.length; i++) {
            var func = this.onChangeCallbacks[i];

            // Call callback function
            func.callback.apply(func.context, func.args);
        }

        return this;
    };

    /**
     * Register a callback to fire when the Grid is recalculated
     * @param   {function} callback
     * @param   {object}   context
     * @param   {object}   args
     * @returns {Frame.GridFrame}
     */
    Frame.GridFrame.prototype.onChange = function (callback, context, args) {
        this.onChangeCallbacks.push({
            callback: callback,
            context:  typeof context === 'object' ? context : null,
            args:     typeof args    === 'object' ? args    : []
        });

        return this;
    };
})();