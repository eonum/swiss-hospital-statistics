define([
    'views/abstract/AxisGraphChart'
], function (
    AxisGraphChart
){
    function OrdinalCurveChart(_width, _height) {
        var _this = new AxisGraphChart(_width, _height);


        _this.defaultSettings = override(_this, _this.defaultSettings, function () {
            var settings = this.super();
            settings.xDomain = function(entity) { return _.unique(_.flatten(_.map(entity, function(serie){
                return _.map(serie, _this.xValue);
            }))) };
            settings.yDomain = function(entity) { return [ 0, d3.max(entity, function(serie){
                return d3.max(serie, _this.yValue);
            })]};
            return _.extend(settings,{
                name: function(serie) {return _.indexOf(_this.entity(), serie)}
            });
        });

        /**
         * @override
         */
        _this.renderContent = function () {
            _this.updateLayers();
            _this.updateCircles();
        };

        _this.name = function (func) {
            _this.settings().name = func;
            return _this;
        };

        _this.updateLayers = function() {
            _this.removeLayers();
            _this.addLayers();
        };

        _this.serieName = function(serie) {
            return _this.settings().name(serie);
        };

        /**
         * @param index
         * @returns {*}
         * @override
         */
        _this.colorScale = function (index) {
            return _this.settings().color(_this.serieName(_this.itemAt(index)));
        };

        _this.data = function() {
            return _.map(_this.entity(), function(each, index){return index});
        };

        _this.layers = function () {
            return _this.chart().selectAll('.layer');
        };

        _this.addCirclesAt = function (index) {
            _this.circlesAt(index).data(_this.itemAt(index), _this.xValue).enter().append('circle');
        };

        _this.removeCirclesAt = function (index) {
            _this.circlesAt(index).data(_this.itemAt(index), _this.xValue).exit().remove();
        };

        _this.removeLayers = function () {
            _this.layers().data(_this.data()).exit().remove();
        };

        _this.layerAt = function(index) {
            return _this.chart().selectAll('[index=\''+index+'\']');
        };

        _this.circlesAt = function(index) {
            return _this.layerAt(index).selectAll('circle');
        };

        _this.line = function(index) {
            return (d3.svg.line()
                .interpolate('monotone')
                .x(_this.scaledXValue)
                .y(_this.scaledYValue))(_this.itemAt(index));
        };

        _this.scaledXValue = override(_this,_this.scaledXValue, function(item){
            return this.super(item) + _this.xScale().rangeBand(item) / 2.0;
        });

        _this.series = function () {
            return _this.chart().selectAll('.serie');
        };

        _this.lineFromX = function(item) {
            return _this.scaledXValue(item);
        };

        _this.lineFromY = function (item) {
            return _this.scaledYValue(item);
        };

        _this.addLayers = function () {
            var layers = _this.layers().data(_this.data()).enter().append('g')
                .attr('class', 'layer')
                .attr('index', function(d, index) {return index});
            layers.append('path')
                .attr('class', 'serie')
                .attr('fill', 'none')
                .style('stroke', _this.colorScale);
            _this.series()
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('d', _this.line);
        };

        _this.updateCircles = function () {
            _this.layers().each(function(index){
                _this.removeCirclesAt(index);
                _this.addCirclesAt(index);
                _this.updateCirclesAt(index);
            });
        };

        _this.updateCirclesAt = function (index) {
            _this.circlesAt(index)
                .style('fill', _this.colorScale(index))
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr("cx", _this.scaledXValue)
                .attr("cy", _this.scaledYValue)
                .attr("r", 4);
        };

        return _this;
    }

    return OrdinalCurveChart;
});