(function () {
    'use strict';

    Component.Door = function (positionStart, positionEnd) {

    };

    Component.Door.prototype.constructor = Component.Door;

    Component.Door.prototype.color = '#ddd';
    Component.Door.prototype.size  = 7;

    Component.Door.prototype.start = { line: 0, column: 0 };
    Component.Door.prototype.end   = { line: 0, column: 0 };

    Component.Door.prototype.inverse = false;

    Component.Door.prototype.draw = function (renderer, grid) {
        // Get position in PX
        var positionStart = grid.getXY(this.start.line, this.start.column);
        var positionEnd   = grid.getXY(this.end.line, this.end.column);

        var squareSize = grid.getSquareSize();

        // Draw rect to hide wall
        renderer.context.beginPath();
        renderer.context.rect(positionEnd.x, positionEnd.y - 6, squareSize * 3, 12);

        renderer.context.fillStyle = '#242424';
        renderer.context.fill();

        // Create Door bounds
        renderer.Arc.drawSolid(positionStart, 7, 0, 2 * Math.PI, {
            fillStyle       : '#ddd',
            counterClockwise: false
        });

        renderer.Arc.drawSolid(positionEnd, 7, 0, 2 * Math.PI, {
            fillStyle       : '#ddd',
            counterClockwise: false
        });

        // Create Door
        var delta = squareSize * 3 * (Math.sqrt(2) / 2);

        renderer.Line.drawSolid(
            positionEnd,
            { x: positionEnd.x + delta, y: positionEnd.y - delta },
            { color: '#ddd', width: 4 }
        );

        // Create open arc
        renderer.Arc.drawDashed(positionEnd, Math.abs(positionStart.x - positionEnd.x), 0, -Math.PI / 4, {
            width           : 1,
            length          : 5,
            color           : '#ddd',
            counterClockwise: true
        });

        return this;
    };

    Component.Door.prototype.erase = function (renderer, grid) {
        // Get position in PX
        var positionEnd = grid.getXY(this.end.line, this.end.column);

        var squareSize = grid.getSquareSize();
        var delta =  squareSize * 3 * (Math.sqrt(2) / 2);

        // Delete door
        renderer.Eraser.erase(positionEnd.x - 8, positionEnd.y - delta - 2, squareSize * 3 + 16, delta + 10);

        return this;
    };

    Component.Door.prototype.isAt = function (x, y) {
        return false;
    };

    Component.Door.prototype.resize = function () {

        return this;
    };

    Component.Door.prototype.rotate = function (center, angle, clockwise) {

    };
})();