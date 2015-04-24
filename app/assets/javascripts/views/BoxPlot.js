define(['d3', 'views/ResponsiveSvg', 'views/Box'], function (d3, ResponsiveSvg, Box) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class BoxPlot
     */
    function BoxPlot(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

        var xScale = d3.scale.ordinal();
        xScale.rangeBands([0, _width], 0.6);

        var yScale = d3.scale.linear();

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);

        var min = Infinity,
            max = -Infinity;

        var xAxis = d3.svg.axis()
            .scale(xScale)
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

        // TODO: Firefox Chrome IE issue ;(
        _this.setData = function (data) {
            var xDomain = _.map(data, function(datum){ return datum.ageInterval}).sort();
            xScale.domain(xDomain);
            _this.svg().selectAll(".x.axis").call(xAxis);

            var margin = {top: 10, right: 20, bottom: 20, left: 20},
                width = xScale.rangeBand() - margin.left - margin.right,
                height = _height - margin.top - margin.bottom;

            yScale.domain([d3.max(data, function(d) {return d.max}), d3.min(data, function(d) {return d.min})]);
            yScale.range([0, height]);
            _this.svg().selectAll(".y.axis").call(yAxis);

            // Need data to calculate on
            var chart = Box(yScale)
                .width(width)
                .height(height)
                .min(min)
                .max(max);

            // yScale(data, function(d) {return d.lowerQ;})

            console.log("whiskers with yScale");
            console.log(yScale(data, function(d) {return d.lowerQ;}));

            chart.domain([min, max]);

            var svg = _this.svg().selectAll(".box")
                .data(data);

            svg.enter()
                .append("g")
                .attr("class", "box")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.bottom + margin.top)
                .append("g")
                .attr("transform", "translate(" + margin.left + ")")
                .call(chart);

            svg.attr("transform", function(d, i){
                return  "translate(" + xScale(d.ageInterval) + "," + margin.top + ")";
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