/**
 * Abstract Tool
 * Base class for all Tool objects
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @param {Frame.GridFrame} GridFrame
     * @constructor
     */
    Tool.Common.AbstractTool = function (GridFrame) {
        this.gridFrame = GridFrame;
    };

    Tool.Common.AbstractTool.prototype.constructor = Tool.Common.AbstractTool;

    /**
     * Tool name
     * @type {string}
     */
    Tool.Common.AbstractTool.prototype.name = 'AbstractTool';

    /**
     * Layer name to write on
     * @type {string}
     */
    Tool.Common.AbstractTool.prototype.layerName = 'AbstractLayer';

    /**
     * Grid
     * @type {Frame.GridFrame}
     */
    Tool.Common.AbstractTool.prototype.gridFrame = null;

    /**
     * Layer to write on
     * @type {Layer.Common.AbstractLayer}
     */
    Tool.Common.AbstractTool.prototype.layer = null;

    /**
     * Position of the Cursor if drawn
     * @type {{ x: number, y: number }}
     */
    Tool.Common.AbstractTool.prototype.cursor = null;

    Tool.Common.AbstractTool.prototype.cursorEnabled = true;

    /**
     * List of Keys
     * @type {Array}
     */
    Tool.Common.AbstractTool.prototype.keys = [];

    /**
     * Get Tool name
     * @returns {string}
     */
    Tool.Common.AbstractTool.prototype.getName = function () {
        return this.name;
    };

    /**
     * Get Layer name
     * @returns {string}
     */
    Tool.Common.AbstractTool.prototype.getLayerName = function () {
        return this.layerName;
    };

    /**
     * Set Layer
     * @param {Layer.Common.AbstractLayer} layer
     * @returns {Tool.Common.AbstractTool}
     */
    Tool.Common.AbstractTool.prototype.setLayer = function (layer) {
        this.layer = layer;

        return this;
    };

    /**
     * Get Tool commands
     * @returns {Array}
     */
    Tool.Common.AbstractTool.prototype.getCommands = function () {
        return [
            { input: 'user.mouse', action: 'move', priority: 'HIGH', method: this.drawCursor, context: this }
        ];
    };

    /**
     * Add a Key
     * @param   {string}                         keyName
     * @param   {{line: number, column: number}} position
     * @returns {Tool.Common.AbstractTool}
     */
    Tool.Common.AbstractTool.prototype.addKey = function (keyName, position) {
        // Calculate ID of the key
        var id = keyName + '-' + position.line + '-' + position.column;

        // Check if the key already exists
        if (typeof this.keys[id] === 'undefined') {
            this.keys[id] = new Key[keyName](this.gridFrame, position);
        }

        return this;
    };

    /**
     * Draw cursor on Layer
     * @param event
     * @returns {Tool.Common.AbstractTool}
     */
    Tool.Common.AbstractTool.prototype.drawCursor = function (event) {
        if (this.cursorEnabled && this.gridFrame.isOnGrid(event.clientX, event.clientY)) {
            // Get new Cursor position
            var position = this.gridFrame.getPosition(event.clientX, event.clientY);

            if ( !this.cursor || (this.cursor.line != position.line || this.cursor.column != position.column) ) {
                // Cursor has moved => redraw it
                // Remove previous cursor
                this.clearCursor();

                // Store current position of cursor (to can remove it later)
                this.cursor = { line: position.line, column: position.column };

                // Draw cursor on Layer
                this.layer.drawCursor(this.cursor);
            }
        } else {
            // Not on Grid => Only delete previous cursor
            this.clearCursor();
        }

        return this;
    };

    /**
     * Clear Cursor from Layer
     * @returns {Tool.Common.AbstractTool}
     */
    Tool.Common.AbstractTool.prototype.clearCursor = function () {
        // Check if Cursor is drawn
        if (this.cursor) {
            // Remove Cursor from Layer
            this.layer.clearCursor(this.cursor);

            this.cursor = null;
        }

        return this;
    };
})();