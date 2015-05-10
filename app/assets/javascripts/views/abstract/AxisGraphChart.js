define([
    'd3',
    'views/ResponsiveSvg'
], function (
    d3,
    ResponsiveSvg
){

    /**
     *
     * @param _width
     * @param _height
     * @returns {ResponsiveSvg}
     * @constructor
     * @class {AxisGraphChart}
     */
    function AxisGraphChart(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(20);
        _this.marginLeft(0);
        _this.marginRight(140);
        _this.marginBottom(40);

        var title;
        var chart;
        var legend;

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
                legendWidth: 30,
                titleFontSize: 5,
                leftOffset: 40,
                legendItems: function() { return [] },
                legendLabel: function(item) { return item.toString() },
                legendColor: d3.scale.category20(),
                legendBarTopPadding: 5,
                legendBarLeftPadding: 5,
                legendBarHeight: 25,
                legendBarFontSize: 14
            };
        };

        _this.settingsDo = function(func) {
            func(_this.settings());
            return _this;
        };

        _this.transitionDuration = function (number) {
            if (_.isUndefined(number)) return _this.settings().transitionDuration;
            _this.settings().transitionDuration = number;
            return _this;
        };

        _this.leftOffset = function() {
            return _this.settings().leftOffset;
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

        _this.asFunction = function (object) {
            return _.isFunction(object) ? object : function() { return object };
        };

        _this.initialize = function(){
            title = _this.newTitle();
            chart = _this.newChart();
            legend = _this.newLegend();
        };

        _this.render = function () {
            if (_.isUndefined(_this.entity()))
                throw 'Entity can\'t be null';
            _this.updateScales();
            _this.updateTitle();
            _this.updateLegend();
            _this.renderContent();
        };

        /**
         * Override to add additional logic
         */
        _this.renderContent = function () {
            // default is empty
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
            return _this._height() / 100 * _this.settings().titleFontSize;
        };

        /**
         * Calculates actual chart height
         * @returns {number}
         */
        _this.chartHeight = function () {
            return _this._height() - _this.titleFontSize();
        };

        _this.chartWidth = function () {
            return _this._width() - _this.legendWidth();
        };

        _this.legendWidth = function () {
            return _this._width() / 100 * _this.settings().legendWidth;
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

        _this.itemAt  = function(_index) {
            var index = Math.min(_index, _.size(_this.entity()) - 1);
            return _this.entity()[index];
        };

        /**
         * Creates default Scale for x axis
         * @returns {*}
         */
        _this.defaultXScale = function () {
            return _this.settings()
                .xScale(d3.scale).rangeBands([0, _this.chartWidth()], 0.5);
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
                .orient('bottom');
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
                .orient('left');
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
            return _this.svg().append('text')
                .attr('class', 'title')
                .style('font-size', _this.titleFontSize() + 'px');
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
            new Multiglot()
                .d3()
                .on(_this.titleView())
                .custom(_this.titleText())
                .set(function(html, text) {html.text(text)})
                .apply();
        };

        _this.chart = function () {
            return chart;
        };

        _this.newChart = function () {
            var chart = _this.svg().append('g')
                .attr('transform', 'translate('+_this.leftOffset()+', ' + _this.titleFontSize() + ')');
            chart.append('g')
                .attr('transform', 'translate(0,'+ _this.chartHeight()+')')
                .attr('class', 'x axis')
                .call(_this.xAxis());
            chart.append('g')
                .attr('class', 'y axis');
            return chart;
        };

        _this.newLegend = function() {
            return _this.svg().append('g')
                .attr('transform', 'translate('+(_this.leftOffset() + _this.chartWidth())+', ' + _this.titleFontSize() + ')')
                .attr('class', 'legend');
        };

        _this.legend = function () {
            return legend;
        };

        _this.legendBars = function () {
            return _this.legend().selectAll('.bar');
        };

        _this.legendBarText = function () {
            return _this.legendBars().select('text');
        };

        _this.legendBarRect = function () {
            return _this.legendBars().select('rect');
        };

        _this.legendBarTranslation = function(item, index) {
            return 'translate(0,'+ ((_this.legendBarHeight() + _this.legendBarTopPadding()) * index) + ')';
        };

        _this.legendBarTopPadding = function () {
            return  _this.settings().legendBarTopPadding;
        };

        _this.legendBarLeftPadding = function () {
            return  _this.settings().legendBarLeftPadding;
        };

        _this.legendBarLabel = function (item) {
            return _this.settings().legendLabel(item, _this.entity(), _this.rawEntity())[Multiglot.language];
        };

        _this.legendItems = function () {
            return _this.settings().legendItems(_this.rawEntity(), _this.entity());
        };

        _this.updateLegend = function() {
            _this.removeLegendBars();
            _this.addLegendBars();
        };

        _this.removeLegendBars = function () {
            _this.legendBars().data(_this.legendItems()).exit().remove();
        };

        _this.legendColorScale = function (item, index) {
            return _this.settings().legendColor(index);
        };

        _this.legendBarHeight = function() {
            return _this.settings().legendBarHeight;
        };

        _this.legendBarTextSize = function () {
            return _this.settings().legendBarFontSize;
        };

        _this.legendBarTextY = function () {
            return _this.legendBarHeight() - _this.legendBarTextSize() / 2.0;
        };

        _this.textWrap = function() {
            var self = d3.select(this),
                textLength = self.node().getComputedTextLength(),
                text = self.text();
            while (textLength > (_this.legendWidth() - _this.legendBarLeftPadding()) && text.length > 0) {
                text = text.slice(0, -1);
                self.text(text + '...');
                textLength = self.node().getComputedTextLength();
            }
        };

        _this.addLegendBars = function () {
            var bars = _this.legendBars().data(_this.legendItems()).enter().append('g')
                .attr('class', 'bar');

            _this.legendBars()
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('transform', _this.legendBarTranslation);

            bars.append('rect');
            _this.legendBarRect()
                .style('fill', _this.legendColorScale)
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr('width', _this.legendWidth())
                .attr('height', _this.legendBarHeight);

            bars.append('text');
            _this.legendBarText()
                .style('font-size', _this.legendBarTextSize()+'px')
                .attr('class', 'light-font')
                .attr('text-anchor', 'start')
                .attr('fill', 'white')
                .style('text-overflow', 'ellipsis')
                .style('white-space', 'nowrap')
                .attr('x', _this.legendBarLeftPadding)
                .attr('y', _this.legendBarTextY)
                .text(_this.legendBarLabel)
                .attr('width', _this.legendWidth())
                .each(_this.textWrap);
        };


        _this.on = function (_entity){
            _this.entity(_entity);
            return _this;
        };

        return _this;
    }

    return AxisGraphChart;
});