/**
 * Renderer Factory
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Factory.RendererFactory = function (container) {
        // Call parent constructor
        Factory.Common.AbstractFactory.call(this);

        this.container = container;
    };

    /**
     * Extends AbstractFactory
     * @type {Factory.Common.AbstractFactory}
     */
    Factory.RendererFactory.prototype = Object.create(Factory.Common.AbstractFactory.prototype);
    Factory.RendererFactory.prototype.constructor = Factory.RendererFactory;

    Factory.RendererFactory.prototype.container = null;

    Factory.RendererFactory.prototype.create = function (rendererName) {
        var renderer = null;
        if (Renderer[rendererName]) {
            renderer = new Renderer[rendererName](this.container);
        } else {
            console.error('Renderer Factory : Unknown Renderer "' + rendererName + '".');
        }

        return renderer;
    };
})();