/**
 * Wall Key
 */
(function () {
    'use strict';

    /**
     * Class Constructor
     * @param GridLayer
     * @param UserInput
     * @param position
     * @constructor
     */
    Key.WallKey = function (GridFrame, position) {
        // Call parent constructor
        Key.Common.DraggableKey.call(this, GridFrame, position);

        // Attach events to key
    };

    /**
     * Extends Key.Common.DraggableKey
     * @type {Key.Common.DraggableKey}
     */
    Key.WallKey.prototype = Object.create(Key.Common.DraggableKey.prototype);
    Key.WallKey.prototype.constructor = Key.WallKey;

    Key.WallKey.prototype.toolName = 'Wall';

    Key.WallKey.prototype.style = {
        width          : '11px',
        height         : '11px',
        borderColor    : 'rgba(50, 180, 230, 1)',
        borderRadius   : '11px',
        backgroundColor: '#0082B4'
    };
})();