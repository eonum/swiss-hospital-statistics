define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg) {

    function OrdinalCurveChart(_width, _height) {
        var TRANSITION_TIME = 1000;

        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);

        var x = d3.scale.ordinal();

        x.rangePoints([0, _width], 0.5);

        var titleFontSize = _height / 20;
        _this.svg().append("text")
            .attr("id", "title")
            .style("font-size", titleFontSize + "px");

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

            _this.svg().selectAll(".connection")
                .data(data)
                .enter().append("g").append("line")
                .attr("class", "connection");

            _this.svg().selectAll("circle")
                .data(data)
                .enter().append("g").append("circle");

            var xDomain = _.map(data, function(datum){ return datum.interval});
            var colorScale = d3.scale.category20().domain(xDomain);

            x.domain(xDomain);
            y.domain([0, d3.max(data, function(datum){
                return datum.amount;
            })]);

            _this.svg().selectAll(".x.axis").call(xAxis);
            _this.svg().selectAll(".y.axis").call(yAxis);

            _this.svg().selectAll(".connection")
                .data(data)
                // filter out last element
                .filter(function (datum, index) {return index != data.length -1 })
                .attr("stroke-width", 2)
                .attr("stroke", "black")
                .attr("x1", function(datum) { return x(datum.interval)})
                .attr("y1", function(datum) { return y(datum.amount) - 1})
                .attr("x2", function(datum, index) { return x(data[index + 1].interval)})
                .attr("y2", function(datum, index) { return y(data[index + 1].amount)});

            _this.svg().selectAll("circle").data(data)
                .style("fill", function(datum) { return colorScale(datum.interval)})
                .attr("cx", function(datum) { return x(datum.interval)})
                .attr("cy", function(datum) { return y(datum.amount) - 1})
                .attr("r", 10);

            _this.setTitle = function(text){
                _this.svg().select("#title")
                    .transition()
                    .duration(TRANSITION_TIME)
                    .text(text);

                return _this;
            };

            _this.setTitle = function(text){
                _this.svg().select("#title")
                    .transition()
                    .duration(TRANSITION_TIME)
                    .text(text);

                return _this;
            };

            return _this;
        };

        _this.initialize();

        return _this;
    }

    return OrdinalCurveChart;
});


/*_this.svg().selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    .attr("r", 2.5);*/