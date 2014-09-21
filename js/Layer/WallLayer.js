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
        size: 11,
        color: '#ddd'
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
        var end   = this.gridFrame.getXY(wall.end.line,   wall.end.column);

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

        // Redraw existing walls
        this.draw();

        return this;
    };

    Layer.WallLayer.prototype.drawCursor = function (cursor) {
        // Get position in PX
        var position = this.gridFrame.getXY(cursor.line, cursor.column);

        // Start new canvas path
        this.renderer.context.beginPath();

        this.renderer.context.arc(position.x, position.y, 7, 0, 2 * Math.PI, false);

        this.renderer.context.closePath();

        // Set line styles
        this.renderer.context.fillStyle = '#ddd';

        // Display line
        this.renderer.context.fill();

        return this;
    };

    Layer.WallLayer.prototype.clearCursor = function (cursor) {
        // Get position in PX
        var position = this.gridFrame.getXY(cursor.line, cursor.column);

        // Delete cursor
        this.renderer.clearRect(position.x - 8, position.y - 8, 16, 16);

        // Redraw existing walls
        this.draw();

        return this;
    };
})();