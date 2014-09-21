/**
 * Command Delegator
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Command.CommandDelegator = function () {};
    Command.CommandDelegator.prototype.constructor = Command.CommandDelegator;

    Command.CommandDelegator.prototype.inputs = {};

    Command.CommandDelegator.prototype.commands = {};
    Command.CommandDelegator.prototype.enabled = {};

    Command.CommandDelegator.prototype.priorities = ['HIGH', 'NORMAL', 'LOW'];

    Command.CommandDelegator.prototype.registerCommands = function (name, commandSet) {
        var commands = [];
        for (var i = 0; i < commandSet.length; i++) {
            var current = commandSet[i];
            if (current.input) {
                // Retrieve Input
                var input = this.getInput(current.input);

                // Create command config
                commands.push({
                    input: input,
                    action: current.action,
                    priority : current.priority && -1 !== this.priorities.indexOf(current.priority) ? current.priority : 'NORMAL',
                    callback: {
                        method   : current.method,
                        context  : current.context ? current.context : null,
                        args     : current.args ? current.args : []
                    }
                });
            }
        }

        if (commands.length !== 0) {
            this.commands[name] = commands;
        }

        return this;
    };

    Command.CommandDelegator.prototype.getInput = function (inputName) {
        var input = null;
        if (this.inputs[inputName]) {
            // Input initialized
            input = this.inputs[inputName];
        } else {
            // Initialize input
            var inputObject = null;

            var inputParts = inputName.split('.');
            for (var j = 0; j < inputParts.length; j++) {
                var partName = inputParts[j];
                partName = partName.charAt(0).toUpperCase() + partName.slice(1);
                if (null === inputObject) {
                    inputObject = Input;
                } else if (j === inputParts.length - 1) {
                    partName += 'Input';
                }

                inputObject = inputObject[partName];
            }

            input = new inputObject();

            this.inputs[inputName] = input;
        }

        return input;
    };

    Command.CommandDelegator.prototype.enableCommands = function (name) {
        if (this.commands[name]) {
            if (!this.enabled[name]) {
                // Command set is not enabled
                var commands = this.enabled[name] = this.commands[name];

                // Loop over commands to register events
                for (var i = 0; i < commands.length; i++) {
                    var command = commands[i];
                    command.input.registerAction(name, command.action, command.priority, command.callback);
                }
            }
        } else {
            console.error('Command Delegator : Command set "' + name + '" is not registered.');
        }

        return this;
    };

    Command.CommandDelegator.prototype.disableCommands = function (name) {
        if (this.enabled[name]) {
            // Command set is enabled
            var commands = this.enabled[name];

            // Loop over commands to unregister events
            for (var i = 0; i < commands.length; i++) {
                var command = commands[i];
                command.input.unregisterAction(name, command.action);
            }

            delete this.enabled[name];
        }

        return this;
    };
})();