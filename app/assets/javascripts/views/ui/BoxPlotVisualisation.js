define([
    'views/BoxPlot',
    'views/ui/ChartVisualisation',
    'helpers/converters/BoxPlotDataConverter'
], function (
    BoxPlot,
    ChartVisualisation,
    BoxPlotDataConverter
) {

    function BoxPlotVisualisation() {
        var _this = new ChartVisualisation();

        _this.newChart = function () {
            return new BoxPlot(_this.defaultWidth(), _this.defaultHeight());
        };

        _this.initializeChart = function (chart) {
            chart
                .chartName(function(){
                    return Multiglot.translations.charts.box.name
                })
                .title(function(entity) { return {
                    de: entity.code.code + ': ' + entity.code.text_de,
                    fr: entity.code.code + ': ' + entity.code.text_fr,
                    it: entity.code.code + ': ' + entity.code.text_it
                }})
                .yAxisLabel(function(){
                    return Multiglot.translations.charts.box.axises.y
                })
                .xAxisLabel(function(){
                    return Multiglot.translations.charts.box.axises.x
                })
                .legend(function(entity) {
                    var data = entity.data[0];
                    console.log("entity");
                    console.log(entity);
                    return [
                        {
                            value: data.higherWhisker,
                            text: Multiglot.translations.box_plot.higher_whiskers
                        },
                        {
                            value: data.higherQ,
                            text: Multiglot.translations.box_plot.higher_quartile
                        },
                        {
                            value: data.avg,
                            text: Multiglot.translations.box_plot.average
                        },
                        {
                            value: data.lowerQ,
                            text: Multiglot.translations.box_plot.lower_quartile
                        },
                        {
                            value: data.lowerWhisker,
                            text: Multiglot.translations.box_plot.lower_whiskers
                        }
                    ]
                })
                .legendLabel(function(item){
                    return _.mapObject(item.text, function(text){
                        return text;
                    })
                })
                .legendColor(function(){
                    return d3.rgb(239, 239, 239);
                })
                .legendTextColor('black')
                .display(function(entity) { return entity.data })
                .x('ageInterval')
                .y('avg');
        };

        /**
         * Creates this visualisation from the data provided.
         * @param code the data to update this visualisation with
         * @param datasets
         */
        _this.update = function (code, datasets) {
            if (datasets.length > 0) {
                var converter = new BoxPlotDataConverter(datasets);
                _this.chart().on({code: code, data: _.sortBy(converter.convert(),'ageInterval')});
            }
            else _this.chart().on({code: code, data: []});

            return _this;
        };

        return _this;
    }

    return BoxPlotVisualisation;
});