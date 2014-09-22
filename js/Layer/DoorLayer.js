/**
 * Door Layer
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Layer.DoorLayer = function (zIndex, GridFrame) {
        // Call parent constructor
        Layer.Common.AbstractLayer.call(this, zIndex, GridFrame);
    };

    /**
     * Extends Layer.Common.AbstractLayer
     * @type {Layer.Common.AbstractLayer}
     */
    Layer.DoorLayer.prototype = Object.create(Layer.Common.AbstractLayer.prototype);
    Layer.DoorLayer.prototype.constructor = Layer.DoorLayer;

    Layer.DoorLayer.prototype.name         = 'DoorLayer';
    Layer.DoorLayer.prototype.rendererName = 'Canvas2DRenderer';

    /**
     * Layer configuration
     * @type {{size: number, color: string}}
     */
    Layer.DoorLayer.prototype.config = {
        length: 3, // default length in Grid square
        size: 11,
        color: '#ddd'
    };

    Layer.DoorLayer.prototype.doors = [];

    Layer.DoorLayer.prototype.draw = function () {
        this.renderer.Eraser.eraseAll();

        for (var i = 0; i < this.doors.length; i++) {
            this.drawDoor(this.doors[i]);
        }

        return this;
    };

    Layer.DoorLayer.prototype.add = function (door) {
        this.doors.push(door);
        this.drawDoor(door);

        return this;
    };

    Layer.DoorLayer.prototype.drawDoor = function (door) {
        // Get position in PX
        var start = this.gridFrame.getXY(door.start.line, door.start.column);
        var end   = this.gridFrame.getXY(door.end.line, door.end.column);
        var orientation = door.orientation ? door.orientation : 1;


        this.renderer.Line.drawSolid(start, end, {
            color: this.config.color,
            width: this.config.size
        });

        return this;
    };

    Layer.DoorLayer.prototype.clearDoor = function (wall) {
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
        this.renderer.Eraser.erase(minX - delta, minY - delta, width, height);

        return this;
    };

    /**
     * Draw Layer cursor
     *
     *        /
     *      /
     *    o       o
     *
     * @param   {{line: number, column: number}} cursor
     * @returns {Layer.DoorLayer}
     */
    Layer.DoorLayer.prototype.drawCursor = function (cursor) {
        var cursorEnd = { line: cursor.line, column: cursor.column - this.config.length };

        // Get position in PX
        var positionStart = this.gridFrame.getXY(cursor.line, cursor.column);
        var positionEnd   = this.gridFrame.getXY(cursorEnd.line, cursorEnd.column);

        var squareSize = this.gridFrame.getSquareSize();

        // Draw rect to hide wall
        this.renderer.context.beginPath();
        this.renderer.context.rect(positionEnd.x, positionEnd.y - 6, squareSize * 3, 12);

        this.renderer.context.fillStyle = '#242424';
        this.renderer.context.fill();

        // Create Door bounds
        this.renderer.Arc.drawSolid(positionStart, 7, 0, 2 * Math.PI, {
            fillStyle       : '#ddd',
            counterClockwise: false
        });

        this.renderer.Arc.drawSolid(positionEnd, 7, 0, 2 * Math.PI, {
            fillStyle       : '#ddd',
            counterClockwise: false
        });

        // Create Door
        var delta = squareSize * 3 * (Math.sqrt(2) / 2);

        this.renderer.Line.drawSolid(
            positionEnd,
            { x: positionEnd.x + delta, y: positionEnd.y - delta },
            { color: '#ddd', width: 4 }
        );

        // Create open arc
        this.renderer.Arc.drawDashed(positionEnd, Math.abs(positionStart.x - positionEnd.x), 0, -Math.PI / 4, {
            width           : 1,
            length          : 5,
            color           : '#ddd',
            counterClockwise: true
        });

        return this;
    };

    Layer.DoorLayer.prototype.clearCursor = function (cursor) {
        var cursorEnd = { line: cursor.line, column: cursor.column - this.config.length };

        // Get position in PX
        var positionStart = this.gridFrame.getXY(cursor.line, cursor.column);
        var positionEnd   = this.gridFrame.getXY(cursorEnd.line, cursorEnd.column);

        var squareSize = this.gridFrame.getSquareSize();
        var delta =  squareSize * 3 * (Math.sqrt(2) / 2);

        // Delete cursor
        this.renderer.Eraser.erase(positionEnd.x - 8, positionEnd.y - delta - 2, squareSize * 3 + 16, delta + 10);

        // Redraw existing walls
        this.draw();

        return this;
    };
})();