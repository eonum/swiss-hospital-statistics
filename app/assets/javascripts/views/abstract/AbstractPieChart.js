define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class PieChart
     */
    function AbstractPieChart(_width, _height){
        var _this = new ResponsiveSvg(_width, _height);

         _this.marginTop(20);
         _this.marginLeft(0);
         _this.marginRight(140);
         _this.marginBottom(40);

        var radius = Math.min(_this._width(), _this._height()) / 2;
        var path = _this.svg()
            .append("g")
            .attr("transform", "translate(" + _this._width() / 2 + "," + _this._height() / 2 + ")")
            .selectAll("g");

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
        _this._colorOf = function(value) {return colorScale(value)};
        _this._labelOf = function(value) {return value.toString()};
        _this._keySymbol = function() {return 'key'};
        _this._valueSymbol = function() {return 'value'};

        var arc = d3.svg.arc().innerRadius(radius - 100).outerRadius(radius - 20);
        var colorScale = d3.scale.category20();

        var chartNameView;
        var titleView;

        _this.initialize = function() {
            var chartNameFontSize = _this._height() / 100 * 5.5;
            var titleFontSize = _this._height() / 100 * 4.5;

            chartNameView = _this.svg()
                .append('text')
                .style('font-size', chartNameFontSize + 'px');

            titleView = _this.svg()
                .append('text')
                .attr('transform', 'translate(0,'+(chartNameFontSize*1.2)+')')
                .style("font-size", titleFontSize + 'px');
        };

        _this.setData = function(data, chartIdentifier){
            console.log("chartIdentifier" + chartIdentifier);
            var pie = d3.layout
                .pie()
                .value(function(d) { return d[_this._valueSymbol()]; })
                .sort(null);

            var data0 = path.data();
            var data1 = pie(data);

            colorScale = d3.scale.category20().domain( _.map(data1, _this._keyOf));
            path = path.data(data1, _this._keyOf);

            var enterGroups = path.enter().append("g");

            // enter arcs
            enterGroups.append("path")
                .each(function(d, i) {this._current = utils.findNeighborArc(i, data0, data1, _this._keyOf) || d;})
                .append("title")
                .text(_this._keyOf);

            // enter arc descriptions
            enterGroups.append("text")
                .attr("dy", ".35em")
                .style("text-anchor", "middle");

            // enter key
            var group = enterGroups.append("g");
            var keyHeight = _height / 15;
            var keyWidth = _width / 5;
            // TODO magic offset
            var magicOffset = -200;
            if(chartIdentifier == 0){
                magicOffset = -100
            }
            if(chartIdentifier == 1) {
                magicOffset = -200;
            }
            var xPosition = function(d, i) { return 1/3 * _width};
            var yPosition = function(d, i) {return  magicOffset + i * (keyHeight + 10)};
            group.append("rect")
                .attr("width", keyWidth)
                .attr("height" ,keyHeight)
                // initial position (no animation from the center)
                .attr("transform", function (d, i){ return "translate(" + xPosition(d, i)+ "," + magicOffset+ ")"});

            group.append("text")
                .attr("dy", ".35em")
                // initial position (no animation from the center)
                .attr("transform", function (d, i){ return "translate(" + (xPosition(d, i)+ keyWidth / 10)+ "," + magicOffset+ ")"});

            // exit arcs
            path.exit().select("path")
                .datum(function(d, i) {return utils.findNeighborArc(i, data1, data0, _this._keyOf) || d;})
                .transition()
                .duration(750)
                .attrTween("d", utils.arcTween)
                .remove();

            // exit arc descriptions
            path.exit().select("text")
                .remove();

            // exit key
            path.exit().select("g")
                .remove();

            // update arc descriptors
            path.select("text")
                .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                .text(function(d) { return _this._labelOf(_this._valueOf(d), d); });

            // update arc
            path.select("path")
                .attr("fill", function(d) { return _this._colorOf(_this._keyOf(d), d); })
                .transition()
                .duration(750)
                .attrTween("d", utils.arcTween);

            // update key
            group = path.select("g");
            group.select("rect")
                .attr("fill", function(d) { return _this._colorOf(_this._keyOf(d), d); })
                .transition()
                .duration(750)
                .attr("transform", function (d, i) { return "translate("+ xPosition(d, i) + ","+ yPosition(d, i)+ ")"});
            group.select("text")
                .transition()
                .duration(750)
                .attr("transform", function (d, i) { return "translate(" + (xPosition(d, i)+ keyWidth / 10)  + "," + (yPosition(d, i) + keyHeight /2)+")"})
                .text(function(d){return _this._keyOf(d) + ", n = " + _this._valueOf(d)});
        };

        _this.setTitle = function(translations){
            new Multiglot()
                .d3()
                .on(titleView)
                .custom(translations)
                .set(function(html, text) {html.text(text)})
                .apply();
        };

        _this.setChartName = function(translations){
            new Multiglot()
                .d3()
                .on(chartNameView)
                .custom(translations)
                .set(function(html, text) {html.text(text)})
                .apply();
        };

        _this.update = function () {};

        _this.initialize();

        return _this;
    }

    return AbstractPieChart;

});