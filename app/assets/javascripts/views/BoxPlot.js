define([
    'views/abstract/AxisGraphChart'
], function (
    AxisGraphChart
){

    function Point (_x, _y) {
        var _this = this;
        var x = _x;
        var y = _y;

        _this.x = function(number) {
            if (_.isUndefined(number)) return x;
            x = number;
            return _this;
        };

        _this.y = function(number) {
            if (_.isUndefined(number)) return y;
            y = number;
            return _this;
        };

        _this.minus = function (point) {
            return new Point(_this.x() - point.x(), _this.y() - point.y());
        };

        _this.plus = function (point) {
            return new Point(_this.x() + point.x(), _this.y() + point.y());
        };

        _this.copy = function () {
            return new Point(_this.x(), _this.y());
        };

        _this.divide = function (number) {
            return new Point(_this.x() / number, _this.y() / number);
        };

        _this.multiply = function (number) {
            return new Point(_this.x() * number, _this.y() * number);
        };

        _this.negated = function () {
            return new Point(-_this.x(), -_this.y());
        };

        _this.toString = function () {
            return '('+_this.x()+','+_this.y()+')';
        };
    }

    function Rectangle (_origin, _corner) {
        var _this = this;

        var origin = _origin;
        var corner = _corner;

        _this.origin = function (point) {
            if (_.isUndefined(point)) return origin.copy();
            origin = point.copy();
            return _this;
        };

        _this.corner = function (point) {
            if (_.isUndefined(point)) return corner.copy();
            corner = point.copy();
            return _this;
        };

        _this.extent = function (point) {
            if (_.isUndefined(point))
                return _this.corner().minus(_this.origin());
            _this.corner(_this.origin().plus(point));
            return _this;
        };

        _this.height = function () {
            return _this.corner().minus(_this.origin()).y();
        };

        _this.width = function () {
            return _this.corner().minus(_this.origin()).x();
        };

        _this.topLeft = function () {
            return _this.origin().copy();
        };

        _this.bottomLeft = function () {
            return new Point(_this.origin().x(), _this.corner().y());
        };

        _this.topRight = function () {
            return new Point(_this.corner().x(),_this.origin().y());
        };

        _this.bottomRight = function () {
            return _this.corner().copy();
        };

        _this.topCenter = function () {
            return _this.topLeft().plus(_this.topRight().minus(_this.topLeft()).divide(2.0));
        };

        _this.rightCenter = function () {
            return _this.topRight().plus(_this.bottomRight().minus(_this.topRight()).divide(2.0));
        };

        _this.bottomCenter = function () {
            return _this.bottomLeft().plus(_this.bottomRight().minus(_this.bottomLeft()).divide(2.0));
        };

        _this.leftCenter = function () {
            return _this.topLeft().plus(_this.bottomLeft().minus(_this.topLeft()).divide(2.0));
        };

        _this.center = function () {
            return _this.topLeft().plus(_this.bottomRight().minus(_this.topLeft()).divide(2.0));
        };

        _this.translate = function (point) {
            return new Rectangle(_this.origin().plus(point), _this.corner().plus(point));
        };

        _this.toString = function () {
            return '['+_this.origin()+_this.corner()+']';
        };

    }

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class BoxPlot
     */
    function BoxPlot(_width, _height){
        var _this = new AxisGraphChart(_width, _height);

        /**
         * @override
         */
        _this.defaultSettings = override(_this, _this.defaultSettings, function () {
            var settings = _.extend(this.super(),{
                maxBarWidth: 40,
                labelFontSize: 12,
                labelMargin: 5,
                labelDyFix: 2,
                higherQuartile: 'higherQ',
                higherWhisker: 'higherWhisker',
                lowerQuartile: 'lowerQ',
                lowerWhisker: 'lowerWhisker'
            });
            settings.yDomain = function(entity) { return [ 0, d3.max(entity, _this.higherWhiskerValue) * 1.2 ] };
            return settings;
        });

        _this.higherQuartileValue = function (item) {
            return item[_this.settings().higherQuartile];
        };

        _this.higherWhiskerValue = function (item) {
            return item[_this.settings().higherWhisker];
        };

        _this.lowerWhiskerValue = function (item) {
            return item[_this.settings().lowerWhisker];
        };

        _this.lowerQuartileValue = function (item) {
            return item[_this.settings().lowerQuartile];
        };

        _this.medianValue = function (item) {
            return _this.yValue(item);
        };

        _this.labelFontSize = function () {
            return _this.settings().labelFontSize;
        };

        _this.labelFontHalfSize = function () {
            return _this.labelFontSize() / 2.0 - _this.settings().labelDyFix;
        };

        _this.labelMargin = function () {
            return _this.settings().labelMargin;
        };

        /**
         * @override
         */
        _this.renderContent = function () {
            _this.updateBoxes();
        };

        _this.updateBoxes = function () {
            _this.removeBoxes();
            _this.addBoxes();
        };

        _this.boxKey = function (item) {
            return _this.xValue(item);
        };

        _this.outerBounds = function (item) {
            return new Rectangle(
                new Point(
                    _this.scaledXValue(item),
                    _this.yScale()(_this.higherWhiskerValue(item))
                ),
                new Point(
                    _this.scaledXValue(item) + Math.min(_this.settings().maxBarWidth,_this.xScale().rangeBand(item)),
                    _this.yScale()(_this.lowerWhiskerValue(item))
                )
            );
        };

        _this.innerBounds = function (item) {
            return new Rectangle(
                new Point(
                    _this.scaledXValue(item),
                    _this.yScale()(_this.higherQuartileValue(item))
                ),
                new Point(
                    _this.scaledXValue(item) + Math.min(_this.settings().maxBarWidth,_this.xScale().rangeBand(item)),
                    _this.yScale()(_this.lowerQuartileValue(item))
                )
            );
        };

        _this.rectBounds = function (item) {
            return _this.innerBounds(item).translate(_this.outerBounds(item).origin().negated());
        };

        _this.boxWidth = function (item) {
            return _this.innerBounds(item).width();
        };

        _this.boxHeight = function (item) {
            return _this.innerBounds(item).height();
        };

        _this.outerBoxHeight = function (item) {
            return _this.outerBounds(item).height();
        };

        _this.boxTranslation = function(item) {
            var bounds = _this.outerBounds(item);
            return 'translate(' + (bounds.topLeft().x() + (_this.xScale().rangeBand(item) - bounds.width())/2)+ ','+ bounds.topLeft().y() + ')';
        };

        _this.innerBoxTranslation = function (item) {
            var delta = _this.rectBounds(item).origin();
            return 'translate(' + delta.x()+ ','+ delta.y() + ')';
        };

        _this.boundsCenterY = function (item) {
            return _this.rectBounds(item).leftCenter().y();
        };

        _this.boundsCenterX = function (item) {
            return _this.rectBounds(item).topCenter().x();
        };

        _this.removeBoxes = function () {
            _this.boxes().data(_this.entity(), _this.boxKey).exit().remove();
        };

        _this.boxes = function () {
            return _this.chart().selectAll('.box');
        };

        _this.boxRect = function () {
            return _this.boxes().select('rect');
        };

        _this.boxRectLine = function () {
            return _this.boxes().select('line.average');
        };

        _this.whiskerTopLine = function () {
            return _this.boxes().select('line.whisker.top');
        };

        _this.whiskerBottomLine = function () {
            return _this.boxes().select('line.whisker.bottom');
        };

        _this.verticalLine = function () {
            return _this.boxes().select('line.vertical');
        };

        _this.whiskerTopText = function () {
            return _this.boxes().select('text.whisker.top');
        };

        _this.whiskerBottomText = function () {
            return _this.boxes().select('text.whisker.bottom');
        };

        _this.averageText = function () {
            return _this.boxes().select('text.average');
        };

        _this.quartileTopText = function () {
            return _this.boxes().select('text.quartile.top');
        };

        _this.quartileBottomText = function () {
            return _this.boxes().select('text.quartile.bottom');
        };

        _this.stringWidth = function (string) {
            if (_.isUndefined(string)) return 0;
            if (_.isEmpty(''+string)) return 0;
            var text = _this.chart().append('text')
                .style('font-size', _this.labelFontSize()+'px')
                .attr('opacity', '.0')
                .text(''+string);
            var width = text[0][0].getComputedTextLength();
            if (width === 0)
                width = text[0][0].getBoundingClientRect().width;
            text.remove();
            return width;
        };

        _this.labelRightOffset = function (item, value) {
            return _this.boxWidth(item) + _this.stringWidth(value) + _this.labelMargin()
        };

        _this.labelLeftOffset = function () {
            return -_this.labelMargin()
        };

        _this.addBoxes = function () {
            var boxes = _this.boxes().data(_this.entity(), _this.boxKey).enter().append('g').attr('class', 'box');
            _this.boxes()
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('transform', _this.boxTranslation);
            boxes.append('line').attr('class', 'vertical');
            _this.verticalLine()
                .attr('stroke-dasharray','5,5')
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('x1', _this.boundsCenterX)
                .attr('y1', 0)
                .attr('x2', _this.boundsCenterX)
                .attr('y2', _this.outerBoxHeight);
            boxes.append('rect');
            _this.boxRect()
                .style('fill', 'white')
                .style('stroke','black')
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('width', _this.boxWidth)
                .attr('height', _this.boxHeight)
                .attr('transform', _this.innerBoxTranslation);
            boxes.append('line').attr('class', 'average');
            _this.boxRectLine()
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('x1', 0)
                .attr('y1', _this.boundsCenterY)
                .attr('x2', _this.boxWidth)
                .attr('y2', _this.boundsCenterY);
            boxes.append('line').attr('class', 'whisker top');
            _this.whiskerTopLine()
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', _this.boxWidth)
                .attr('y2', 0);
            boxes.append('line').attr('class', 'whisker bottom');
            _this.whiskerBottomLine()
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('x1', 0)
                .attr('y1', _this.outerBoxHeight)
                .attr('x2', _this.boxWidth)
                .attr('y2', _this.outerBoxHeight);
            boxes.append('text').attr('class', 'whisker top');
            _this.whiskerTopText()
                .style('font-size', _this.labelFontSize()+'px')
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('dy',_this.labelFontHalfSize)
                .attr('text-anchor', 'end')
                .attr('x', function(item){ return _this.labelRightOffset(item,_this.higherWhiskerValue(item)) })
                .attr('y', 0)
                .text(_this.higherWhiskerValue);
            boxes.append('text').attr('class', 'whisker bottom');
            _this.whiskerBottomText()
                .style('font-size', _this.labelFontSize()+'px')
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('dy',_this.labelFontHalfSize)
                .attr('text-anchor', 'end')
                .attr('x', function(item) { return _this.labelRightOffset(item,_this.lowerWhiskerValue(item)) })
                .attr('y', _this.outerBoxHeight)
                .text(_this.lowerWhiskerValue);
            boxes.append('text').attr('class', 'average');
            _this.averageText()
                .style('font-size', _this.labelFontSize()+'px')
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('dy',_this.labelFontHalfSize)
                .attr('text-anchor', 'end')
                .attr('x', function(item) { return _this.labelRightOffset(item,_this.yValue(item)) })
                .attr('y', _this.boundsCenterY)
                .text(_this.yValue);
            boxes.append('text').attr('class', 'quartile top');
            _this.quartileTopText()
                .style('font-size', _this.labelFontSize()+'px')
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('dy',_this.labelFontHalfSize)
                .attr('text-anchor', 'end')
                .attr('x', _this.labelLeftOffset)
                .attr('y', function(item){return _this.rectBounds(item).topLeft().y()})
                .text(_this.higherQuartileValue);
            boxes.append('text').attr('class', 'quartile bottom');
            _this.quartileBottomText()
                .style('font-size', _this.labelFontSize()+'px')
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('dy',_this.labelFontHalfSize)
                .attr('text-anchor', 'end')
                .attr('x', _this.labelLeftOffset)
                .attr('y', function(item){return _this.rectBounds(item).bottomLeft().y()})
                .text(_this.lowerQuartileValue);

        };

        return _this;
    }
    return BoxPlot;

});