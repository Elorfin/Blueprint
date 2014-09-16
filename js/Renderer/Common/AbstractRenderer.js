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

    Renderer.Common.AbstractRenderer.prototype.onChangeCallbacks = [];

    Renderer.Common.AbstractRenderer.prototype.setZIndex = function (zIndex) {
        this.zIndex = zIndex;

        return this;
    };

    Renderer.Common.AbstractRenderer.prototype.getWidth = function () {
        console.log('AbstractRenderer : getWidth() method must be implemented in child objects.');
    };

    Renderer.Common.AbstractRenderer.prototype.getHeight = function () {
        console.log('AbstractRenderer : getHeight() method must be implemented in child objects.');
    };

    /**
     * Create renderer
     */
    Renderer.Common.AbstractRenderer.prototype.create = function () {
        console.log('AbstractRenderer : create() method must be implemented in child objects.');

        return this;
    };

    Renderer.Common.AbstractRenderer.prototype.clear = function () {
        console.log('AbstractRenderer : clear() method must be implemented in child objects.');

        return this;
    };

    Renderer.Common.AbstractRenderer.prototype.executeOnChange = function (event) {
        for (var i = 0; i < this.onChangeCallbacks.length; i++) {
            var func = this.onChangeCallbacks[i];
            var args = func.args ? func.args : [];

            // Inject event into arguments array
            var argArr = args.slice();
            argArr.unshift(event);

            func.callback.apply(func.context, argArr);
        }

        return this;
    };

    Renderer.Common.AbstractRenderer.prototype.onChange = function (callback, context, args) {
        this.onChangeCallbacks.push({
            callback: callback,
            context:  typeof context === 'object' ? context : null,
            args:     typeof args    === 'object' ? args    : null
        });

        return this;
    };
})();