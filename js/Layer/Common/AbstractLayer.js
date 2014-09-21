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

    /**
     * Name of the Layer
     * @type {string}
     */
    Layer.Common.AbstractLayer.prototype.name = 'AbstractLayer';

    /**
     * Name of the renderer class needed by the layer
     * @type {string}
     */
    Layer.Common.AbstractLayer.prototype.rendererName = 'AbstractRenderer';

    /**
     * Grid used to position objects on Layer
     * @type {Frame.GridFrame}
     */
    Layer.Common.AbstractLayer.gridFrame = null;

    /**
     * Context to draw on
     * @type {Renderer.Common.AbstractRenderer}
     */
    Layer.Common.AbstractLayer.prototype.renderer = null;

    /**
     * Z Index of the Layer
     * @type {number}
     */
    Layer.Common.AbstractLayer.prototype.zIndex = 1;

    /**
     * Opacity of the Layer
     * @type {number}
     */
    Layer.Common.AbstractLayer.prototype.opacity = 1;

    /**
     * Configuration of the Layer
     * @type {object}
     */
    Layer.Common.AbstractLayer.prototype.config = {};

    /**
     * Get name for the Layer
     * @returns {string}
     */
    Layer.Common.AbstractLayer.prototype.getName = function () {
        return this.name;
    };

    /**
     * Get renderer name of the Layer
     * @returns {string}
     */
    Layer.Common.AbstractLayer.prototype.getRendererName = function () {
        return this.rendererName;
    };

    /**
     * Set renderer
     * @param   {Renderer.Common.AbstractRenderer} renderer
     * @returns {Layer.Common.AbstractLayer}
     */
    Layer.Common.AbstractLayer.prototype.setRenderer = function (renderer) {
        this.renderer = renderer;
        this.renderer.setZIndex(this.zIndex);
        this.renderer.setOpacity(this.opacity);

        this.draw();

        // Redraw Layer when Renderer change
        this.gridFrame.onChange(this.resize, this, []);

        return this;
    };

    /**
     * Resize the Layer
     * @returns {Layer.Common.AbstractLayer}
     */
    Layer.Common.AbstractLayer.prototype.resize = function () {
        this.renderer.resize();

        this.draw();

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

    /**
     * Draw cursor on Layer
     * @param   {{line: number, column: number}} cursor
     * @returns {Layer.Common.AbstractLayer}
     */
    Layer.Common.AbstractLayer.prototype.drawCursor = function (cursor) {
        console.warn('drawCursor() method must be implemented in child objects.');

        return this;
    };

    /**
     * Delete cursor
     * @param   {{line: number, column: number}} cursor
     * @returns {Layer.Common.AbstractLayer}
     */
    Layer.Common.AbstractLayer.prototype.clearCursor = function (cursor) {
        console.warn('clearCursor() method must be implemented in child objects.');

        return this;
    };
})();