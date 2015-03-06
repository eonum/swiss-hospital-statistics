define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg) {

    function AbstractSeriesChart (_width, _height) {
        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);


        _this._dataOf = function(serie) {return serie[_this._dataSymbol()]};
        _this._nameOf = function(serie) {return serie[_this._serieSymbol()]};
        _this._keyOf = function (entry) {return entry[_this._keySymbol()]};
        _this._valueOf = function (entry) {return entry[_this._valueSymbol()]};
        _this._dataSymbol = function () {return 'data'};
        _this._serieSymbol = function () {return 'serie'};
        _this._keySymbol = function() {return 'key'};
        _this._valueSymbol = function() {return 'value'};
        _this._yAxisName = function () {return 'axis'};
        _this._xAxisName = function () {return 'axis'};
        _this._colorOf = function(serie) { return d3.scale.category10()(_this._nameOf(serie)) };
        _this._labelOf = function(serie) {return _this._nameOf(serie)};
        _this._keyLabelOf = function (key) {return key};
        _this._valueLabelOf = function (value) {return value};


        var x = d3.scale.linear()
            .range([0, _this._width()]);

        var y = d3.scale.linear()
            .range([_this._height(), 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .tickFormat(function(d) { return _this._keyLabelOf(d) })

        var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')
                .tickFormat(function(d) { return _this._valueLabelOf(d) });

        var line = d3.svg.line()
            .interpolate('basis')
            .x(function(entry) { return x(_this._keyOf(entry)); })
            .y(function(entry) { return y(_this._valueOf(entry)); });

        _this.initialize = function(data) {
            x.domain([
                d3.min(data, function(serie) {
                    return d3.min(_this._dataOf(serie), function(entry) {
                        return _this._keyOf(entry);
                    });
                }),
                d3.max(data, function(serie) {
                    return d3.max(_this._dataOf(serie), function(entry) {
                        return _this._keyOf(entry);
                    });
                })
            ]);

            y.domain([
                d3.min(data, function(serie) {
                    return d3.min(_this._dataOf(serie), function(entry) {
                        return _this._valueOf(entry);
                    });
                }),
                d3.max(data, function(serie) {
                    return d3.max(_this._dataOf(serie), function(entry) {
                        return _this._valueOf(entry);
                    });
                })
            ]);

            _this.svg().append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + _this._height() + ')')
                .call(xAxis);

            _this.svg().append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(0)")
                .attr("y",-20)
                .attr("x",-10)
                .attr("dy", ".0em")
                .style("text-anchor", "end")
                .text(_this._yAxisName());

            var city = _this.svg().selectAll(".city")
                .data(data)
                .enter().append("g")
                .attr("class", "city");

            city.append("path")
                .attr("class", "line")
                .attr("d", function(serie) { return line(_this._dataOf(serie));})
                .style("stroke", function(serie) { return _this._colorOf(serie); });

            city.append("text")
                .datum(function(serie) { return { name: _this._labelOf(serie), value: _this._dataOf(serie)[_this._dataOf(serie).length-1] }; })
                .attr("transform", function(d) {return "translate(" + x(_this._keyOf(d.value)) + "," + y(_this._valueOf(d.value)) + ")"; })
                .attr("x", 3)
                .attr("dy", ".35em")
                .text(function(d) { return d.name; });
        };

        return _this;
    }

    return AbstractSeriesChart;
});