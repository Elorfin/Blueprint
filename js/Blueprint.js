'use strict';

var Blueprint = function (container, layers, tools) {
    this.initialize(container, layers, tools);

    this.view.addEventListener('resize', function () {
        this.resize();
    }.bind(this), false);
};

Blueprint.prototype.constructor = Blueprint;

Blueprint.prototype.view = window;

Blueprint.prototype.container = null;
Blueprint.prototype.width = 0;
Blueprint.prototype.height = 0;

Blueprint.prototype.gridFrame = null;

Blueprint.prototype.layerFactory     = null;
Blueprint.prototype.toolFactory      = null;
Blueprint.prototype.commandDelegator = null;

Blueprint.prototype.layers = {};
Blueprint.prototype.tools = {};

Blueprint.prototype.activeTool = null;

Blueprint.prototype.backgroundColor = '#242424';

Blueprint.prototype.initialize = function (container, layers, tools) {
    this.container = container;
    this.container.style.backgroundColor = this.backgroundColor;

    this.width  = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.gridFrame = new Frame.GridFrame(this.width, this.height);

    this.layerFactory = new Factory.LayerFactory(this.gridFrame, this.container);
    this.toolFactory  = new Factory.ToolFactory(this.gridFrame);
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
        this.createToolButton(tool);
    }

    // Register commands
    for (var toolName in this.tools) {
        var commands = this.tools[toolName].getCommands();
        if (typeof commands === 'object' && commands.length !== 0) {
            this.commandDelegator.registerCommands(toolName, commands);
        }
    }

    return this;
};

Blueprint.prototype.resize = function () {
    this.width  = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    // Resize Grid
    this.gridFrame.resize(this.width, this.height);
};

Blueprint.prototype.createToolButton = function (tool) {
    var toolName = tool.getName();

    // Create HTML Element
    var button = document.createElement('li');

    button.id = toolName;
    button.className = 'tool-button';

    // Create icon
    var buttonIcon = document.createElement('span');
    buttonIcon.className = 'tool-icon';
    buttonIcon.style.backgroundImage = 'url("icons/' + toolName + '.png")';

    button.appendChild(buttonIcon);

    // Attach button to DOM
    var controlPanel = document.getElementById('control-list');
    controlPanel.appendChild(button);

    button.addEventListener('click', function (toolName, event) {
        event = event || window.event;

        if (toolName === this.activeTool) {
            this.disableActiveTool();
        } else {
            this.enableTool(toolName);
        }

        event.stopPropagation();
    }.bind(this, toolName), false);

    return this;
};

Blueprint.prototype.enableTool = function (toolName) {
    // Disable current active tool
    this.disableActiveTool();

    this.commandDelegator.enableCommands(toolName);

    var button = document.getElementById(toolName);
    button.className += ' tool-active';

    this.activeTool = toolName;

    return this;
};

Blueprint.prototype.disableActiveTool = function () {
    if (this.activeTool) {
        this.commandDelegator.disableCommands(this.activeTool);

        var button = document.getElementById(this.activeTool);
        button.className = 'tool-button';

        this.activeTool = null;
    }

    return this;
};