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
        length: 2,
        size: 11,
        color: '#ddd'
    };

    Layer.DoorLayer.prototype.doors = [];

    Layer.DoorLayer.prototype.draw = function () {
        this.renderer.clear();

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

        context.arc(x, y, radius, startAngle, endAngle, counterClockwise);

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
        this.renderer.clearRect(minX - delta, minY - delta, width, height);

        return this;
    };
})();