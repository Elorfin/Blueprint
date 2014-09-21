/**
 * Grid Layer
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Layer.GridLayer = function (zIndex, GridFrame) {
        // Call parent constructor
        Layer.Common.AbstractLayer.call(this, zIndex, GridFrame);
    };

    /**
     * Extends Layer.Common.AbstractLayer
     * @type {Layer.Common.AbstractLayer}
     */
    Layer.GridLayer.prototype = Object.create(Layer.Common.AbstractLayer.prototype);
    Layer.GridLayer.prototype.constructor = Layer.GridLayer;

    Layer.GridLayer.prototype.name         = 'GridLayer';
    Layer.GridLayer.prototype.rendererName = 'Canvas2DRenderer';

    Layer.GridLayer.prototype.opacity = 0.05;

    /**
     * Color of the Grid
     * @type {string}
     */
    Layer.GridLayer.prototype.color = '#DDDDDD';

    /**
     * Draw grid
     * @returns {Layer.GridLayer}
     */
    Layer.GridLayer.prototype.draw = function () {
        this.renderer.clear();

        // Get Grid configuration
        var gridConfig = this.gridFrame.getConfig();

        // Calculate square size
        var lineTotalSize = gridConfig.amount * gridConfig.size;
        var maxLength = Math.max(this.renderer.getHeight(), this.renderer.getWidth());

        // Remove size which will be filled by grid lines
        maxLength -= lineTotalSize;

        var count = (maxLength - (maxLength % gridConfig.amount)) / gridConfig.amount;

        // Draw lines
        var modY = this.renderer.getHeight() % count;
        var nbLines = (this.renderer.getHeight() - modY) / count;

        var nbLinesOffset = nbLines % gridConfig.subdivisions;
        var lineOffset = (nbLinesOffset - (nbLinesOffset % 2)) / 2;

        var line = -lineOffset;
        for (var y = 0; y < gridConfig.lines.length; y++) {
            if (0 === line % gridConfig.subdivisions) {
                this.renderer.Line.drawSolid(
                    { x: 0,                y: gridConfig.lines[y] },
                    { x: this.renderer.getWidth(), y: gridConfig.lines[y] },
                    { color: this.color, width: gridConfig.size }
                );
            } else {
                this.renderer.Line.drawDashed(
                    { x: 0,                y: gridConfig.lines[y] },
                    { x: this.renderer.getWidth(), y: gridConfig.lines[y] },
                    { color: this.color, width: gridConfig.size, dash: 2 }
                );
            }

            line++;
        }

        // Draw columns
        var modX = this.renderer.getWidth() % count;
        var nbColumns = (this.renderer.getWidth() - modX) / count;

        var nbColumnsOffset = nbColumns % gridConfig.subdivisions;
        var columnOffset = (nbColumnsOffset - (nbColumnsOffset % 2)) / 2;

        var column = -columnOffset;
        for (var x = 0; x < gridConfig.columns.length; x++) {
            if (0 === column % gridConfig.subdivisions) {
                this.renderer.Line.drawSolid(
                    { x: gridConfig.columns[x], y: 0 },
                    { x: gridConfig.columns[x], y: this.renderer.getHeight() },
                    { color: this.color, width: gridConfig.size }
                );
            } else {
                this.renderer.Line.drawDashed(
                    { x: gridConfig.columns[x], y: 0 },
                    { x: gridConfig.columns[x], y: this.renderer.getHeight() },
                    { color: this.color, width: gridConfig.size, dash: 2 }
                );
            }

            column++;
        }

        return this;
    };
})();