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

    Key.WallKey.prototype.name = 'WallKey';

    Key.WallKey.prototype.style = {
        width          : '15px',
        height         : '15px',
        borderColor    : '#ddd',
        borderRadius   : '15px',
        backgroundColor: '#222'
    };
})();