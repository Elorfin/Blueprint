/**
 * Canvas 2D Renderer
 */
(function () {
    'use strict';

    /**
     * Class constructor
     * @param {HTMLElement} container
     * @constructor
     */
    Renderer.Canvas2DRenderer = function (container) {
        // Call parent constructor
        Renderer.DOMRenderer.call(this, container);
    };

    /**
     * Extends DOMRenderer
     * @type {Renderer.DOMRenderer}
     */
    Renderer.Canvas2DRenderer.prototype = Object.create(Renderer.DOMRenderer.prototype);
    Renderer.Canvas2DRenderer.prototype.constructor = Renderer.Canvas2DRenderer;

    /**
     * The 2D Context of canvas used to wrote on
     * @type {CanvasRenderingContext2D}
     */
    Renderer.Canvas2DRenderer.prototype.context = null;

    /**
     * Create the <canvas> element and attach it to DOM
     * @returns {Renderer.Canvas2DRenderer}
     */
    Renderer.Canvas2DRenderer.prototype.create = function () {
        var canvas = this.view.document.createElement('canvas');

        canvas.id = this.id;
        canvas.className = 'layer';
        canvas.style.zIndex = this.zIndex;

        canvas.style.position = 'absolute';
        canvas.style.top = '0px';
        canvas.style.left = '0px';

        canvas.width  = this.container.offsetWidth;
        canvas.height = this.container.offsetHeight;

        this.container.appendChild(canvas);

        this.element = canvas;
        this.context = canvas.getContext('2d');

        // Initialize Drawers
        this.Line = new Draw.Line(this.context);

        return this;
    };

    /**
     * Reset renderer
     * @returns {Renderer.Canvas2DRenderer}
     */
    Renderer.Canvas2DRenderer.prototype.clear = function () {
        this.context.restore();

        return this;
    };

    Renderer.Canvas2DRenderer.prototype.clearRect = function (x, y, width, height) {
        this.context.clearRect(x, y, width, height);

        return this;
    };
})();