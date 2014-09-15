'use strict';

var Blueprint = function (container, layers) {
    this.container = container;
    this.container.style.backgroundColor = this.backgroundColor;

    this.layerFactory = new Factory.LayerFactory(this.container);
};

Blueprint.prototype = {
    layerFactory: null,

    edit: true,

    layers: null,

    backgroundColor: '#0082B4',

    container: null,

    constructor: Blueprint,

    createLayers: function () {

    }
};