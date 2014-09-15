'use strict';

Tool.Common.AbstractTool = function (LayerFactory, KeyFactory, UserInput, GridLayer) {
    this.layerFactory = LayerFactory;
    this.keyFactory   = KeyFactory;
    this.userInput    = UserInput;
    this.grid         = GridLayer;

    // Generate ID
    this.id = Math.floor(Math.random() * Math.pow(10, 16));

    // Initialize Layer
    this.layer = LayerFactory.createLayer(this.id, { context: this, func: this.draw });

    this.draw();
};

Tool.Common.AbstractTool.prototype = {
    id: null,

    layerFactory: null,

    keyFactory: null,

    userInput: null,

    grid: null,

    layer: null,

    isEnabled: false,

    commands: null,

    constructor: Tool.Common.AbstractTool,

    enable: function () {
        this.isEnabled = true;

        return this;
    },

    disable: function () {
        this.isEnabled = false;

        return this;
    },

    draw: function () {
        console.log('draw() method must be implemented in child objects.');
    }
};