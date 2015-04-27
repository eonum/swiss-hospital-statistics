define([
    'View', 'views/BoxPlot', 'helpers/converters/BoxPlotDataConverter'
], function (
    View, BoxPlot, BoxPlotDataConverter
) {

    function BoxPlotVisualisation(_width, _height) {
        var _this = new View('<div></div>');
        var content = new View('<div></div>');
        var boxPlot = new BoxPlot(_width, _height);

        _this.initialize = function () {
            this.append(content);
            content.append(boxPlot);
        };

        /**
         * Creates this visualisation from the data provided.
         * @param data the data to update this visualisation with
         */
        _this.visualiseData = function (title, datasets) {
            if (datasets.length > 0) {
                var intervals = [];

                var boxPlotDataConverter = new BoxPlotDataConverter(datasets);
                intervals = boxPlotDataConverter.convert();

                boxPlot.setData(intervals);
                boxPlot.setTitle(title);
                content.add(boxPlot);

            }
            return _this;
        };

        _this.initialize();

        return _this;
    }

    return BoxPlotVisualisation;
});