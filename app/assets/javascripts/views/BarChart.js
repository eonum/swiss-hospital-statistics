define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg){

    function BarChart(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);

        var x = d3.scale.ordinal();

        x.domain(["0-14", "15-39", "40-69", "70+"]);
        x.rangePoints([0, _width], 1.0);

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
                .call(xAxis);

            _this.svg().append("g")
                .call(yAxis);

            var points = _this.svg().selectAll(".bars")
                .data(data)
                .enter().append("g");

            points.append("rect")
                .attr("x", function(datum) { return x(datum.interval)})
                /*.attr("y", function(datum) { return y(datum.amount)})*/
                .attr("width", 10)
                .attr("height",function(datum) { return y(datum.amount) + 5});
        };

        return _this;
    }

    return BarChart;
});