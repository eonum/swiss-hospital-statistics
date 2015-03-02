define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class PieChart
     */
    function PieChart(){
        var _this = new ResponsiveSvg(960, 500);
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
                return function(t) { return arc(i(t)); }; },
            keyOf : function (d) {
                return d.data[scripting.keySymbol]; },
            valueOf : function (d) {
                return scripting.transformedLogic(d.data[scripting.valueSymbol]); }
        };

        var scripting = {
            colorLogic: d3.scale.category20(),
            /**
             * Returns an array of objects that should be visualised
             * in the Pie Chart as one segment
             * @param {Object} entity
             * @returns {Array.<Object>}
             */
            displayLogic: function (entity) { return entity; },
            transformedLogic: function(value) { return value },
            keySymbol: 'key',
            valueSymbol: 'value'
        };

        var pie = d3.layout.pie()
            .value(function(d) { return d[scripting.valueSymbol]; })
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 20);

        _this._initialize = function(data) {
            var data0 = path.data();
            var data1 = pie(data);

            path = path.data(data1, utils.keyOf);

            path.enter().append("path")
                .each(function(d, i) { this._current = utils.findNeighborArc(i, data0, data1, utils.keyOf) || d; })
                .attr("fill", function(d) { return scripting.colorLogic(utils.valueOf(d)); })
                .append("title")
                .text(utils.keyOf);

            path.exit()
                .datum(function(d, i) { return utils.findNeighborArc(i, data1, data0, utils.keyOf) || d; })
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
                .text(function(d) { return utils.valueOf(d); });
        };

        /* ------------ S C R I P T I N G   A P I ------------ */
        _this.openOn = function (entity) {
            _this._initialize(scripting.displayLogic(entity));
            return _this;
        };

        _this.display = function (displayLogic) {
            scripting.displayLogic = displayLogic;
            return _this;
        };

        _this.key = function (keySymbol) {
            scripting.keySymbol = keySymbol;
            return _this;
        };

        _this.value = function (valueSymbol) {
            scripting.valueSymbol = valueSymbol;
            return _this;
        };

        _this.colored = function (_function) {
            scripting.colorLogic = _function;
            return _this;
        };

        _this.transformed = function (_function) {
            scripting.transformedLogic = _function;
            return _this;
        };

        return _this;
    }

    return PieChart;

});