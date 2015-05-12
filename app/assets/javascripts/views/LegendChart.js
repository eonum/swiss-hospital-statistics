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

        data = [{"chapter": "I", "text": "Bestimmte infektiöse und parasitäre Krankheiten"},
            {"chapter": "II", "text": "Neubildungen"},
            {"chapter": "III", "text": "Krankheiten des Blutes und der blutbildenden Organe sowie bestimmte Störungen"},
            {"chapter": "", "text": "mit Beteiligung des Immunsystems"},
            {"chapter": "IV", "text": "Endokrine, Ernährungs- und Stoffwechselkrankheiten"},
            {"chapter": "V", "text": "Psychische und Verhaltensstörungen"},
            {"chapter": "VI", "text": "Krankheiten des Nervensystems"},
            {"chapter": "VII", "text": "Krankheiten des Auges und der Augenanhangsgebilde"},
            {"chapter": "VIII", "text": "Krankheiten des Ohres und des Warzenfortsatzes"},
            {"chapter": "IX", "text": "Krankheiten des Kreislaufsystems"},
            {"chapter": "X", "text": "Krankheiten des Atmungssystems"},
            {"chapter": "XI", "text": "Krankheiten des Verdauungssystems"},
            {"chapter": "XII", "text": "Krankheiten der Haut und der Unterhaut"},
            {"chapter": "XIII", "text": "Krankheiten des Muskel-Skelett-Systems und des Bindegewebes"},
            {"chapter": "XIV", "text": "Krankheiten des Urogenitalsystems"},
            {"chapter": "XV", "text": "Schwangerschaft, Geburt und Wochenbett"},
            {"chapter": "XVI", "text": "Bestimmte Zustände, die ihren Ursprung in der Perinatalperiode haben"},
            {"chapter": "XVII", "text": "Angeborene Fehlbildungen, Deformitäten und Chromosomenanomalien"},
            {"chapter": "XVIII", "text": "Symptome und abnorme klinische und Laborbefunde, die anderenorts"},
            {"chapter": "", "text": "nicht klassifiziert sind"},
            {"chapter": "XIX: ", "text": "Verletzungen, Vergiftungen und bestimmte andere Folgen äußerer Ursachen"},
            {"chapter" : "XX: ", "text": "Äußere Ursachen von Morbidität und Mortalität"},
            {"chapter" : "XXI:", "text": "Faktoren, die den Gesundheitszustand beeinflussen und zur Inanspruchnahme"},
            {"chapter" : "", "text" : "des Gesundheitswesens führen"}
        ];


        // TODO: Do not use magic numbers....

        _this.initialize = function() {
            // should be enough to give space to 21 chapters
            var titleFontSize = _height / 35;
            // append title
            var groups = _this.svg().selectAll("g")
                .data(data)
                .enter()
                .append("g");

            groups.append("text")
                .style("font-size", titleFontSize + "px")
                .attr("x", 0)
                .attr("y", function(d, i) { return 25*i})
                .text(function(d) { return d.chapter});

            groups.append("text")
                .style("font-size", titleFontSize + "px")
                .attr("x", 60)
                .attr("y", function(d, i) { return 25*i})
                .text(function(d) { return d.text});
        };

        console.log(data);

        _this.initialize();

        return _this;
    }

    return LegendChart;

});