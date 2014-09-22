/**
 * Door Layer
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Layer.WindowLayer = function (zIndex, GridFrame) {
        // Call parent constructor
        Layer.Common.AbstractLayer.call(this, zIndex, GridFrame);
    };

    /**
     * Extends Layer.Common.AbstractLayer
     * @type {Layer.Common.AbstractLayer}
     */
    Layer.WindowLayer.prototype = Object.create(Layer.Common.AbstractLayer.prototype);
    Layer.WindowLayer.prototype.constructor = Layer.WindowLayer;

    Layer.WindowLayer.prototype.name         = 'WindowLayer';
    Layer.WindowLayer.prototype.rendererName = 'Canvas2DRenderer';

    /**
     * Layer configuration
     * @type {{size: number, color: string}}
     */
    Layer.WindowLayer.prototype.config = {
        length: 2,
        size: 11,
        color: '#ddd'
    };

    Layer.WindowLayer.prototype.windows = [];

    Layer.WindowLayer.prototype.draw = function () {
        this.renderer.Eraser.eraseAll();

        for (var i = 0; i < this.windows.length; i++) {
            this.drawWindow(this.windows[i]);
        }

        return this;
    };

    Layer.WindowLayer.prototype.add = function (window) {
        this.windows.push(window);
        this.drawWindow(window);

        return this;
    };

    Layer.WindowLayer.prototype.drawWindow = function (window) {
        // Get position in PX
        var start = this.gridFrame.getXY(window.start.line, window.start.column);
        var end   = this.gridFrame.getXY(window.end.line, window.end.column);
        var orientation = window.orientation ? window.orientation : 1;

        this.renderer.Line.drawSolid(start, end, {
            color: this.config.color,
            width: this.config.size
        });

        return this;
    };

    Layer.WindowLayer.prototype.clearWindow = function (window) {
        // Get position in PX
        var start = this.gridFrame.getXY(window.start.line, window.start.column);
        var end   = this.gridFrame.getXY(window.end.line, window.end.column);

        var maxX = Math.max(start.x, end.x);
        var minX = Math.min(start.x, end.x);

        var maxY = Math.max(start.y, end.y);
        var minY = Math.min(start.y, end.y);

        var delta  = ((this.config.size - (this.config.size % 2)) / 2) + 1;
        var width  = (maxX - minX) + this.config.size + 2;
        var height = (maxY - minY) + this.config.size + 2;

        // Delete wall
        this.renderer.Eraser.erase(minX - delta, minY - delta, width, height);

        return this;
    };
})();