'use strict';

Factory.LayerFactory = function (container) {
    this.container = container;

    this.width  = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    var obj = this;
    window.addEventListener('resize', function () {
        obj.width  = obj.container.offsetWidth;
        obj.height = obj.container.offsetHeight;

        // Resize all layers
        obj.resizeLayers();
    });
};

Factory.LayerFactory.prototype = {
    container: null,

    width: 0,
    height: 0,

    layers: {},

    layerIndex: 1,

    constructor: Factory.LayerFactory,

    getContainer: function () {
        return this.container;
    },

    getSize: function () {
        return { x: this.width, y: this.height };
    },

    resizeLayers: function () {
        for (var layer in this.layers) {
            this.resizeLayer(layer);
        }

        return this;
    },

    resizeLayer: function (id) {
        var layer = this.layers[id];
        if (layer) {
            layer.width  = layer.canvas.width  = this.width;
            layer.height = layer.canvas.height = this.height;

            // Execute Layer callback
            if (layer.callback) {
                if (typeof layer.callback === 'function') {
                    layer.callback();
                } else if (typeof layer.callback === 'object' && layer.callback.func && layer.callback.context ) {
                    layer.callback.func.call(layer.callback.context);
                } else {
                    console.error('Invalid Layer resize callback. Valid = {Function} OR {{context: my_context, func: my_func}}.');
                }
            }
        }

        return this;
    },

    createLayer: function (id, resizeCallback) {
        var canvas = document.createElement('canvas');

        canvas.id = id;
        canvas.className = 'layer';
        canvas.style.zIndex = this.layerIndex;

        canvas.width = this.width;
        canvas.height = this.height;

        this.container.appendChild(canvas);

        var layer = {
            canvas: canvas,
            context: canvas.getContext('2d'),
            width: this.width,
            height: this.height,
            callback: resizeCallback ? resizeCallback : null
        }

        this.layers[id] = layer;

        this.layerIndex++;

        return layer;
    },

    removeLayer: function (id) {
        if (this.layers[id]) {
            delete this.layers[id];

            this.layerIndex--;
        }

        return this;
    },

    getLayer: function (id) {
        var layer = null;
        if (this.layers[id]) {
            layer = this.layers[id];
        }

        return layer;
    }
};