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