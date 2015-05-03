define(['View'], function (View) {

    /**
     *
     * @param _width
     * @param _height
     * @returns {View}
     * @constructor
     * @class {ResponsiveSvg}
     */
    function ResponsiveSvg(_width, _height) {
        var _this = new View('<div></div>');
        var margin, width, height, svg, _svg;

        _this.svg = function (_svg) {
            if (_.isUndefined(_svg)) return svg;
            svg = _svg;
            return svg;
        };

        _this._extent = function (_width, _height) {
            width = _width - margin.left - margin.right;
            height = _height - margin.top - margin.bottom;
            this._setViewBox();
            _this._setPaddingBottom();
            return _this;
        };

        _this._width = function (_width) {
            if (_.isUndefined(_width)) return width;
            return _this._extent(_width, height);
        };

        _this._height = function (_height) {
            if (_.isUndefined(_height)) return height;
            return _this._extent(width, _height);
        };

        _this.margin = function (_margin) {
            if (_.isUndefined(_margin))
                return {
                    top: _this.marginTop(),
                    right: _this.marginRight(),
                    bottom: _this.marginBottom(),
                    left: _this.marginLeft() };
            var outerWidth = _this._outerWidth();
            var outerHeight = _this._outerHeight();
            margin = _margin;
            _this._extent(outerWidth,outerHeight);
            _this._setTransform();
            return _this;
        };

        _this.marginBottom = function (_margin) {
            if (_.isUndefined(_margin)) return margin.bottom;
            return _this.margin((function(){margin.bottom = _margin; return margin})());
        };

        _this.marginTop = function (_margin) {
            if (_.isUndefined(_margin)) return margin.top;
            return _this.margin((function(){margin.top = _margin; return margin})());
        };

        _this.marginRight = function (_margin) {
            if (_.isUndefined(_margin)) return margin.right;
            return _this.margin((function(){margin.right = _margin; return margin})());
        };

        _this.marginLeft = function (_margin) {
            if (_.isUndefined(_margin)) return margin.left;
            return _this.margin((function(){margin.left = _margin; return margin})());
        };

        _this._outerWidth = function () {
            return width + margin.left + margin.right;
        };

        _this._outerHeight = function () {
            return height + margin.top + margin.bottom;
        };

        _this._setViewBox = function () {
            _svg.attr('viewBox', '0 0 '+_this._outerWidth()+' '+_this._outerHeight());
            return _this;
        };

        _this._setPaddingBottom = function () {
            _this.css('padding-bottom', (_this._outerHeight()/_this._outerWidth() * 80) + '%');
            return _this;
        };

        _this._setTransform = function () {
            _this.svg().attr("transform", "translate(" + _this.marginLeft() + "," + _this.marginTop() + ")");
        };

        _this.initialize = function () {
            _svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'));
            margin = { top: 0, right: 0, bottom: 0, left: 0 };
            _this._extent(_width || 960, _height || 500);
            _this.append(_svg[0]);

            svg = _svg
                .attr('viewBox', '0 0 '+width+' '+height)
                .attr('preserveAspectRatio','xMidYMid meet')
                .attr('class', 'svg-content')
                .append("g");

            _this.class('svg-container');
            _this._setPaddingBottom();
        };

        _this.initialize();

        return _this;
    }

    return ResponsiveSvg;
});