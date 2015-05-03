define([
    'views/abstract/AxisGraphChart'
], function (
    AxisGraphChart
){

    /**
     * Creates a bar chart that displays ordinal values on a linear y scale and has a title.
     * @param _width the width of the coordinate system of this chart
     * @param _height the height of the coordinate system of this chart
     * @constructor
     * @class {BarChart}
     */
    function BarChart(_width, _height){
        var _this = new AxisGraphChart(_width, _height);

        /**
         * @override
         */
        _this.defaultSettings = override(_this, _this.defaultSettings, function () {
            return _.extend(this.super(),{
                minBarWidth: 70,
                labelFontSize: 15,
                label: _.identity
            });
        });

        /**
         * @override
         */
        _this.renderContent = function () {
            _this.updateBars();
        };

        _this.label = function (object) {
            _this.settings().label = _this.asFunction(object);
            return _this;
        };

        /**
         * Returns all bar elements. One bar consists
         * of colored rectangle and text showing value
         * @returns {*}
         */
        _this.bars = function () {
            return _this.chart().selectAll('.bar');
        };

        _this.barText = function () {
            return _this.bars().select('text');
        };

        _this.barRect = function () {
            return _this.bars().select('rect');
        };

        _this.barTranslation = function(item) {
            return 'translate(' + (_this.scaledXValue(item) + (_this.xScale().rangeBand(item) - _this.barWidth(item))/2)+ ','+ _this.scaledYValue(item) + ')';
        };

        _this.barLabel = function (item) {
            return _this.settings().label(_this.yValue(item));
        };

        _this.updateBars = function() {
            _this.removeBars();
            _this.addBars();
        };

        _this.removeBars = function () {
            _this.bars().data(_this.entity()).exit().remove();
        };

        _this.barWidth = function (item) {
            return Math.min(_this.settings().minBarWidth,_this.xScale().rangeBand(item));
        };

        _this.barHeight = function(item) {
            return _this.chartHeight() - _this.scaledYValue(item);
        };

        _this.barTextSize = function () {
            return _this.settings().labelFontSize;
        };

        _this.barTextX = function (item) {
            return _this.barWidth(item) / 2;
        };

        _this.barTextY = function (item) {
            var y = _this.rawBarTextY(item);
            if (y * 2 + _this.barTextSize() < _this.barHeight(item)) return y;
            y = _this.centeredBarTextY(item);
            if (y > _this.barTextSize()) return y;
            y = y / 2.0 + _this.barTextSize();
            if (y <  _this.barHeight(item)) return y;
            return -5;
        };

        _this.centeredBarTextY = function (item) {
            return (_this.barHeight(item) - _this.barTextSize()) / 2.0;
        };

        _this.rawBarTextY = function () {
            return _this.barTextSize() * 2;
        };

        _this.barTextColor = function(item) {
            return _this.barTextY(item) > 0 ? '#ffffff' : '#222222';
        };

        _this.addBars = function () {
            var bars = _this.bars().data(_this.entity()).enter().append('g')
                .attr('class', 'bar');
            _this.bars()
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('transform', _this.barTranslation);

            bars.append('rect');
            _this.barRect()
                .style('fill', _this.colorScale)
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('width', _this.barWidth)
                .attr('height', _this.barHeight);

            bars.append('text');
            _this.barText()
                .style('font-size', _this.barTextSize()+'px')
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('class', 'light-font')
                .attr('text-anchor', 'middle')
                .attr('fill', _this.barTextColor)
                .attr('x', _this.barTextX)
                .attr('y', _this.barTextY)
                .text(_this.barLabel);
        };

        return _this;
    }

    return BarChart;
});