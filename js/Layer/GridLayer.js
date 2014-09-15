/**
 * Grid Layer
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Layer.GridLayer = function (LayerFactory, display) {
        this.display = display ? true : false;

        // Create Layer
        this.layer = LayerFactory.createLayer('grid', { context: this, func: this.draw });

        // Draw Grid
        this.draw();
    };

    /**
     * Extends Layer.Common.AbstractLayer
     * @type {Layer.Common.AbstractLayer}
     */
    Layer.GridLayer.prototype = Object.create(Layer.Common.AbstractLayer);
    Layer.GridLayer.prototype.constructor = Layer.GridLayer;

    /**
     * Configuration of the grid
     * Options :
     *   - color        : Color of the grid lines and columns
     *   - lines        : Number of squares on the larger side of the container
     *   - size         : Size of the lines
     *   - subdivisions : Number of squares (delimited by dotted lines) between two solid lines
     * @type {{
     *      color       : string,
     *      lines       : number,
     *      size        : number,
     *      subdivisions: number
     * }}
     */
    Layer.GridLayer.prototype.config = {
        color: "#1496c8",
        lines: 64,
        size: 1,
        subdivisions: 4
    };

    /**
     * Layer used to paint grid
     */
    Layer.GridLayer.prototype.layer = null;
    Layer.GridLayer.prototype.callbacks = [];

    /**
     * Position Y for each line of the grid
     * @type {Array}
     */
    Layer.GridLayer.prototype.lines = [];

    /**
     * Position X for each column of the grid
     * @type {Array}
     */
    Layer.GridLayer.prototype.columns = [];

    /**
     * Get list of grid lines
     * @returns {Array}
     */
    Layer.GridLayer.prototype.getLines = function () {
        return this.lines;
    };

    /**
     * Get list of grid columns
     * @returns {Array}
     */
    Layer.GridLayer.prototype.getColumns = function () {
        return this.columns;
    };

    /**
     * Get real position for line and column
     * @param   {number} line
     * @param   {number} column
     * @returns {{ x: number, y: number }}
     */
    Layer.GridLayer.prototype.getXY = function (line, column) {
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
    Layer.GridLayer.prototype.getPosition = function (x, y) {
        var line = this.lines.indexOf(y);
        if (-1 === line) {
            console.warn('Grid system : Unknown position Y ' + y + '.');
            line = 0;
        }

        var column = this.columns.indexOf(x);
        if (-1 === column) {
            console.warn('Grid system : Unknown position X ' + x + '.');
            column = 0;
        }

        return { line: line, column: column };
    };

    /**
     * Draw grid
     * @returns {Layer.GridLayer}
     */
    Layer.GridLayer.prototype.draw = function () {
        this.layer.context.restore();

        this.lines = [];
        this.columns = [];

        // Initialize drawer
        var DrawLine = new Draw.Line();

        var delta = this.config.size % 2 !== 0 ? 0.5 : 0;

        // Calculate square size
        var lineTotalSize = this.config.lines * this.config.size;
        var maxLength = Math.max(this.layer.height, this.layer.width);

        // Remove size which will be filled by grid lines
        maxLength -= lineTotalSize;

        var count = (maxLength - (maxLength % this.config.lines)) / this.config.lines;

        // Draw lines
        var modY = this.layer.height % count;
        var nbLines = (this.layer.height - modY) / count;

        var yOffset = Math.floor((modY - (nbLines * this.config.size)) / 2);

        var nbLinesOffset = nbLines % this.config.subdivisions;
        var lineOffset = (nbLinesOffset - (nbLinesOffset % 2)) / 2;

        var line = -lineOffset;
        for (var y = yOffset; y < this.layer.height; y += count + this.config.size) {
            if (this.display) {
                if (0 === line % this.config.subdivisions) {
                    DrawLine.drawSolid(
                        this.layer,
                        { x: 0,                y: y + delta },
                        { x: this.layer.width, y: y + delta },
                        { color: this.config.color, width: this.config.size }
                    );
                } else {
                    DrawLine.drawDashed(
                        this.layer,
                        { x: 0,                y: y + delta },
                        { x: this.layer.width, y: y + delta },
                        { color: this.config.color, width: this.config.size, dash: 2 }
                    );
                }
            }

            this.lines.push(y + delta);

            line++;
        }

        // Draw columns
        var modX = this.layer.width % count;
        var nbColumns = (this.layer.width - modX) / count;

        var xOffset = Math.floor((modX - (nbColumns * this.config.size)) / 2);

        var nbColumnsOffset = nbColumns % this.config.subdivisions;
        var columnOffset = (nbColumnsOffset - (nbColumnsOffset % 2)) / 2;

        var column = -columnOffset;
        for (var x = xOffset; x < this.layer.width; x += count + this.config.size) {
            if (this.display) {
                if (0 === column % this.config.subdivisions) {
                    DrawLine.drawSolid(
                        this.layer,
                        { x: x + delta, y: 0 },
                        { x: x + delta, y: this.layer.height },
                        { color: this.config.color, width: this.config.size }
                    );
                } else {
                    DrawLine.drawDashed(
                        this.layer,
                        { x: x + delta, y: 0 },
                        { x: x + delta, y: this.layer.height },
                        { color: this.config.color, width: this.config.size, dash: 2 }
                    );
                }
            }

            this.columns.push(x + delta);

            column++;
        }

        // Call registered callbacks
        for (var i = 0; i < this.callbacks.length; i++) {
            var callback = this.callbacks[i];
            if (callback.context) {
                callback.callback.call(this);
            } else {
                callback.callback();
            }
        }

        return this;
    };

    /**
     * Add a function to call when grid changes (example: grid is recalculated on window resize)
     * @param   {function} callback
     * @param   {Object} context
     * @returns {Layer.GridLayer}
     */
    Layer.GridLayer.prototype.onChange = function (callback, context) {
        if (typeof callback === 'function') {
            this.callbacks.push({
                callback: callback,
                context: typeof context === 'object' ? context : null
            });
        }

        return this;
    };
})();