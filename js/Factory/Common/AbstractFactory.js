(function () {
    'use strict';

    Factory.Common.AbstractFactory = function (GridFrame) {
        this.gridFrame = GridFrame;
    };

    Factory.Common.AbstractFactory.prototype.constructor = Factory.Common.AbstractFactory;

    Factory.Common.AbstractFactory.prototype.gridFrame = null;

    Factory.Common.AbstractFactory.prototype.create = function (objectName) {
        return {};
    };
})();