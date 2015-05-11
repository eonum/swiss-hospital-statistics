define(['d3', 'views/ResponsiveSvg'], function (d3, ResponsiveSvg) {

    /**
     * @returns {*|jQuery|HTMLElement}
     * @constructor
     * @class PieChart
     */
    function LegendChart(_width, _height) {
        var _this = new ResponsiveSvg(_width, _height);

        _this.marginTop(20);
        _this.marginLeft(10);
        _this.marginRight(10);
        _this.marginBottom(10);

        var data = [{"text": "I: Bestimmte infektiöse und parasitäre Krankheiten"},
            {"text": "II: Neubildungen"},
            {"text": "III: Krankheiten des Blutes und der blutbildenden Organe sowie bestimmte Störungen"},
            {"text": "- - - mit Beteiligung des Immunsystems"},
            {"text": "IV: Endokrine, Ernährungs- und Stoffwechselkrankheiten"},
            {"text": "V: Psychische und Verhaltensstörungen"},
            {"text": "VI: Krankheiten des Nervensystems"},
            {"text": "VII: Krankheiten des Auges und der Augenanhangsgebilde"},
            {"text": "VIII: Krankheiten des Ohres und des Warzenfortsatzes"},
            {"text": "IX: Krankheiten des Kreislaufsystems"},
            {"text": "X: Krankheiten des Atmungssystems"},
            {"text": "XI: Krankheiten des Verdauungssystems"},
            {"text": "XII; Krankheiten der Haut und der Unterhaut"},
            {"text": "XIII: Krankheiten des Muskel-Skelett-Systems und des Bindegewebes"},
            {"text": "XIV: Krankheiten des Urogenitalsystems"},
            {"text": "XV: Schwangerschaft, Geburt und Wochenbett"},
            {"text": "XVI: Bestimmte Zustände, die ihren Ursprung in der Perinatalperiode haben"},
            {"text": " XVII: Angeborene Fehlbildungen, Deformitäten und Chromosomenanomalien"},
            {"text": "XVIII: Symptome und abnorme klinische und Laborbefunde, die anderenorts"},
            {"text": "- - - nicht klassifiziert sind"},
            {"text": "XIX: Verletzungen, Vergiftungen und bestimmte andere Folgen äußerer Ursachen"},
            {"text": "XX: Äußere Ursachen von Morbidität und Mortalität"},
            {"text": "XXI: Faktoren, die den Gesundheitszustand beeinflussen und zur Inanspruchnahme"},
            {"text": "- - - des Gesundheitswesens führen"}

        ];

        // TODO: Do not use magic numbers....

        _this.initialize = function() {
            // should be enough to give space to 21 chapters
            var titleFontSize = _height / 35;
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