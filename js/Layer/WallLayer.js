/**
 * Wall Layer
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Layer.WallLayer = function (renderer, display) {
        Layer.Common.AbstractLayer.call(this, renderer, display);
    };

    /**
     * Extends Layer.Common.AbstractLayer
     * @type {Layer.Common.AbstractLayer}
     */
    Layer.WallLayer.prototype = Object.create(Layer.Common.AbstractLayer);
    Layer.WallLayer.prototype.constructor = Layer.WallLayer;

    Layer.WallLayer.prototype.tool = null;

    Layer.WallLayer.prototype.cursor = null;
})();