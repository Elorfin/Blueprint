(function () {
    'use strict';

    /**
     * Class constructor
     * @param context
     * @constructor
     */
    Draw.Eraser = function (context) {
        this.context = context;
    };

    Draw.Eraser.prototype.constructor = Draw.Eraser;

    Draw.Eraser.prototype.context = null;

    /**
     * Draw a solid arc on canvas
     * @param layer
     * @param start
     * @param end
     * @param options
     */
    Draw.Eraser.prototype.erase = function (x, y, width, height) {
        this.context.clearRect(x, y, width, height);

        return this;
    };

    Draw.Eraser.prototype.eraseAll = function () {
        this.context.restore();

        return this;
    }
})();