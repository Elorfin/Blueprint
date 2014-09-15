'use strict';

Factory.KeyFactory = function (GridLayer, UserInput) {
    this.grid = GridLayer;
    this.userInput = UserInput;
};

Factory.KeyFactory.prototype = {
    grid: null,
    userInput: null,

    keys: [],

    constructor: Factory.KeyFactory,

    createKey: function (toolName, position) {
        // Calculate ID of the key
        var id = 'key-' + toolName + '-' + position.line + '-' + position.column;

        // Check if the key already exists
        if (typeof this.keys[id] === 'undefined') {
            var keyName = toolName + 'Key';
            var key = new Key[keyName](this.grid, this.userInput, position);

            this.keys[id] = key;
        }
    }
};