'use strict';

Input.User.MouseInput = function (element, GridLayer) {
    this.element = element;
    this.grid = GridLayer;

    // Bind events
    var obj = this;

    // Attach events
    this.element.addEventListener('mousedown', function (event) {
        obj.mouseClicked = true;

        obj.callRegisteredEvents('mousedown', event);
    });

    this.element.addEventListener('mouseup', function (event) {
        obj.mouseClicked = false;

        obj.callRegisteredEvents('mouseup', event);
    });

    this.element.addEventListener('click', function (event) {
        obj.callRegisteredEvents('click', event);
    });

    this.element.addEventListener('mousemove', function (event) {
        obj.setPosition(event.clientX, event.clientY);

        obj.callRegisteredEvents('mousemove', event);
    });

    this.element.addEventListener('mouseover', function (event) {
        obj.callRegisteredEvents('mouseover', event);
    });

    this.element.addEventListener('mouseout', function (event) {
        obj.callRegisteredEvents('mouseout', event);
    });
};

Input.User.MouseInput.prototype = {
    grid: null,

    /**
     * DOM element which is watched
     */
    element: null,

    position: {
        real: { x:    0, y:      0 },
        xy  : { x:    0, y:      0 },
        grid: { line: 0, column: 0 }
    },

    /**
     * Position of cursor on X axis
     * @var integer
     */
    mouseX: 0,

    mouseGridX: 0,

    mouseColumn: 0,

    /**
     * Position of cursor on Y axis
     * @var integer
     */
    mouseY: 0,

    mouseGridY: 0,

    mouseLine: 0,

    /**
     * Is mouse button currently pressed ?
     */
    mouseClicked: false,

    /**
     * Available events
     * @var Array
     */
    events: [
        'mouseover',
        'mouseout',
        'mousemove',
        'mouseup',
        'mousedown',
        'click'
    ],

    registeredEvents: {
        mouseover: [],
        mouseout: [],
        mousemove: [],
        mouseup: [],
        mousedown: [],
        click: []
    },

    /**
     * Class constructor
     */
    constructor: Input.User.MouseInput,

    /**
     * Get current mouse position
     * @returns {{x: number, y: number}}
     */
    getRealPosition: function () {
        return this.position.real;
    },

    getGridPosition: function () {
        return this.position.grid;
    },

    getGridXYPosition: function () {
        return this.position.xy;
    },

    setPosition: function (realX, realY) {
        this.position.real = { x: realX, y: realY };

        function findNearest(array, search) {
            var nearest = null;

            for (var i = 0; i < array.length; i++) {
                var current = array[i];
                var next = array[i + 1];

                if (typeof (next) === 'undefined') {
                    nearest = current;
                    break;
                } else if (current <= search && search <= next) {
                    var intervalMin = search - current;
                    var intervalMax = next - search;

                    if (intervalMin <= intervalMax) {
                        nearest = current;
                    } else {
                        nearest = next;
                    }

                    break;
                }
            }

            return nearest;
        }

        this.position.xy = {
            x: findNearest(this.grid.getColumns(), this.position.real.x),
            y: findNearest(this.grid.getLines(),   this.position.real.y)
        };

        this.position.grid = this.grid.getPosition(this.position.xy.x, this.position.xy.y);
    },

    /**
     * Register a new callback to mouse events
     * ATTENTION : for know the pair (eventName, callback) must be unique for unregistering event
     * @param eventName
     * @param callback
     * @param context
     */
    registerEvent: function (eventName, callback, context, stopPropagation) {
        var event = this._buildEvent(eventName, callback, context, stopPropagation);

        if (event) {
            this.registeredEvents[eventName].push(event);
        }

        return this;
    },

    unregisterEvent: function (eventName, callback) {
        for (var i = 0; i < this.registeredEvents[eventName].length; i++) {
            var event = this.registeredEvents;

            if (callback === event.callback) {
                this.registeredEvents.splice(i, 1);
                break;
            }
        }

        return this;
    },

    callRegisteredEvents: function (eventName, event) {
        for (var i = 0; i < this.registeredEvents[eventName].length; i++) {
            var registered = this.registeredEvents[eventName][i];

            if (registered.context) {
                registered.callback.call(registered.context, event);
            } else if (typeof registered.callback === 'function') {
                registered.callback(event);
            }

            if (registered.stopPropagation) {
                event.stopPropagation();
            }
        }
    },

    /**
     * Create a new registered event object
     * @param eventName
     * @param callback
     * @param context
     * @returns {*}
     * @private
     */
    _buildEvent: function (eventName, callback, context, stopPropagation) {
        var event = null;
        if (-1 === this.events[eventName]) {
            console.error('Try to register an invalid event.');
        } else if (typeof callback !== 'function') {
            console.error('Try to register an invalid callback.');
        } else {
            event = {
                name: eventName,
                callback: callback,
                context: typeof context === 'object' ? context : null,
                stopPropagation: stopPropagation ? true : false
            }
        }

        return event;
    }
};