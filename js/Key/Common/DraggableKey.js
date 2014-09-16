'use strict';

Key.Common.DraggableKey = function (GridFrame, position) {
    // Call parent constructor
    Key.Common.AbstractKey.call(this, GridFrame, position);

    // Attach events to key
    /*var obj = this;*/

    /*this.element.addEventListener('mousedown', function (event) {
        obj.isDragged = true;
        event.stopPropagation();
    });*/

    /*UserInput.registerEvent('mousedown', function () { return false; }, this, true);

    UserInput.registerEvent('mousemove', this.drag, this, true);
    UserInput.registerEvent('mouseup',   this.drop, this, true);*/
};

// Extends AbstractKey
Key.Common.DraggableKey.prototype = Object.create(Key.Common.AbstractKey.prototype);
Key.Common.DraggableKey.prototype.constructor = Key.Common.DraggableKey;

Key.Common.DraggableKey.prototype.userInput = null;

Key.Common.DraggableKey.prototype.isDragged = false;
Key.Common.DraggableKey.prototype.originalPosition = { line: null, column: null };

/**
 * Register a callback on drag event
 * @param {function} callback
 * @param {Object}   context
 */
Key.Common.DraggableKey.prototype.onDrag = function (callback, context) {

};

/**
 * Register a callback on drop event
 * @param {function} callback
 * @param {Object}   context
 */
Key.Common.DraggableKey.prototype.onDrop = function (callback, context) {

};

Key.Common.DraggableKey.prototype.drag = function () {
    if (this.isDragged) {
        // Store original position
        this.originalPosition = {line: this.position.line, column: this.position.column};

        // Move Key
        var position = this.userInput.getGridPosition();
        this.setPosition(position.line, position.column);
    }

    return this;
};

Key.Common.DraggableKey.prototype.drop = function () {
    if (this.isDragged) {
        this.isDragged = false;

        // Reset original position
        this.originalPosition = {line: null, column: null};
    }

    return this;
};