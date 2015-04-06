define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg) {

    function OrdinalCurveChart(_width, _height) {

        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);

        _this.initialize = function(data){

            _this.svg().selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", 2.5);
        };

        return _this;
    }

    return OrdinalCurveChart;
});