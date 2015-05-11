define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class PieChart
     */
    function LegendChart(_width, _height) {
        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(10);
        _this.marginLeft(10);
        _this.marginRight(10);
        _this.marginBottom(10);

        var data = [{"text": "I: Bestimmte infektiöse und parasitäre Krankheiten"},
            {"text": "II: Neubildungen"},
            {"text": "III: Krankheiten des Blutes und der blutbildenden Organe sowie bestimmte Störungen mit Beteiligung des Immunsystems"}];

        // TODO: Do not use magic numbers....

        this.initialize = function() {
            // should be enough to give space to 21 chapters
            var titleFontSize = _height / 25;
            // append title
            _this.svg().selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .style("font-size", titleFontSize + "px")
                .attr("x", 10)
                .attr("y", function(d, i) { return 20*i})
                .text(function(d) { return d.text});
        };

        console.log(data);

        _this.initialize();

        return _this;
    }

    return LegendChart;

});