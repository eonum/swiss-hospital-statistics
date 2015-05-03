define(['views/BarChart', 'View', 'helpers/converters/NumberByAgeDatasetConverter'],
function (BarChart, View, NumberByAgeDatasetConverter){

    function BarChartVisualisation(_width, _height){
        var _this = new View('<div></div>');
        var barChart = new BarChart(_width, _height);

        _this.initialize = function (){
            _this.add(barChart
                .title(function(entity) { return entity.code.code + ': ' + entity.code.text_de })
                .display(function(entity) { return entity.data })
                .label(function (value) { return value + ' ' + (value > 1 ? 'Fälle' : 'Fall') })
                .x('interval')
                .y('amount'));
        };

        /**
         * Creates the visualisation by displaying the given dataset
         */
        _this.visualiseData = function (code, datasets){
            var converter = new NumberByAgeDatasetConverter(datasets);
            barChart.on({code: code, data: converter.asAbsoluteData()});
        };

        _this.initialize();

        return _this;
    }

    return BarChartVisualisation;
});