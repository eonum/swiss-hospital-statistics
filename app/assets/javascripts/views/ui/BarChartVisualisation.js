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
         * Creates the visualisation by fetching the specified code and displaying it.
         * @param type the code type, e.g. "icd", "chop", "drg", ...
         * @param code the code to display, e.g. "A045" for an ICD code
         */
        _this.visualiseCode = function (type, code){
            $.getJSON('/api/v1/codes/' + type + '/info/'+ code,function (result){
                var codeType = _this.getFirstProperty(result.codes);
                var datasets = codeType.codes;
                var converter = new NumberByAgeDatasetConverter(datasets);

               barChart.setData(converter.asAbsoluteData())
                    .setTitle(datasets[0].description);
            });
        };

        _this.getFirstProperty = function (object){
                for (var prop in object) {
                    return object[prop];
                }
        };

        _this.initialize();

        return _this;
    }

    return BarChartVisualisation;
});