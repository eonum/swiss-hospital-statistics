define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg){

    /**
     * Creates a bar chart that displays ordinal values on a linear y scale.
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

        var y = d3.scale.linear().range([_height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        _this.initialize = function(){

            _this.svg().append("g")
                .attr('transform', 'translate(0,'+ _height +')')
                .attr('class', 'x axis')
                .call(xAxis);

            _this.svg().append("g")
                .attr("class", "y axis");

            return _this;
        };

        _this.setData = function (data){
            var bars = _this.svg().selectAll("rect")
                .data(data)
                .enter().append("g").append("rect");

            var xDomain = _.map(data, function(datum){ return datum.interval});
            var colorScale = d3.scale.category20().domain(xDomain);

            x.domain(xDomain);
            y.domain([0, d3.max(data, function(datum){
                return datum.amount;
            })]);

           _this.svg().selectAll(".x.axis").transition().duration(TRANSITION_TIME).call(xAxis);
           _this.svg().selectAll(".y.axis").transition().duration(TRANSITION_TIME).call(yAxis);
            _this.svg().selectAll("rect").data(data)
                .style("fill", function(datum) { return colorScale(datum.interval)})
                .transition()
                .duration(TRANSITION_TIME)
                .attr("x", function(datum) { return x(datum.interval)})
                .attr("y", function(datum) { return y(datum.amount) - 1})
                .attr("width", function(datum) { return x.rangeBand()})
                .attr("height",function(datum) { return _height - y(datum.amount)});

            return _this;
        };

        _this.initialize();

        return _this;
    }

    return BarChart;
});