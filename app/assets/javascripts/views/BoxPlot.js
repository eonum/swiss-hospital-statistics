define(['d3', 'views/ResponsiveSvg', 'views/Box'], function (d3, ResponsiveSvg, Box) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class BoxPlot
     */
    function BoxPlot(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        var margin = {top: 10, right: 50, bottom: 20, left: 50},
            width = 120 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var min = Infinity,
            max = -Infinity;

        _this.initialize = function() {

        };

        _this.setData = function (data) {
            console.log("AFTER");
            console.log(data);
           // var bars = boxPlots.selectAll("rect")
           //     .data(data)
           //     .enter().append("g").append("rect");

            // Need data to calculate on
            var chart = Box()
                .whiskers(data.lowerQ.amount, data.higherQ.amount)
                .width(width)
                .height(height);

            chart.domain([min, max]);

            var svg = d3.select("body").selectAll("svg")
                .data(data)
                .enter().append("svg")
                .attr("class", "box")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.bottom + margin.top)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(chart);


        };

        // TODO change that number
        _this.initialize()

        return _this;
    }
    return BoxPlot;

});