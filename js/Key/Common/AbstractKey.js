'use strict';

Key.Common.AbstractKey = function (GridLayer, position) {
    this.grid = GridLayer;

    // Set up key properties
    this.position = position;
    this.id       = 'key-' + this.toolName + '-' + position.line + '-' + position.column;

    // Draw key
    this.draw();

    // Attach events to key
};

Key.Common.AbstractKey.prototype = {
    grid: null,

    id: null,

    toolName: null,

    position: null,

    element: null,

    style: {},

    constructor: Key.Common.AbstractKey,

    draw: function () {
        if (!this.element) {
            // DOM element does not exist => create it
            var key = document.createElement('button');

            // Add identifiers
            key.id = this.id;
            key.className = this.toolName.toLowerCase() + '-key';

            // Add styles
            for (var styleProperty in this.style) {
                key.style[styleProperty] = this.style[styleProperty];
            }

            document.getElementsByTagName("body")[0].appendChild(key);

            this.element = key;
        }

        // Retrieve position in PX
        var pos = this.grid.getXY(this.position.line, this.position.column);

        // Position key
        var deltaY = this.element.offsetHeight / 2;
        var deltaX = this.element.offsetWidth / 2;

        this.element.style.top  = (pos.y - deltaY) + 'px';
        this.element.style.left = (pos.x - deltaX) + 'px';
    },

    setPosition: function (line, column) {
        this.position.line   = line;
        this.position.column = column;

        this.draw();
    }
};