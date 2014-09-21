(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Input.User.MouseInput = function () {
        Input.Common.WindowInput.call(this);

        // MOUSE OVER Event
        this.view.addEventListener('mouseover', function (event) {
            event = event || this.view.event;
            this.callActions('hover', event);
        }.bind(this), false);

        // MOUSE OUT Event
        this.view.addEventListener('mouseout', function (event) {
            event = event || this.view.event;
            this.callActions('out', event);
        }.bind(this), false);

        // MOUSE MOVE Event
        this.view.addEventListener('mousemove', function (event) {
            event = event || this.view.event;
            this.callActions('move', event);
        }.bind(this), false);

        // MOUSE DOWN Event
        this.view.addEventListener('mousedown', function (event) {
            if (!this.isClicked) {
                event = event || this.view.event;

                // Get clicked
                this.isClicked = true;
                this.getButtonClicked(event);

                this.callActions('down', event);

                if ('left' === this.buttonClicked) {
                    this.callActions('downLeft', event);
                } else if ('right' === this.buttonClicked) {
                    this.callActions('downRight', event);
                }
            }
        }.bind(this), false);

        // MOUSE UP Event
        this.view.addEventListener('mouseup', function (event) {
            if (this.isClicked) {
                event = event || this.view.event;
                this.callActions('up', event);

                if ('left' === this.buttonClicked) {
                    this.callActions('upLeft', event);
                } else if ('right' === this.buttonClicked) {
                    this.callActions('upRight', event);
                }

                // Clear clicked
                this.isClicked     = false;
                this.buttonClicked = null;
            }
        }.bind(this), false);

        // MOUSE CLICK Event
        this.view.addEventListener('click', function (event) {
            event = event || this.view.event;

            var local = false;
            if (!this.isClicked) {
                // Get clicked
                this.isClicked = true;
                this.getButtonClicked(event);

                local = true;
            }

            this.callActions('click', event);

            if ('left' === this.buttonClicked) {
                this.callActions('clickLeft', event);
            } else if ('right' === this.buttonClicked) {
                this.callActions('clickRight', event);
            }

            if (local) {
                // Clear clicked
                this.isClicked     = false;
                this.buttonClicked = null;
            }
        }.bind(this), false);
    };

    /**
     * Extends Window Input
     * @type {Input.Common.WindowInput}
     */
    Input.User.MouseInput.prototype = Object.create(Input.Common.WindowInput.prototype);
    Input.User.MouseInput.prototype.constructor = Input.User.MouseInput;

    /**
     * Available actions
     * @type {Array}
     */
    Input.User.MouseInput.prototype.actionMap = {
        hover     : 'mouseover',
        out       : 'mouseout',
        move      : 'mousemove',
        up        : 'mouseup',
        upLeft    : 'mouseup',
        upRight   : 'mouseup',
        down      : 'mousedown',
        downLeft  : 'mousedown',
        downRight : 'mousedown',
        click     : 'click',
        clickLeft : 'click',
        clickRight: 'click'
    };

    Input.User.MouseInput.prototype.actions = {
        hover     : [],
        out       : [],
        move      : [],
        up        : [],
        upLeft    : [],
        upRight   : [],
        down      : [],
        downLeft  : [],
        downRight : [],
        click     : [],
        clickLeft : [],
        clickRight: []
    };

    Input.User.MouseInput.prototype.isClicked     = false;
    Input.User.MouseInput.prototype.buttonClicked = null;

    Input.User.MouseInput.prototype.getButtonClicked = function (event) {
        this.buttonClicked = null;

        if (event.which) {
            // Old Browsers
            switch (event.which) {
                case 1:
                    this.buttonClicked = 'left';
                    break;
                case 2:
                    this.buttonClicked = 'middle';
                    break;
                case 3:
                    this.buttonClicked = 'right';
                    break;
            }
        }
        else if (event.button && 2 == event.button) {
            // W3C Browsers && Internet Explorer
            switch (event.button) {
                case 0:
                    if ('InternetExplorer' !== this.browser) {
                        this.buttonClicked = 'left';
                    }
                    break;
                case 1:
                    if ('InternetExplorer' === this.browser) {
                        this.buttonClicked = 'left';
                    } else {
                        this.buttonClicked = 'middle';
                    }
                    break;
                case 2:
                    this.buttonClicked = 'right';
                    break;
                case 4:
                    if ('InternetExplorer' === this.browser) {
                        this.buttonClicked = 'middle';
                    }
                    break;
            }
        }

        return this;
    };
})();