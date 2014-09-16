/**
 * Wall Layer
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Layer.WallLayer = function (zIndex, GridFrame) {
        // Call parent constructor
        Layer.Common.AbstractLayer.call(this, zIndex, GridFrame);
    };

    /**
     * Extends Layer.Common.AbstractLayer
     * @type {Layer.Common.AbstractLayer}
     */
    Layer.WallLayer.prototype = Object.create(Layer.Common.AbstractLayer.prototype);
    Layer.WallLayer.prototype.constructor = Layer.WallLayer;

    Layer.WallLayer.prototype.name         = 'WallLayer';
    Layer.WallLayer.prototype.rendererName = 'Canvas2DRenderer';

    /**
     * Layer configuration
     * @type {{size: number, color: string}}
     */
    Layer.WallLayer.prototype.config = {
        size: 7,
        color: 'rgba(50, 180, 230, 1)'
    };

    Layer.WallLayer.prototype.walls = [];

    Layer.WallLayer.prototype.draw = function () {
        this.renderer.clear();

        for (var i = 0; i < this.walls.length; i++) {
            this.drawWall(this.walls[i]);
        }

        return this;
    };

    Layer.WallLayer.prototype.add = function (wall) {
        this.walls.push(wall);
        this.drawWall(wall);

        return this;
    };

    Layer.WallLayer.prototype.drawWall = function (wall) {
        // Get position in PX
        var start = this.gridFrame.getXY(wall.start.line, wall.start.column);
        var end = this.gridFrame.getXY(wall.end.line, wall.end.column);

        this.renderer.Line.drawSolid(start, end, {
            color: this.config.color,
            width: this.config.size
        });

        return this;
    };

    Layer.WallLayer.prototype.clearWall = function (wall) {
        // Get position in PX
        var start = this.gridFrame.getXY(wall.start.line, wall.start.column);
        var end   = this.gridFrame.getXY(wall.end.line, wall.end.column);

        var maxX = Math.max(start.x, end.x);
        var minX = Math.min(start.x, end.x);

        var maxY = Math.max(start.y, end.y);
        var minY = Math.min(start.y, end.y);

        var delta  = ((this.config.size - (this.config.size % 2)) / 2) + 1;
        var width  = (maxX - minX) + this.config.size + 2;
        var height = (maxY - minY) + this.config.size + 2;

        // Delete wall
        this.renderer.clearRect(minX - delta, minY - delta, width, height);

        return this;
    };
})();