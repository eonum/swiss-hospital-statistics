define(['views/BarChart', 'View', 'helpers/converters/NumberByAgeDatasetConverter'],
function (BarChart, View, NumberByAgeDatasetConverter){

    function BarChartVisualisation(_width, _height){
        var _this = new View('<div></div>');
        var content = new View('<div></div>');
        var barChart = new BarChart(_width, _height);

        _this.initialize = function (){
            _this.append(content);
            content.append(barChart);
        };

        _this.add = override(_this, _this.add, function(element){
            content.add(element);
            return _this;
        });

        /**
         * Creates the visualisation by displaying the given dataset
         * @param dataset
         */
        _this.visualiseData = function (description, datasets){
            var converter = new NumberByAgeDatasetConverter(datasets);

            barChart.setData(converter.asAbsoluteData()).setTitle(description);
        };

        _this.getFirstProperty = function (object){
            return _.first(_.values(object));
        };

        _this.initialize();

        return _this;
    }

    return BarChartVisualisation;
});