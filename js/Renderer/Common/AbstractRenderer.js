/**
 * Abstract Renderer
 * Base class for all Renderer objects
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @param {HTMLElement} container
     * @constructor
     */
    Renderer.Common.AbstractRenderer = function (container) {
        // Generate id
        this.id = Math.floor(Math.random() * Math.pow(10, 16));
        this.container = container;

        this.create();
    };

    Renderer.Common.AbstractRenderer.prototype.constructor = Renderer.Common.AbstractRenderer;

    /**
     * Unique identifier of the Renderer
     * @type {number}
     */
    Renderer.Common.AbstractRenderer.prototype.id = null;

    /**
     * Parent container of the Renderer
     * @type {HTMLElement}
     */
    Renderer.Common.AbstractRenderer.prototype.container = null;

    /**
     * Z Index of the renderer
     * @type {number}
     */
    Renderer.Common.AbstractRenderer.prototype.zIndex = 1;

    /**
     * Opacity of the renderer (0 <= opacity <= 1)
     * @type {number}
     */
    Renderer.Common.AbstractRenderer.prototype.opacity = 1;

    /**
     * Set z-index of the renderer
     * @param   {number} zIndex
     * @returns {Renderer.Common.AbstractRenderer}
     */
    Renderer.Common.AbstractRenderer.prototype.setZIndex = function (zIndex) {
        this.zIndex = zIndex;

        return this;
    };

    /**
     * Set opacity of the renderer
     * @param   {number} opacity
     * @returns {Renderer.Common.AbstractRenderer}
     */
    Renderer.Common.AbstractRenderer.prototype.setOpacity = function (opacity) {
        this.opacity = opacity;

        return this;
    };

    /**
     * Get width of the renderer
     * @returns {number}
     */
    Renderer.Common.AbstractRenderer.prototype.getWidth = function () {
        console.warn('AbstractRenderer : getWidth() method must be implemented in child objects.');

        return 0;
    };

    /**
     * Get height of the renderer
     * @returns {number}
     */
    Renderer.Common.AbstractRenderer.prototype.getHeight = function () {
        console.warn('AbstractRenderer : getHeight() method must be implemented in child objects.');

        return 0;
    };

    /**
     * Create renderer
     * @returns {Renderer.Common.AbstractRenderer}
     */
    Renderer.Common.AbstractRenderer.prototype.create = function () {
        console.warn('AbstractRenderer : create() method must be implemented in child objects.');

        return this;
    };

    /**
     * Resize renderer
     * @returns {Renderer.Common.AbstractRenderer}
     */
    Renderer.Common.AbstractRenderer.prototype.resize = function () {
        console.warn('AbstractRenderer : resize() method must be implemented in child objects.');

        return this;
    };
})();