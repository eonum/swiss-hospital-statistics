define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg) {

    function AbstractSeriesChart (_width, _height) {
        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(100);
        _this.marginBottom(50);

        var x = d3.scale.linear()
            .range([0, _this._width()]);

        var y = d3.scale.linear()
            .range([_this._height(), 0]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

        var line = d3.svg.line()
            .interpolate('basis')
            .x(function(entry) { return x(_this._valueOf(entry)); })
            .y(function(entry) { return y(_this._keyOf(entry)); });

        var data = [
            {
                serie: 'austin',
                data: [
                    { key: 0, value: 0 },
                    { key: 1, value: 10 },
                    { key: 2, value: 20 },
                    { key: 3, value: 30 },
                    { key: 4, value: 40 }
                ]
            },
            {
                serie: 'new york',
                data: [
                    { key: 0, value: 0 },
                    { key: 1, value: 20 },
                    { key: 2, value: 40 },
                    { key: 3, value: 60 },
                    { key: 4, value: 80 }
                ]
            }
        ];

        _this._dataOf = function(serie) {return serie[_this._dataSymbol()]};
        _this._nameOf = function(serie) {return serie[_this._serieSymbol()]};
        _this._keyOf = function (entry) {return entry[_this._keySymbol()]};
        _this._valueOf = function (entry) {return entry[_this._valueSymbol()]};
        _this._dataSymbol = function () {return 'data'};
        _this._serieSymbol = function () {return 'serie'};
        _this._keySymbol = function() {return 'key'};
        _this._valueSymbol = function() {return 'value'};
        _this._yAxisName = function () {return 'axis'};

        _this._colorOf = function(serie) { return d3.scale.category10()(serie) };
        _this._labelOf = function(value) {return value.toString()};

        _this.initialize = function(data) {
            color.domain(data.map(function(serie){return _this._nameOf(serie)}));


            x.domain([
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

            y.domain([
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

            _this.svg().append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + _this._height() + ')')
                .call(xAxis);

            _this.svg().append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(_this._yAxisName());

            var city = _this.svg().selectAll(".city")
                .data(data)
                .enter().append("g")
                .attr("class", "city");

            city.append("path")
                .attr("class", "line")
                .attr("d", function(serie) { return line(_this._dataOf(serie));})
                .style("stroke", function(serie) { return color(serie.serie); });

            city.append("text")
                .datum(function(serie) { console.log(serie); return { name: serie.serie, value: serie.data[serie.data.length-1] }; /*return { name: d.name, value: d.values[d.values.length - 1]};*/ })
                .attr("transform", function(d) {console.log(d);  return "translate(" + x(d.value.value) + "," + y(d.value.key) + ")"; })
                .attr("x", 3)
                .attr("dy", ".35em")
                .text(function(d) { return d.name; });
        };

        _this.initialize(data);

        return _this;
    }

    return AbstractSeriesChart;
});