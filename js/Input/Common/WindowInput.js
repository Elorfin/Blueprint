/**
 * Window Input
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @constructor
     */
    Input.Common.WindowInput = function () {
        Input.Common.AbstractInput.call(this);

        this.detectBrowser();
        this.view = document.getElementById('blueprint');
    };

    /**
     * Extends Abstract Input
     * @type {Input.Common.AbstractInput}
     */
    Input.Common.WindowInput.prototype = Object.create(Input.Common.AbstractInput.prototype);
    Input.Common.WindowInput.prototype.constructor = Input.Common.WindowInput;

    Input.Common.WindowInput.prototype.view = null;

    Input.Common.WindowInput.prototype.browser = null;

    Input.Common.WindowInput.prototype.detectBrowser = function () {
        if (-1 !== window.navigator.userAgent.indexOf('MSIE') || !!window.navigator.userAgent.match(/Trident.*rv\:11\./)) {
            // Internet explorer
            this.browser = 'InternetExplorer';
        }
        else if (-1 !== window.navigator.userAgent.indexOf('Firefox')) {
            // Mozilla Firefox
            this.browser = 'Firefox';
        }
        else if (-1 !== window.navigator.userAgent.indexOf('Chrome')) {
            // Google Chrome
            this.browser = 'Chrome';
        }
        else if (-1 !== window.navigator.userAgent.indexOf('Safari')) {
            // Safari
            this.browser = 'Safari';
        }
        else if (-1 !== window.navigator.userAgent.indexOf('Opera')) {
            this.browser = 'Opera';
        }
    };
})();