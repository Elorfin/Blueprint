'use strict';

var Blueprint = function (container, layers, tools) {
    this.container = container;
    this.container.style.backgroundColor = this.backgroundColor;

    this.gridFrame = new Frame.GridFrame();
    this.keyFrame  = new Frame.KeyFrame();

    this.layerFactory = new Factory.LayerFactory(this.gridFrame, this.keyFrame, this.container);
    this.toolFactory  = new Factory.ToolFactory(this.gridFrame, this.keyFrame);
    this.commandDelegator = new Command.CommandDelegator();

    // Initialize layers
    for (var i = 0; i < layers.length; i++) {
        var layer = this.layerFactory.create(layers[i]);

        this.layers[layer.getName()] = layer;
    }

    // Initialize tools
    for (var j = 0; j < tools.length; j++) {
        var tool = this.toolFactory.create(tools[j]);

        // configure tool;
        var needLayer = tool.getLayerName();
        if (needLayer) {
            if (this.layers[needLayer]) {
                tool.setLayer(this.layers[needLayer]);
            } else {
                console.error('Unknown Layer "' + needLayer + '".')
            }
        }

        this.tools[tool.getName()] = tool;
    }

    // Register commands
    for (var toolName in this.tools) {
        var commands = this.tools[toolName].getCommands();
        if (typeof commands === 'object' && commands.length !== 0) {
            this.commandDelegator.registerCommands(toolName, commands);
        }
    }
};

Blueprint.prototype.constructor = Blueprint;

Blueprint.prototype.gridFrame = null;

Blueprint.prototype.layerFactory     = null;
Blueprint.prototype.toolFactory      = null;
Blueprint.prototype.commandDelegator = null;

Blueprint.prototype.layers = {};
Blueprint.prototype.tools = {};

Blueprint.prototype.container = null;
Blueprint.prototype.backgroundColor = '#0082B4';