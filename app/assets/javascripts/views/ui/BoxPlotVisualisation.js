define([
    'View',
    'views/BoxPlot',
    'helpers/converters/BoxPlotDataConverter'
], function (
    View,
    BoxPlot,
    BoxPlotDataConverter
) {

    function BoxPlotVisualisation(_width, _height) {
        var _this = new View('<div></div>');
        var boxPlot = new BoxPlot(_width, _height);

        _this.initialize = function () {
            _this.append(boxPlot
                .title(function(entity) { return {
                    de: entity.code.code + ': ' + entity.code.text_de,
                    fr: entity.code.code + ': ' + entity.code.text_fr,
                    it: entity.code.code + ': ' + entity.code.text_it
                }})
                .legend(function(entity) {
                    var data = entity.data[0];
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
                .y('avg'));
        };

        /**
         * Creates this visualisation from the data provided.
         * @param code the data to update this visualisation with
         * @param datasets
         */
        _this.visualiseData = function (code, datasets) {
            if (datasets.length > 0) {
                var converter = new BoxPlotDataConverter(datasets);
                boxPlot.on({code: code, data: _.sortBy(converter.convert(),'ageInterval')});
            }
            else boxPlot.on({code: code, data: []});

            return _this;
        };

        _this.update = function () {
            if (_.isUndefined(boxPlot.rawEntity())) return;
            var duration = boxPlot.transitionDuration();
            boxPlot.transitionDuration(0);
            boxPlot.on(boxPlot.rawEntity());
            boxPlot.transitionDuration(duration);
        };

        _this.initialize();

        return _this;
    }

    return BoxPlotVisualisation;
});