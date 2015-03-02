define(['View'], function (View) {

    function ResponsiveSvg(_width, _height) {
        var _this = new View('<div></div>');

        var width = _width;
        var height = _height;
        var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'));
        svg
            .attr('viewBox', '0 0 '+width+' '+height)
            .attr('preserveAspectRatio','xMinYMin meet')
            .attr('class', 'svg-content');

        _this.svg = function (_svg) {
            if (_.isUndefined(_svg)) return svg;
            svg = _svg;
            return svg;
        };

        _this.initialize = function () {
            _this.append(_this.svg()[0]);
            _this.class('svg-container');
            _this.css('padding-bottom', (height/width * 100) + '%');
        };

        _this._width = function () {
            return width;
        };

        _this._height = function () {
            return height;
        };

        _this.initialize();

        return _this;
    }

    return ResponsiveSvg;
});