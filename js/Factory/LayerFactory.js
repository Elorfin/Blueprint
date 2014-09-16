/**
 * Layer Factory
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @param {HTMLElement} container
     * @constructor
     */
    Factory.LayerFactory = function (GridFrame, KeyFrame, container) {
        // Call parent constructor
        Factory.Common.AbstractFactory.call(this, GridFrame, KeyFrame);

        this.container = container;

        this.rendererFactory = new Factory.RendererFactory(container);
    };

    /**
     * Extends AbstractFactory
     * @type {Factory.Common.AbstractFactory}
     */
    Factory.LayerFactory.prototype = Object.create(Factory.Common.AbstractFactory.prototype);
    Factory.LayerFactory.prototype.constructor = Factory.LayerFactory;

    Factory.LayerFactory.prototype.container = null;

    Factory.LayerFactory.prototype.rendererFactory = null;

    Factory.LayerFactory.prototype.layerIndex = 1;

    Factory.LayerFactory.prototype.create = function (layerName) {
        var layer = null;
        if (Layer[layerName]) {
            // Requested Layer exists
            var constructor = Layer[layerName].toString();

            // Find needed components by analyzing args of constructor
            var args = constructor.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1].split(',');

            // Remove fixed params
            args = args.filter(function (element) {
                return element.trim() !== 'zIndex' && element.trim() !== 'GridFrame';
            });

            var constructorArgs = [this.layerIndex, this.gridFrame];
            for (var i = 0; i < args.length; i++) {
                var arg = args[i].trim();

                // Retrieve factory to deliver arguments
                var parts = arg.split(/(?=[A-Z])/);

                var type = parts.pop();
                if (typeof this.factories[type] !== 'undefined') {
                    // Create requested parameter
                    constructorArgs.push(this.factories[type].create(arg));
                } else {
                    console.error('Layer Factory : Can not find Factory for "' + type + '".');
                }
            }

            // Initialize Layer object
            layer = new Layer[layerName](this.layerIndex, this.gridFrame);

            // Configure Layer
            var needRenderer = layer.getRendererName();
            if (needRenderer) {
                var renderer = this.rendererFactory.create(needRenderer);
                layer.setRenderer(renderer);
            }

            this.layerIndex++;
        } else {
            console.error('Layer Factory : Unknown Layer "' + layerName + '".');
        }

        return layer;
    };
})();