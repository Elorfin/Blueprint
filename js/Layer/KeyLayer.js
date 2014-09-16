/**
 * Key Layer
 */
(function () {
    'use strict';

    /**
     * CLass constructor
     * @param {number}               zIndex
     * @param {Renderer.DOMRenderer} DOMRenderer
     * @constructor
     */
    Layer.KeyLayer = function (zIndex, GridFrame) {
        // Call parent constructor
        Layer.Common.AbstractLayer.call(this, zIndex, GridFrame);
    };

    /**
     * Extends Layer.Common.AbstractLayer
     * @type {Layer.Common.AbstractLayer}
     */
    Layer.KeyLayer.prototype = Object.create(Layer.Common.AbstractLayer.prototype);
    Layer.KeyLayer.prototype.constructor = Layer.KeyLayer;

    Layer.KeyLayer.prototype.name         = 'KeyLayer';
    Layer.KeyLayer.prototype.rendererName = 'DOMRenderer';

    Layer.KeyLayer.prototype.keys = [];

    Layer.KeyLayer.prototype.add = function (keyName, position) {
        // Calculate ID of the key
        var id = keyName + '-' + position.line + '-' + position.column;

        // Check if the key already exists
        if (typeof this.keys[id] === 'undefined') {
            var key = new Key[keyName](this.grid, this.userInput, position);

            this.keys[id] = key;
        }

        return this;
    };

    Layer.KeyLayer.prototype.draw = function () {

    };
})();