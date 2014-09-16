(function () {
    'use strict';

    Factory.Common.AbstractFactory = function (GridFrame, KeyFrame) {
        this.gridFrame = GridFrame;
        this.keyFrame  = KeyFrame;
    };

    Factory.Common.AbstractFactory.prototype.constructor = Factory.Common.AbstractFactory;

    Factory.Common.AbstractFactory.prototype.gridFrame = null;
    Factory.Common.AbstractFactory.prototype.keyFrame  = null;

    Factory.Common.AbstractFactory.prototype.create = function (objectName) {
        return {};
    };
})();