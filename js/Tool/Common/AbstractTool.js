/**
 * Abstract Tool
 * Base class for all Tool objects
 */
(function () {
    'use strict';

    Tool.Common.AbstractTool = function (GridFrame, KeyFrame) {
        this.keyFrame  = KeyFrame;
        this.gridFrame = GridFrame;
    };

    Tool.Common.AbstractTool.prototype.constructor = Tool.Common.AbstractTool;

    Tool.Common.AbstractTool.prototype.name      = 'AbstractTool';
    Tool.Common.AbstractTool.prototype.layerName = 'AbstractLayer';

    Tool.Common.AbstractTool.prototype.gridFrame = null;
    Tool.Common.AbstractTool.prototype.layer     = null;
    Tool.Common.AbstractTool.prototype.keyFrame  = null;

    Tool.Common.AbstractTool.prototype.keys = [];

    Tool.Common.AbstractTool.prototype.getName = function () {
        return this.name;
    };

    Tool.Common.AbstractTool.prototype.getLayerName = function () {
        return this.layerName;
    };

    Tool.Common.AbstractTool.prototype.setLayer = function (layer) {
        this.layer = layer;

        return this;
    };

    Tool.Common.AbstractTool.prototype.getCommands = function () {
        console.warn('Abstract Tool : getCommands() method must be implemented in child objects.');

        return [];
    };

    Tool.Common.AbstractTool.prototype.addKey = function (keyName, position) {
        // Calculate ID of the key
        var id = keyName + '-' + position.line + '-' + position.column;

        // Check if the key already exists
        if (typeof this.keys[id] === 'undefined') {
            var key = new Key[keyName](this.gridFrame, position);

            this.keys[id] = key;
        }

        return this;
    };
})();