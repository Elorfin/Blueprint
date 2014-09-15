'use strict';

Factory.ToolFactory = function (availableTools) {
    this.availableTools = availableTools;
};

Factory.ToolFactory.prototype = {
    availableTools: [],

    constructor: Factory.ToolFactory
};