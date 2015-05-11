define([
    'views/BarChart',
    'views/ui/ChartVisualisation',
    'helpers/converters/NumberByAgeDatasetConverter'
], function (
    BarChart,
    ChartVisualisation,
    NumberByAgeDatasetConverter
){

    function BarChartVisualisation(){
        var _this = new ChartVisualisation();

        _this.newChart = function () {
            return new BarChart(_this.defaultWidth(), _this.defaultHeight());
        };

        _this.initializeChart = function(chart) {
            chart
                .chartName(function(){
                    return Multiglot.translations.charts.bar.name
                })
                .title(function(entity) { return {
                    de: entity.code.code + ': ' + entity.code.text_de,
                    fr: entity.code.code + ': ' + entity.code.text_fr,
                    it: entity.code.code + ': ' + entity.code.text_it
                }})
                .display(function(entity) { return entity.data })
                .label(function (value) { return value })
                .yAxisLabel(function(){
                    return Multiglot.translations.charts.bar.axises.y
                })
                .xAxisLabel(function(){
                    return Multiglot.translations.charts.bar.axises.x
                })
                .x('interval')
                .y('amount');
        };

        _this.update = function (code, datasets) {
            var converter = new NumberByAgeDatasetConverter(datasets);
            _this.chart().on({code: code, data: converter.asAbsoluteData()});
        };

        return _this;
    }

    return BarChartVisualisation;
});