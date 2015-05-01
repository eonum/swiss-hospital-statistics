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

        var title;
        var chartGroup;

        var settings;
        var xScale;
        var yScale;
        var xAxis;
        var yAxis;
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
                yScale: function(scale) { return scale.linear() }
            };
        };

        _this.render = function () {
            if (_.isUndefined(_this.entity()))
                throw 'Entity can\'t be null';
        };

        _this.entity = function () {
            return entity;
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

        /**
         * Returns title dom element
         * @returns {*}
         */
        _this.title = function () {
            return title;
        };

        /**
         * Returns true if title dom element exists, false otherwise
         * @returns {boolean}
         */
        _this.hasTitle = function () {
            return !_.isUndefined(_this.title());
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
         * @private
         */
        _this._title = function() {
            var text = _this.settings().title(_this.entity());
            return _.isUndefined(text) ? "" : text;
        };

        /**
         * Updates title based on entity and title configuration
         * @returns {*}
         */
        _this.updateTitle = function () {
            _this.title().transition()
                .duration(_this.settings().transitionDuration)
                .text(_this._title());
        };


        _this.initialize = function(){
            _this.margin({top: 50, right: 140, bottom: 50, left: 50});
            title = _this.newTitle();


            chartGroup = _this.svg().append("g")
                .attr("transform", "translate(40, " + _this.titleFontSize() + ")");
            chartGroup.append("g")
                .attr('transform', 'translate(0,'+ _this.chartHeight()+')')
                .attr('class', 'x axis')
                .call(_this.xAxis());

            chartGroup.append("g")
                .attr("class", "y axis");

            return _this;
        };

        _this.setData = function (data){
            chartGroup.selectAll("rect")
                .data(data)
                .exit().remove();
            chartGroup.selectAll(".bar")
                .data(data)
                .exit().remove();

            var barGroups = chartGroup.selectAll(".bar")
                .data(data)
                .enter().append("g").attr("class", "bar");

            barGroups.append("rect");
            barGroups.append("text").style("font-size", "24px").attr("text-anchor", "middle");

            var xDomain = _.map(data, function(datum){ return datum.interval}).sort();
            var colorScale = d3.scale.category20().domain(xDomain);

            _this.xScale().domain(xDomain);
            _this.yScale().domain([0, d3.max(data, function(datum){
                return datum.amount;
            })]);

            chartGroup.selectAll(".x.axis").transition().duration(_this.settings().transitionDuration).call(_this.xAxis());
            chartGroup.selectAll(".y.axis").transition().duration(_this.settings().transitionDuration).call(_this.yAxis());

            barGroups = chartGroup.selectAll(".bar").data(data);
            barGroups
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr("transform", function(datum) { return "translate(" + _this.xScale()(datum.interval)+ ","+ (_this.yScale()(datum.amount) -1) + ")"});

            barGroups.select("rect")
                .style("fill", function(datum) { return colorScale(datum.interval)})
                .transition()
                .duration(_this.settings().transitionDuration)
                .attr("width", function(datum) { return _this.xScale().rangeBand()})
                .attr("height",function(datum) { return _this.chartHeight() - _this.yScale()(datum.amount)});
            barGroups.select("text").attr("x", function(datum){return _this.xScale().rangeBand()/2}).attr("y", 30).text(function(datum){return datum.amount});

            return _this;
        };

        _this.setTitle = function(text){
            _this.settings().title = function() {return text};
            _this.updateTitle();
            return _this;
        };

        _this.initialize();

        return _this;
    }

    return BarChart;
});