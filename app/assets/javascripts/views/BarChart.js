define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg){

    function BarChart(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);

        var intervals = ["0-14", "15-39", "40-69", "70+"];

        var x = d3.scale.ordinal();

        x.domain(intervals);
        x.rangeBands([0, _width], 0.5);

        var y = d3.scale.linear().range([_height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        _this.initialize = function(data){
            y.domain([0, d3.max(data, function(datum){
                return datum.amount;
            })]);

            _this.svg().append("g")
                .attr('transform', 'translate(0,'+ _height +')')
                .attr('class', 'x axis')
                .call(xAxis);

            _this.svg().append("g")
                .attr("class", "y axis")
                .call(yAxis);

            var points = _this.svg().selectAll(".bars")
                .data(data)
                .enter().append("g");

            var colorScale = d3.scale.category20().domain(intervals);

            points.append("rect")
                .attr("x", function(datum) { return x(datum.interval)})
                .attr("y", function(datum) { return y(datum.amount)})
                .attr("width", function(datum) { return x.rangeBand()})
                .attr("height",function(datum) { return _height - y(datum.amount)})
                .style("fill", function(datum) { return colorScale(datum.interval)});
        };

        return _this;
    }

    return BarChart;
});