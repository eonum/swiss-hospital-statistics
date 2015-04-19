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

/*        // add is being overridden by content.add...
        _this.add = override(_this, _this.add, function(element){
            content.add(element);
            return _this;
        });

        _this.visualiseData = function(description, datasets) {
            _this.visualise(datasets);
        };

        _this.removeFromContent = function() {
            $(_this).remove();
        };
*/
        /**
         * Creates this visualisation from the data provided.
         * @param data the data to update this visualisation with
         */
        _this.visualiseData = function (title, datasets){


            if(datasets.length > 0) {

                var code = datasets[0].code;
                var description = datasets[0].description;
                var intervals = [];

                var boxPlotDataConverter = new BoxPlotDataConverter(datasets);
                intervals = boxPlotDataConverter.convert();

                boxPlot.setData(intervals);

                content.add('<h3 class="svg_title_boxplot">' + code + ": " + description + '</h3>');
                content.add(boxPlot);
            }

            return _this;
        };

        _this.initialize();

        return _this;
    }

    return BoxPlotVisualisation;
});