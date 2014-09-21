/**
 * Abstract Input
 * Base class for all Input objects
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Input.Common.AbstractInput = function () {

    };

    Input.Common.AbstractInput.prototype.constructor = Input.Common.AbstractInput;

    Input.Common.AbstractInput.prototype.priorityMap = {
        HIGH  : 1,
        NORMAL: 2,
        LOW   : 3
    };

    Input.Common.AbstractInput.prototype.actionMap = {};

    Input.Common.AbstractInput.prototype.actions = {};

    /**
     * Register a new callback to mouse events
     * ATTENTION : for know the pair (eventName, callback) must be unique for unregistering event
     * @param id
     * @param actionName
     * @param callback
     */
    Input.Common.AbstractInput.prototype.registerAction = function (id, actionName, priority, callback) {
        var action = this._buildAction(id, actionName, priority, callback);
        if (action) {
            this.actions[actionName].push(action);
        }

        return this;
    };

    Input.Common.AbstractInput.prototype.unregisterAction = function (id, actionName) {
        var actions = this.actions[actionName];
        if (actions && actions.length !== 0) {
            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];
                if (id === action.id) {
                    // Action to delete found
                    actions.splice(i, 1);
                    break;
                }
            }
        }

        return this;
    };

    Input.Common.AbstractInput.prototype.callActions = function (actionName, event) {
        var actions = this.actions[actionName];
        if (actions && actions.length !== 0) {
            // Sort Actions by priority
            actions.sort(function (a, b) {
                return a.priority - b.priority;
            });

            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];

                var argArr = action.callback.args.slice();
                argArr.unshift(event);

                action.callback.method.apply(action.callback.context, argArr);
            }
        }
    };

    /**
     * Create a new registered action object
     * @param id
     * @param actionName
     * @param priority
     * @param callback
     * @returns {*}
     * @private
     */
    Input.Common.AbstractInput.prototype._buildAction = function (id, actionName, priority, callback) {
        var action = null;
        if (-1 === this.actionMap[actionName]) {
            console.error('Try to register an invalid event.');
        } else {
            action = {
                id      : id,
                name    : actionName,
                priority: this.priorityMap[priority],
                callback: callback
            };
        }

        return action;
    };
})();