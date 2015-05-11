define([
    'views/ui/ChartVisualisation',
    'views/PieChart',
    'helpers/converters/NumberByAgeDatasetConverter'
], function (
    ChartVisualisation,
    PieChart,
    NumberByAgeDatasetConverter
) {

    function PieChartByAgeVisualisation() {
        var _this = new ChartVisualisation();
        var chartIdentifier = 0;

        _this.newChart = function () {
            return new PieChart(_this.defaultWidth(), _this.defaultHeight());
        };

        _this.initializeChart = function (chart) {
            chart.key('interval')
                .value('amount');
        };

        _this.update = function(code, datasets){
            var converter = new NumberByAgeDatasetConverter(datasets);
            var intervals = converter.asAbsoluteData();
            _this.chart().openOn(intervals, chartIdentifier);
            _this.chart().setTitle({
                de: code.code + ': ' + code.text_de,
                fr: code.code + ': ' + code.text_fr,
                it: code.code + ': ' + code.text_it
            });
            _this.chart().setChartName(Multiglot.translations.charts.pie.name);
        };

        return _this;
    }

    return PieChartByAgeVisualisation;
});