define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg){

    /**
     * Creates a bar chart that displays ordinal values on a linear y scale and has a title.
     * @param _width the width of the coordinate system of this chart
     * @param _height the height of the coordinate system of this chart
     * @returns {ResponsiveSvg} the new bar chart
     * @constructor
     */
    function BarChart(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);
        _this.margin({top: 50, right: 140, bottom: 50, left: 50});

        var title;
        var chart;

        var settings;
        var xScale;
        var yScale;
        var xAxis;
        var yAxis;

        var rawEntity;
        var entity;

        _this.settings = function () {
            if (_.isUndefined(settings))
                settings = _this.defaultSettings();
            return settings;
        };

        _this.defaultSettings = function () {
            return {
                transitionDuration: 1000,
                title: _.noop,
                display: _.identity,
                x: 'x',
                y: 'y',
                transformedX: _.identity,
                transformedY: _.identity,
                xScale: function(scale) { return scale.ordinal() },
                yScale: function(scale) { return scale.linear() },
                xDomain: function(entity) { return _.map(entity, _this.xValue) },
                yDomain: function(entity) { return [ 0, d3.max(entity, _this.yValue) ] },
                color: d3.scale.category20(),
                label: _.identity
            };
        };

        _this.transitionDuration = function (number) {
            if (_.isUndefined(number)) return _this.settings().transitionDuration;
            _this.settings().transitionDuration = number;
            return _this;
        };

        _this.title = function (object) {
            _this.settings().title = _this.asFunction(object);
            return _this;
        };

        _this.display = function (object) {
            _this.settings().display = _this.asFunction(object);
            return _this;
        };

        _this.x = function (string) {
            _this.settings().x = string;
            return _this;
        };

        _this.y = function (string) {
            _this.settings().y = string;
            return _this;
        };

        _this.transformedX = function (object) {
            _this.settings().transformedX = _this.asFunction(object);
            return _this;
        };

        _this.transformedY = function (object) {
            _this.settings().transformedY = _this.asFunction(object);
            return _this;
        };

        _this.label = function (object) {
            _this.settings().label = _this.asFunction(object);
            return _this;
        };

        _this.asFunction = function (object) {
            return _.isFunction(object) ? object : function() { return object };
        };


        _this.initialize = function(){
            title = _this.newTitle();
            chart = _this.newChart();
        };

        _this.render = function () {
            if (_.isUndefined(_this.entity()))
                throw 'Entity can\'t be null';
            _this.updateScales();
            _this.updateTitle();
            _this.updateBars();
        };

        _this.entity = function (_entity) {
            if (_.isUndefined(_entity)) return entity;
            var isNil = _.isUndefined(_this.rawEntity());
            rawEntity = _entity;
            entity = _this.settings().display(_this.rawEntity());
            if (isNil) _this.initialize();
            _this.render();
        };

        _this.rawEntity = function () {
            return rawEntity;
        };

        /**
         * Calculates title font size based on visualisation's height
         * @returns {number}
         */
        _this.titleFontSize = function () {
            return _this._height() / 20;
        };

        /**
         * Calculates actual chart height
         * @returns {number}
         */
        _this.chartHeight = function () {
            return _this._height() - _this.titleFontSize();
        };

        /**
         * Returns current Scale used for x axis.
         * @see {@link https://github.com/mbostock/d3/wiki/Ordinal-Scales#ordinal}
         * @returns {*}
         */
        _this.xScale = function () {
            if (_.isUndefined(xScale))
                xScale = _this.defaultXScale();
            return xScale;
        };

        _this.xValue = function (item) {
            return _this.settings().transformedX(item[_this.settings().x]);
        };

        _this.yValue = function (item) {
            return _this.settings().transformedY(item[_this.settings().y]);
        };

        _this.scaledXValue = function (item) {
            return _this.xScale()(_this.xValue(item));
        };

        _this.scaledYValue = function (item) {
            return _this.yScale()(_this.yValue(item));
        };

        /**
         * Creates default Scale for x axis
         * @returns {*}
         */
        _this.defaultXScale = function () {
            return _this.settings()
                .xScale(d3.scale).rangeBands([0, _this._width()], 0.5);
        };

        /**
         * Returns current Scale used for y axis;
         * @see {@link https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear}
         * @returns {*}
         */
        _this.yScale = function() {
            if (_.isUndefined(yScale))
                yScale = _this.defaultYScale();
            return yScale;
        };

        /**
         * Creates default Scale for y axis
         * @returns {*}
         */
        _this.defaultYScale = function () {
            return _this.settings()
                .yScale(d3.scale).range([_this.chartHeight(), 0]);
        };

        /**
         * Returns current x axis. Creates new one if absent
         * @see {@link https://github.com/mbostock/d3/wiki/SVG-Axes}
         * @returns {*}
         */
        _this.xAxis = function () {
            if (_.isUndefined(xAxis))
                xAxis = _this.defaultXAxis();
            return xAxis;
        };

        /**
         * Creates x axis using current x scale
         * @returns {*}
         */
        _this.defaultXAxis = function () {
            return d3.svg.axis()
                .scale(_this.xScale())
                .orient("bottom");
        };

        /**
         * Returns current y axis. Creates new one if absent
         * @see {@link https://github.com/mbostock/d3/wiki/SVG-Axes}
         * @returns {*}
         */
        _this.yAxis = function () {
            if (_.isUndefined(yAxis))
                yAxis = _this.defaultYAxis();
            return yAxis;
        };

        /**
         * Creates y axis using current y scale
         * @returns {*}
         */
        _this.defaultYAxis = function () {
            return d3.svg.axis()
                .scale(_this.yScale())
                .orient("left");
        };

        _this.xDomain = function () {
            return _this.settings().xDomain(_this.entity());
        };

        _this.yDomain = function () {
            return _this.settings().yDomain(_this.entity());
        };

        _this.xAxisView = function () {
            return _this.chart().selectAll('.x.axis');
        };

        _this.yAxisView = function () {
            return _this.chart().selectAll('.y.axis');
        };

        _this.colorScale = function (item) {
            return (_this.settings().color.domain(_this.xDomain()))(_this.xValue(item));
        };

        _this.updateScales = function () {
            _this.xScale().domain(_this.xDomain());
            _this.yScale().domain(_this.yDomain());
            _this.xAxisView().transition().duration(_this.settings().transitionDuration).call(_this.xAxis());
            _this.yAxisView().transition().duration(_this.settings().transitionDuration).call(_this.yAxis());
        };

        /**
         * Returns title dom element
         * @returns {*}
         */
        _this.titleView = function () {
            return title;
        };

        /**
         * Returns true if title dom element exists, false otherwise
         * @returns {boolean}
         */
        _this.hasTitle = function () {
            return !_.isUndefined(_this.titleView());
        };

        /**
         * Creates new title element and adds it to the dom
         * @returns {*}
         */
        _this.newTitle = function () {
            return _this.svg().append("text")
                .attr("class", "title")
                .style("font-size", _this.titleFontSize() + "px");
        };

        /**
         * Returns string title of the entity
         * @returns {string}
         */
        _this.titleText = function() {
            var text = _this.settings().title(_this.rawEntity());
            return _.isUndefined(text) ? "" : text;
        };

        /**
         * Updates title based on entity and title configuration
         * @returns {*}
         */
        _this.updateTitle = function () {
            _this.titleView().transition()
                .duration(_this.settings().transitionDuration)
                .text(_this.titleText());
        };

        _this.chart = function () {
            return chart;
        };

        _this.newChart = function () {
            var group = _this.svg().append("g")
                .attr("transform", "translate(40, " + _this.titleFontSize() + ")");
            group.append("g")
                .attr('transform', 'translate(0,'+ _this.chartHeight()+')')
                .attr('class', 'x axis')
                .call(_this.xAxis());
            group.append("g")
                .attr("class", "y axis");
            return group;
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
            return 'translate(' + _this.scaledXValue(item)+ ','+ _this.scaledYValue(item) + ')';
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
                .attr('width', _this.xScale().rangeBand)
                .attr('height', function(item) { return _this.chartHeight() - _this.scaledYValue(item)});

            bars.append('text');
            _this.barText()
                .style('font-size', '18px')
                .attr('text-anchor', 'middle')
                .attr('fill', '#ffffff')
                .attr('x', function(){return _this.xScale().rangeBand()/2})
                .attr('y', 30)
                .text(_this.barLabel);
        };

        _this.on = function (_entity){
            _this.entity(_entity);
            return _this;
        };

        return _this;
    }

    return BarChart;
});