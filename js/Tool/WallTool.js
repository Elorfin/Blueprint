'use strict';

Tool.WallTool = function (LayerFactory, KeyFactory, UserInput, GridLayer) {
    // Call parent constructor
    Tool.Common.AbstractTool.call(this, LayerFactory, KeyFactory, UserInput, GridLayer);

    // Bind tool events
    // Start drawing when user press a mouse button
    UserInput.registerEvent('mousedown', this.startDrawing, this);

    // Stop drawing when user release a mouse button
    UserInput.registerEvent('mouseup',   this.stopDrawing,  this);

    // Draw when user move mouse
    UserInput.registerEvent('mousemove', this.isDrawing,    this);
};

// Extends AbstractTool
Tool.WallTool.prototype = Object.create(Tool.Common.AbstractTool.prototype);
Tool.WallTool.prototype.constructor = Tool.WallTool;

Tool.WallTool.prototype.commands = [
    { input: 'user.mouse', action: 'down', method: this.startDrawing },
    { input: 'user.mouse', action: 'move', method: this.isDrawing    },
    { input: 'user.mouse', action: 'up',   method: this.stopDrawing  }
];

Tool.WallTool.prototype.walls = [];

Tool.WallTool.prototype.wallSize = 7;
Tool.WallTool.prototype.wallColor = 'rgba(50, 180, 230, 1)';

Tool.WallTool.prototype.current = {
    start: null,
    end: null
};

Tool.WallTool.prototype.startDrawing = function () {
    // Initialize wall
    this.current.start = this.current.end = this.userInput.getGridPosition();

    this.keyFactory.createKey('Wall', this.current.start);

    return this;
};

Tool.WallTool.prototype.isDrawing = function () {
    if (this.current.start && this.current.end) {
        // Process current drawing wall
        var wallEnd = this.userInput.getGridPosition();
        if ( (wallEnd.line !== this.current.end.line || wallEnd.column !== this.current.end.column)
            && (wallEnd.line !== this.current.start.line || wallEnd.column !== this.current.start.column) ) {
            // Clear old wall
            this.clearWall(this.current);

            // Replace end
            this.current.end = wallEnd;

            // Draw new wall
            this.drawWall(this.current);

            // Redraw existing walls
            this.draw();
        }
    }

    return this;
};

Tool.WallTool.prototype.stopDrawing = function () {
    if (this.current.start && this.current.end) {
        // Store generated wall
        this.walls.push({ start: this.current.start, end: this.current.end }); // Create new object to avoid references

        this.keyFactory.createKey('Wall', this.current.end);

        // Clear current drawing
        this.current.start = null;
        this.current.end   = null;
    }

    return this;
};

Tool.WallTool.prototype.draw = function () {
    for (var i = 0; i < this.walls.length; i++) {
        var wall = this.walls[i];

        this.drawWall(wall);
    }

    return this;
};

Tool.WallTool.prototype.clearWall = function (wall) {
    // Get position in PX
    var start = this.grid.getXY(wall.start.line, wall.start.column);
    var end   = this.grid.getXY(wall.end.line, wall.end.column);

    var maxX = Math.max(start.x, end.x);
    var minX = Math.min(start.x, end.x);

    var maxY = Math.max(start.y, end.y);
    var minY = Math.min(start.y, end.y);

    var delta  = ((this.wallSize - (this.wallSize % 2)) / 2) + 1;
    var width  = (maxX - minX) + this.wallSize + 2;
    var height = (maxY - minY) + this.wallSize + 2;

    // Delete wall
    this.layer.context.clearRect(minX - delta, minY - delta, width, height);

    return this;
};

Tool.WallTool.prototype.drawWall = function (wall) {
    this.layer.context.beginPath();

    // Get position in PX
    var start = this.grid.getXY(wall.start.line, wall.start.column);
    var end = this.grid.getXY(wall.end.line, wall.end.column);

    this.layer.context.moveTo(start.x, start.y);
    this.layer.context.lineTo(end.x, end.y);

    this.layer.context.closePath();

    this.layer.context.lineWidth = this.wallSize;
    this.layer.context.strokeStyle = this.wallColor;
    this.layer.context.stroke();

    return this;
};