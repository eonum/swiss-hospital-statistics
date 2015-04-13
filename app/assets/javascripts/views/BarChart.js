define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg){

    /**
     * Creates a bar chart that displays ordinal values on a linear y scale and has a title.
     * @param _width the width of the coordinate system of this chart
     * @param _height the height of the coordinate system of this chart
     * @returns {ResponsiveSvg} the new bar chart
     * @constructor
     */
    function BarChart(_width, _height){
        var TRANSITION_TIME = 1000;

        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);

        var x = d3.scale.ordinal();

        x.rangeBands([0, _width], 0.5);

        var titleFontSize = _height / 20;
        var chartHeight = _height - titleFontSize;

        var y = d3.scale.linear().range([chartHeight, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        _this.svg().append("text")
            .attr("id", "title")
            .style("font-size", titleFontSize + "px");

        var chartGroup = _this.svg().append("g")
            .attr("transform", "translate(40, " + titleFontSize + ")");

        _this.initialize = function(){

            chartGroup.append("g")
                .attr('transform', 'translate(0,'+ chartHeight+')')
                .attr('class', 'x axis')
                .call(xAxis);

            chartGroup.append("g")
                .attr("class", "y axis");

            return _this;
        };

        _this.setData = function (data){
            chartGroup.selectAll("rect")
                .data(data)
                .exit().remove();

            var bars = chartGroup.selectAll("rect")
                .data(data)
                .enter().append("g").append("rect");

            var xDomain = _.map(data, function(datum){ return datum.interval}).sort();
            var colorScale = d3.scale.category20().domain(xDomain);

            x.domain(xDomain);
            y.domain([0, d3.max(data, function(datum){
                return datum.amount;
            })]);

            chartGroup.selectAll(".x.axis").transition().duration(TRANSITION_TIME).call(xAxis);
            chartGroup.selectAll(".y.axis").transition().duration(TRANSITION_TIME).call(yAxis);

            chartGroup.selectAll("rect").data(data)
                .style("fill", function(datum) { return colorScale(datum.interval)})
                .transition()
                .duration(TRANSITION_TIME)
                .attr("x", function(datum) { return x(datum.interval)})
                .attr("y", function(datum) { return y(datum.amount) - 1})
                .attr("width", function(datum) { return x.rangeBand()})
                .attr("height",function(datum) { return chartHeight - y(datum.amount)});

            return _this;
        };

        _this.setTitle = function(text){
            _this.svg().select("#title")
                .transition()
                .duration(TRANSITION_TIME)
                .text(text);

            return _this;
        };

        _this.initialize();

        return _this;
    }

    return BarChart;
});