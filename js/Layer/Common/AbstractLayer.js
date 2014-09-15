/**
 * Abstract Layer
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @param {Object}  layer
     * @param {boolean} display
     * @constructor
     */
    Layer.Common.AbstractLayer = function (renderer, display) {
        this.renderer = renderer;
        this.display = display;

        this.draw();
    };

    Layer.Common.AbstractLayer.prototype.constructor = Layer.Common.AbstractLayer;

    /**
     * Context to draw on
     * @type {Object}
     */
    Layer.Common.AbstractLayer.prototype.renderer = null;

    /**
     * Display property
     * @type {boolean}
     */
    Layer.Common.AbstractLayer.prototype.display = true;

    /**
     * Change display value
     * @param   {boolean} display
     * @returns {Layer.Common.AbstractLayer}
     */
    Layer.Common.AbstractLayer.prototype.setDisplay = function (display) {
        var newValue = display ? true : false;

        if (this.display !== newValue) {
            this.display = newValue;

            // Redraw with new value
            this.draw();
        }

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