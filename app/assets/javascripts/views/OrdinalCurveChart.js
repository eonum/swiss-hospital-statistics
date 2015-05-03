define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg) {

    // TODO: So far, only one curve is shown at a time. We use the ordinal curve visualisation to compare multiple Codes.
    // TODO: also, the colors have to be set right. See TODOs below.

    function OrdinalCurveChart(_width, _height) {
        var TRANSITION_TIME = 1000;

        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(20);
        _this.marginLeft(0);
        _this.marginRight(140);
        _this.marginBottom(40);

        var x = d3.scale.ordinal();

        x.rangePoints([0, _this._width()], 0.5);

        var titleFontSize = _this._height() / 20;
        var chartHeight = _this._height() - titleFontSize;

        _this.svg().append("text")
            .attr("id", "title")
            .style("font-size", titleFontSize + "px");

        var y = d3.scale.linear().range([chartHeight, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        var chartGroup = _this.svg().append("g")
            .attr("transform", "translate(40, " + titleFontSize + ")");

        _this.initialize = function(){

            chartGroup.append("g")
                .attr('transform', 'translate(0,'+ chartHeight +')')
                .attr('class', 'x axis')
                .call(xAxis);

            chartGroup.append("g")
                .attr("class", "y axis");

            return _this;
        };

        _this.setData = function (data){

            var lines = chartGroup.selectAll(".connection").data(data);

            lines.enter().append("g").append("line")
                .attr("class", "connection");

            lines.exit().remove();

            chartGroup.selectAll("circle")
                .data(data)
                .enter().append("g").append("circle");

            chartGroup.selectAll("circle")
                .data(data)
                .exit().remove();

            var xDomain = _.map(data, function(datum){ return datum.interval});
            var colorScaleIntervals = d3.scale.category20().domain(xDomain);
            var colorScaleNumbers = d3.scale.category20();

            x.domain(xDomain);
            y.domain([0, d3.max(data, function(datum){
                return datum.amount;
            })]);

            chartGroup.selectAll(".x.axis").transition().duration(TRANSITION_TIME).call(xAxis);
            chartGroup.selectAll(".y.axis").transition().duration(TRANSITION_TIME).call(yAxis);

            // show all lines but the last one
            lines = chartGroup.selectAll(".connection").data(data);
            lines.filter(function (datum, index) {return index != data.length -1 })
                /*TODO: Choose n-th color from scale, n = number of the curve*/
                .style("stroke", function(datum) {return colorScaleNumbers(1)})
                .attr("stroke-width", 0)
                .transition()
                .duration(TRANSITION_TIME)
                .attr("stroke-width", 1.5)
                .attr("stroke", "black")
                .attr("x1", function(datum) { return x(datum.interval)})
                .attr("y1", function(datum) { return y(datum.amount) - 1})
                .attr("x2", function(datum, index) { return x(data[index + 1].interval)})
                .attr("y2", function(datum, index) { return y(data[index + 1].amount)});

            // hide the last element
            lines.filter(function (datum, index) {return index == data.length -1 })
                .attr("stroke-width", 0);

            chartGroup.selectAll("circle").data(data)
                /*TODO: Choose n-th color from scale, n = number of the curve*/
                .style("fill", function(datum) {return colorScaleNumbers(1)})
                .attr("cx", function(datum) { return x(datum.interval)})
                .attr("cy", function(datum) { return y(datum.amount) - 1})
                .attr("r", 4);

            _this.setTitle = function(text){
                _this.svg().select("#title")
                    .transition()
                    .duration(TRANSITION_TIME)
                    .text(text);

                return _this;
            };

            return _this;
        };

        _this.initialize();

        return _this;
    }

    return OrdinalCurveChart;
});