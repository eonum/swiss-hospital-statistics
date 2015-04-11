define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class BoxPlot
     */
    function BoxPlot(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        var path = _this.svg()
            .append("g")
            .attr("transform", "translate(" + _this._width() / 2 + "," + _this._height() / 2 + ")")
            .selectAll("path");

        var margin = {top: 10, right: 50, bottom: 20, left: 50},
            width = 120 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var min = Infinity,
            max = -Infinity;
/*
        var chart = d3.box()
            .whiskers(iqr(1.5))
            .width(width)
            .height(height);
*/
        chart.domain([min, max]);



        // TODO: define how the BoxPlot will look like

        _this.setData = function (intervals) {

        }

        _this.initialize = function() {
            var svg = d3.select("body").selectAll("svg")
                .data(data)
                .enter().append("svg")
                .attr("class", "box")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.bottom + margin.top)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(chart);
        }
        return _this;
    }
    return AbstractPieChart;

});