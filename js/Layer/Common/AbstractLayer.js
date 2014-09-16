/**
 * Abstract Layer
 * Base class for all Layer object
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @param {Layer.Common.AbstractRenderer} renderer
     * @constructor
     */
    Layer.Common.AbstractLayer = function (zIndex, GridFrame) {
        this.zIndex = zIndex;
        this.gridFrame = GridFrame;
    };

    Layer.Common.AbstractLayer.prototype.constructor = Layer.Common.AbstractLayer;

    Layer.Common.AbstractLayer.prototype.name         = 'AbstractLayer';
    Layer.Common.AbstractLayer.prototype.rendererName = 'AbstractRenderer';

    /**
     * Grid used to position objects on Layer
     * @type {Frame.GridFrame}
     */
    Layer.Common.AbstractLayer.gridFrame = null;

    /**
     * Context to draw on
     * @type {Object}
     */
    Layer.Common.AbstractLayer.prototype.renderer = null;

    Layer.Common.AbstractLayer.prototype.zIndex = 1;

    Layer.Common.AbstractLayer.prototype.config = {};

    Layer.Common.AbstractLayer.prototype.getName = function () {
        return this.name;
    };

    Layer.Common.AbstractLayer.prototype.getRendererName = function () {
        return this.rendererName;
    };

    Layer.Common.AbstractLayer.prototype.setRenderer = function (renderer) {
        this.renderer = renderer;
        this.renderer.setZIndex(this.zIndex);

        // Avoid redraw at each initialisation
        this.gridFrame.resize(null, this.renderer.getWidth(), this.renderer.getHeight());

        this.draw();

        // Recalculate GridFrame when renderer change
        this.renderer.onChange(this.gridFrame.resize, this.gridFrame, [this.renderer.getWidth(), this.renderer.getHeight()]);

        // Redraw Layer when Renderer change
        this.renderer.onChange(this.draw, this);

        return this;
    };

    /**
     * Draw Layer on screen
     * @returns {Layer.Common.AbstractLayer}
     */
    Layer.Common.AbstractLayer.prototype.draw = function () {
        console.warn('draw() method must be implemented in child objects.');

        return this;
    };
})();