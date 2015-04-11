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

        var chart = d3.box()
            .whiskers(iqr(1.5))
            .width(width)
            .height(height);

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

            setInterval(function() {
                svg.datum(randomize).call(chart.duration(1000));
            }, 2000);
        }

        _this._keyOf = function (d) {return d.data[_this._keySymbol()]};
        _this._valueOf = function (data) {return data.data[_this._valueSymbol()]};
        _this._colorOf = function(value) { return d3.scale.category20()(value) };
        _this._labelOf = function(value) {return value.toString()};
        _this._keySymbol = function() {return 'key'};
        _this._valueSymbol = function() {return 'value'};

        var arc = d3.svg.arc().innerRadius(radius - 100).outerRadius(radius - 20);
        _this.initialize = function(data) {

            var pie = d3.layout
                .pie()
                .value(function(d) { return d[_this._valueSymbol()]; })
                .sort(null);

            var data0 = path.data();
            var data1 = pie(data);

            path = path.data(data1, _this._keyOf);

            path.enter().append("path")
                .each(function(d, i) { this._current = utils.findNeighborArc(i, data0, data1, _this._keyOf) || d; })
                .attr("fill", function(d) { return _this._colorOf(_this._valueOf(d), d); })
                .append("title")
                .text(_this._keyOf);

            path.exit()
                .datum(function(d, i) { return utils.findNeighborArc(i, data1, data0, _this._keyOf) || d; })
                .transition()
                .duration(750)
                .attrTween("d", utils.arcTween)
                .remove();

            path.transition()
                .duration(750)
                .attrTween("d", utils.arcTween);

            path.enter().append("text")
                .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                .attr("dy", ".35em")
                .style("text-anchor", "middle")
                .text(function(d) { return _this._labelOf(_this._valueOf(d), d); });
        };
        return _this;
    }

    return AbstractPieChart;

});