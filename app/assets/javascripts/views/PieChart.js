define(['d3'], function (d3) {

    function PieChart(){
        var width = 960, height = 500;
        var radius = Math.min(width, height) / 2;
        var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'));
        var _this = $(svg[0]);
        svg = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        var path = svg.selectAll("path");

        var zh = [
            {key: 'cesarean', value: 35.49},
            {key: 'notcesarean', value: 100 - 35.49}
        ];

        var be = [
            {key: 'cesarean', value: 25.49},
            {key: 'notcesarean', value: 100 - 25.49}
        ];

        var color = d3.scale.category20();

        var pie = d3.layout.pie()
            .value(function(d) { return d.value; })
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 20);

        _this.initialize = function(region) {
            var data0 = path.data();
            var data1 = pie(region);

            path = path.data(data1, _this.key);

            path.enter().append("path")
                .each(function(d, i) { this._current = _this.findNeighborArc(i, data0, data1, _this.key) || d; })
                .attr("fill", function(d) { return color(d.data.key); })
                .append("title")
                .text(function(d) { return d.data.key; });

            path.exit()
                .datum(function(d, i) { return _this.findNeighborArc(i, data1, data0, _this.key) || d; })
                .transition()
                .duration(750)
                .attrTween("d", _this.arcTween)
                .remove();

            path.transition()
                .duration(750)
                .attrTween("d", _this.arcTween);
        };

        _this.key = function(d) {
            return d.data.key;
        };

        _this.findNeighborArc = function(i, data0, data1, key) {
            var d;
            return (d = _this.findPreceding(i, data0, data1, key)) ? {startAngle: d.endAngle, endAngle: d.endAngle}
                : (d = _this.findFollowing(i, data0, data1, key)) ? {startAngle: d.startAngle, endAngle: d.startAngle}
                : null;
        };


        _this.findPreceding = function(i, data0, data1, key) {
            var m = data0.length;
            while (--i >= 0) {
                var k = key(data1[i]);
                for (var j = 0; j < m; ++j) {
                    if (key(data0[j]) === k) return data0[j];
                }
            }
        };

        _this.findFollowing = function(i, data0, data1, key) {
            var n = data1.length, m = data0.length;
            while (++i < n) {
                var k = key(data1[i]);
                for (var j = 0; j < m; ++j) {
                    if (key(data0[j]) === k) return data0[j];
                }
            }
        };

        _this.arcTween = function(d) {
            var i = d3.interpolate(this._current, d);
            this._current = i(0);
            return function(t) { return arc(i(t)); };
        };

        _this.initialize(zh);
        setTimeout(function(){ _this.initialize(be); }, 3000);


        return _this;
    }

    return PieChart;

});