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
            //console.log(_this.entity());

            _this.updateCurves();
        };

        _this.name = function (func) {
            _this.settings().name = func;
            return _this;
        };

        _this.updateCurves = function() {
            //_this.removeLines();
            //_this.removeCircles();
            //_this.addLines();
            //_this.addCircles();

            //_this.removeLayers();
            _this.removeLayers();
            _this.addLayers();

        };

        _this.serieName = function(serie) {
            return _this.settings().name(serie);
        };

        /**
         *
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

        _this.addLayers = function () {
            var layers = _this.layers().data(_this.data()).enter().append('g').attr('class', 'layer');
            layers.append('path')
                .attr('class', 'serie')
                .attr('fill', 'none')
                .style('stroke', _this.colorScale);
            _this.series()
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('d', _this.line);

            //layers.selectAll('circle').data(_this.data(),function(a,b,c){console.log([a,b,c]);});
        };

        _this.removeLayers = function () {
            _this.layers().data(_this.data()).exit().remove();
        };

        _this.addSeries = function () {

            _this.series().data(_this.data()).enter().append('path')
                .attr('class', 'serie')
                .attr('fill', 'none')
                .style('stroke', _this.colorScale);
                //.attr('index', _.identity)
                //.attr('timestamp', Date.now());

                _this.series()
                    .transition()
                    .duration(_this.settings().transitionDuration)
                    .attr('d', _this.line);



            //_.each(_.range(_.size(_.flatten(_this.series())), _.size(_this.entity())), function(index){
            //    _this.chart().append('path')
            //        .attr('class', 'serie')
            //        .style('stroke', _this.colorScale)
            //        .attr('index',index)
            //        .attr('timestamp', Date.now());
            //});
            //
            //_.each(_.flatten(_this.series()), function(path, index){
            //    path
            //        .transition()
            //        .duration(_this.settings().transitionDuration)
            //        .attr('d', _this.line(_this.itemAt(index)));
            //});

            //var series = _this.series().data(_this.entity(),_this.serieIndex).enter().append('path');
            //series
            //    .attr('class', 'serie')
            //    .style('stroke', _this.colorScale)
            //    .attr('index',_this.serieIndex)
            //    .attr('timestamp', Date.now());


                //.transition()
                //.duration(_this.settings().transitionDuration)
                //.attr('d', _this.line);


            //layers.append('circle')
            //    .style('fill', _this.colorScale)
            //    .transition()
            //    .duration(_this.settings().transitionDuration)
            //    .attr("cx", function(o) {return 20})
            //    .attr("cy", 20)
            //    .attr("r", 4);
        };

        _this.line = function(index) {
            return (d3.svg.line()
                .interpolate('monotone')
                .x(_this.scaledXValue)
                .y(_this.scaledYValue))(_this.itemAt(index));
        };

        _this.series = function () {
            return _this.chart().selectAll('.serie');
        };

        _this.removeSeries = function() {
            _this.series().data(_this.data()).exit().remove();
        };

        _this.circles = function () {
            return _this.chart().selectAll('circle');
        };

        _this.removeLines = function () {
            _this.lines().data(_this.entity()).exit().remove();
        };

        _this.removeCircles = function () {
            _this.circles().data(_this.entity()).exit().remove();
        };

        _this.lineFromX = function(item) {
            return _this.scaledXValue(item);
        };

        _this.lineFromY = function (item) {
            return _this.scaledYValue(item);
        };

        _this.lineToX = function(item) {
            var index = _.indexOf(_this.entity(), item);
            return _this.lineFromX(_this.itemAt(index + 1));
        };

        _this.lineToY = function (item) {
            var index = _.indexOf(_this.entity(), item);
            return _this.lineFromY(_this.itemAt(index + 1));
        };

        _this.addLines = function () {
            _this.lines().data(_this.entity()).enter().append('g').append('line').attr('class', 'connection');
            _this.lines()
                .style('stroke','red')
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr("stroke-width", 1.5)
                .attr("stroke", "black")
                .attr("x1", _this.lineFromX)
                .attr("y1", _this.lineFromY)
                .attr("x2", _this.lineToX)
                .attr("y2", _this.lineToY);
        };

        _this.addCircles = function () {
            _this.circles().data(_this.entity()).enter().append('g').append("circle");
            _this.circles()
                .style('fill', _this.colorScale)
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr("cx", _this.lineFromX)
                .attr("cy", _this.lineFromY)
                .attr("r", 4);
        };

        return _this;
    }

    return OrdinalCurveChart;
});