/**
 * DOM Renderer
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @param {HTMLElement} container
     * @constructor
     */
    Renderer.DOMRenderer = function (container) {
        Renderer.Common.AbstractRenderer.call(this, container);

        // Observe view resize
        this.view.addEventListener('resize', function (event) {
            // Resize renderer
            this.resize();
            this.executeOnChange(event);
        }.bind(this), false);
    };

    /**
     * Extends AbstractRenderer
     * @type {Renderer.Common.AbstractRenderer}
     */
    Renderer.DOMRenderer.prototype = Object.create(Renderer.Common.AbstractRenderer.prototype);
    Renderer.DOMRenderer.prototype.constructor = Renderer.DOMRenderer;

    /**
     * Current view
     * @type {window}
     */
    Renderer.DOMRenderer.prototype.view = window;

    /**
     * Renderer DOM Element
     * @type {HTMLElement}
     */
    Renderer.DOMRenderer.prototype.element = null;

    /**
     * Resize element
     * @returns {Renderer.DOMRenderer}
     */
    Renderer.DOMRenderer.prototype.resize = function () {
        this.element.width  = this.container.offsetWidth;
        this.element.height = this.container.offsetHeight;

        return this;
    };

    Renderer.Common.AbstractRenderer.prototype.setZIndex = function (zIndex) {
        this.zIndex = zIndex;
        this.element.style.zIndex = this.zIndex;

        return this;
    };

    Renderer.DOMRenderer.prototype.getWidth = function () {
        return this.element.width;
    };

    Renderer.DOMRenderer.prototype.getHeight = function () {
        return this.element.height;
    };

    /**
     * Create the <canvas> element and attach it to DOM
     * @returns {Renderer.DOMRenderer}
     */
    Renderer.DOMRenderer.prototype.create = function () {
        var div = this.view.document.createElement('div');

        div.id = this.id;
        div.className = 'layer';
        div.style.zIndex = this.zIndex;

        div.style.position = 'absolute';
        div.style.top = '0px';
        div.style.left = '0px';

        div.width  = this.container.offsetWidth;
        div.height = this.container.offsetHeight;

        this.container.appendChild(div);

        this.element = div;

        return this;
    };
})();