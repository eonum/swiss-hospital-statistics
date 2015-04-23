define(['d3', 'views/ResponsiveSvg', 'views/Box'], function (d3, ResponsiveSvg, Box) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class BoxPlot
     */
    function BoxPlot(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        var x = d3.scale.ordinal();
        x.rangeBands([0, _width], 0.5);

        var yScale = d3.scale.linear();

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);

        var min = Infinity,
            max = -Infinity;

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");

        _this.initialize = function() {
            _this.svg().append("g")
                .attr('transform', 'translate(0,'+ (_height) +')')
                .attr('class', 'x axis')
                .call(xAxis);

            _this.svg().append("g")
                .attr('class', 'y axis')
                .call(yAxis);
        };

        _this.setData = function (data) {
            var xDomain = _.map(data, function(datum){ return datum.ageInterval}).sort();
            x.domain(xDomain);
            _this.svg().selectAll(".x.axis").call(xAxis);

            var margin = {top: 10, right: 20, bottom: 20, left: 20},
                width = x.rangeBand() - margin.left - margin.right,
                height = _height - margin.top - margin.bottom;


            // Need data to calculate on
            var chart = Box()
                .whiskers(data.lowerQ, data.higherQ)
                .width(width)
                .height(height);

            chart.domain([min, max]);

            var svg = _this.svg().selectAll("svg")
                .data(data);

            svg.enter()
                .append("svg")
                .attr("class", "box")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.bottom + margin.top)
                .append("g")
                .attr("transform", "translate(" + margin.left + ")")
                .call(chart);

            svg.attr("transform", function(d, i){
                return  "translate(" + x(d.ageInterval) + "," + margin.top + ")";
            })
                .call(chart);

            svg.exit()
                .remove();

        };

        _this.initialize();

        return _this;
    }
    return BoxPlot;

});