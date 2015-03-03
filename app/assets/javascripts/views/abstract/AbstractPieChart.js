define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class PieChart
     */
    function AbstractPieChart(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);
        var radius = Math.min(_this._width(), _this._height()) / 2;
        var path = _this.svg()
            .append("g")
            .attr("transform", "translate(" + _this._width() / 2 + "," + _this._height() / 2 + ")")
            .selectAll("path");

        var utils = {
            findNeighborArc : function(i, data0, data1, key) {
                var d;
                return (d = utils.findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
                    : (d = utils.findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
                    : null; },
            findPreceding : function(i, data0, data1, key) {
                var m = data0.length;
                while (--i >= 0) {
                    var k = key(data1[i]);
                    for (var j = 0; j < m; ++j) {
                        if (key(data0[j]) === k) return data0[j]; } } },
            findFollowing : function(i, data0, data1, key) {
                var n = data1.length, m = data0.length;
                while (++i < n) {
                    var k = key(data1[i]);
                    for (var j = 0; j < m; ++j) {
                        if (key(data0[j]) === k) return data0[j]; } } },
            arcTween : function(d) {
                var i = d3.interpolate(this._current, d);
                this._current = i(0);
                return function(t) { return arc(i(t)); }; }
        };

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