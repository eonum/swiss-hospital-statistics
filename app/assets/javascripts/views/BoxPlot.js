define(['d3', 'views/ResponsiveSvg', 'views/Box'], function (d3, ResponsiveSvg, Box) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class BoxPlot
     */
    function BoxPlot(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        var margin = {top: 10, right: 20, bottom: 20, left: 20},
            width = 60 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        var min = Infinity,
            max = -Infinity;

        _this.initialize = function() {

        };

        _this.setData = function (data) {
            console.log("SETDATA");
            console.log(data);
           //var bars = boxPlots.selectAll("rect")
           //     .data(data)
           //     .enter().append("g").append("rect");

            // Need data to calculate on
            var chart = Box()
                .whiskers(data.lowerQ, data.higherQ)
                .width(width)
                .height(height);

            chart.domain([min, max]);

            var svg = _this.svg().selectAll("svg")
                .data(data)
                .enter()
                .append("svg")
                .attr("class", "box")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.bottom + margin.top)
                .attr("transform", function(d, i){
                   return  "translate(" + (i*width*5) + "," + margin.top + ")";
                })
                .append("g")
                .attr("transform", "translate(" + margin.left + ")")
                .call(chart);
/*
            svg.append("svg")
                .attr("class", "box")
                .attr("width", width + (margin.left) + margin.right)
                .attr("height", height + margin.bottom + margin.top)
                .attr("transform", function(d, i){
                    return  "translate(" + (i*width*5) + "," + margin.top + ")";
                })
                .append("g")
                .attr("transform", "translate(" + margin.top + ")")
                .call(chart);

            _this.svg().selectAll("svg")
                .data(data)
                .exit()
                .remove();
*/

        };

        _this.initialize();

        return _this;
    }
    return BoxPlot;

});