define([
    'View', 'views/PieChart', 'helpers/converters/NumberByAgeDatasetConverter'
], function (
    View, PieChart, NumberByAgeDatasetConverter
) {

    function PieChartByAgeVisualisation(_width, _height) {
        var _this = new View('<div></div>');
        var content = new View('<div></div>');
        var pieChart = new PieChart(_width, _height);

        _this.initialize = function () {
            _this.append(content);
            content.append(pieChart);

            pieChart.key('interval')
                .value('amount');
        };

        _this.add = override(_this, _this.add, function(element){
            content.add(element);
            return _this;
        });

        _this.visualiseData = function(code, datasets){
            var converter = new NumberByAgeDatasetConverter(datasets);
            var intervals = converter.asAbsoluteData();
            pieChart.openOn(intervals);
            pieChart.setTitle({
                de: code.code + ': ' + code.text_de,
                fr: code.code + ': ' + code.text_fr,
                it: code.code + ': ' + code.text_it
            });
            pieChart.setChartName(Multiglot.translations.charts.pie.name);

        };

        _this.initialize();

        return _this;
    }

    return PieChartByAgeVisualisation;
});