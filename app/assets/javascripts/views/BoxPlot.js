define(['d3', 'views/ResponsiveSvg', '/views/Box'], function (d3, ResponsiveSvg, Box) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class BoxPlot
     */
    function BoxPlot(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        var boxPlots = _this.svg().append("g")
            .attr("transform", "translate(40, " + titleFontSize + ")");

        var margin = {top: 10, right: 50, bottom: 20, left: 50},
            width = 120 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var min = Infinity,
            max = -Infinity;

        _this.initialize = function() {

        };

        _this.setData = function (data) {

            var bars = boxPlots.selectAll("rect")
                .data(data)
                .enter().append("g").append("rect");

            // Need data to calculate on
            var chart = new Box()
                .whiskers([2,10])
                .width(width)
                .height(height);

            var svg = d3.select("body").selectAll("svg")
                .data()
                .enter().append("svg")
                .attr("class", "box")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.bottom + margin.top)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(chart);

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

            function iqr(k) {
                return function(d, i) {
                    var q1 = d.quartiles[0],
                        q3 = d.quartiles[2],
                        iqr = (q3 - q1) * k,
                        i = -1,
                        j = d.length;
                    while (d[++i] < q1 - iqr);
                    while (d[--j] > q3 + iqr);
                    return [i, j];
                };
        };

        // TODO change that number
        _this.initialize()

        return _this;
    }
    return BoxPlot;

});