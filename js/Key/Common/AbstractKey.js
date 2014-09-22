/**
 * Abstract Key
 * Base class for all Key object
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @param {Frame.GridFrame}                GridFrame
     * @param {{line: number, column: number}} position
     * @constructor
     */
    Key.Common.AbstractKey = function (GridFrame, position) {
        // Set up key properties
        this.id        = 'key-' + this.name + '-' + position.line + '-' + position.column;
        this.gridFrame = GridFrame;

        this.setPosition(position.line, position.column);
    };

    Key.Common.AbstractKey.prototype.constructor = Key.Common.AbstractKey;

    /**
     * Identifier of the Key
     * @type {string}
     */
    Key.Common.AbstractKey.prototype.id = null;

    /**
     * Name of the Key
     * @type {string}
     */
    Key.Common.AbstractKey.prototype.name = 'AbstractKey';

    /**
     * Position of the Key
     * @type {{line: number, column: number}}
     */
    Key.Common.AbstractKey.prototype.position = null;

    /**
     * Current Grid
     * @type {Frame.GridFrame}
     */
    Key.Common.AbstractKey.prototype.gridFrame = null;

    /**
     * HTML representation of the Key
     * @type {HTMLElement}
     */
    Key.Common.AbstractKey.prototype.element = null;

    /**
     * Styles of the Key
     * @type {object}
     */
    Key.Common.AbstractKey.prototype.style = {};

    /**
     * Draw Key on screen
     * @returns {Key.Common.AbstractKey}
     */
    Key.Common.AbstractKey.prototype.draw = function () {
        if (!this.element) {
            // DOM element does not exist => create it
            var key = document.createElement('button');

            // Add identifiers
            key.id = this.id;
            key.className = this.name.toLowerCase();

            // Add styles
            for (var styleProperty in this.style) {
                key.style[styleProperty] = this.style[styleProperty];
            }

            document.getElementsByTagName('body')[0].appendChild(key);

            this.element = key;
        }

        // Retrieve position in PX
        var pos = this.gridFrame.getXY(this.position.line, this.position.column);

        // Position key
        var deltaY = this.element.offsetHeight / 2;
        var deltaX = this.element.offsetWidth / 2;

        this.element.style.top  = (pos.y - deltaY) + 'px';
        this.element.style.left = (pos.x - deltaX) + 'px';

        return this;
    };

    /**
     * Set position of the Key and redraw it
     * @param   {number} line
     * @param   {number} column
     * @returns {Key.Common.AbstractKey}
     */
    Key.Common.AbstractKey.prototype.setPosition = function (line, column) {
        this.position = { line: line, column: column };

        this.draw();

        return this;
    };
})();