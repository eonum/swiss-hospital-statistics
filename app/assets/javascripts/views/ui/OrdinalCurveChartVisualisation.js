define(['View', 'views/OrdinalCurveChart', 'helpers/converters/NumberByAgeDatasetConverter', 'helpers/converters/DatasetSorter'],
function(View, OrdinalCurveChart, NumberByAgeDatasetConverter, DatasetSorter)
{
    function OrdinalCurveChartVisualisation(_width, _height){
        //var _this = this;
        var _this = new View('<div></div>');
        var content = new View('<div></div>');
        var chart = new OrdinalCurveChart(_width, _height);

        _this.initialize = function(){
            _this.append(content);
            content.append(chart);
        };

        /**
         * Does something and means something ;-)
         */
        _this.add = override(_this, _this.add, function(element){
            content.add(element);
            return _this;
        });

        _this.visualiseCode = function (type, code){

            /* jQuery getJSON(url, callback) fetches data from /api/v1/... and returns JSONs to given callback function */
            $.getJSON('/api/v1/codes/' + type + '/info/'+ code,

               /* extract data sets from JSON result, convert ??? and fill data into chart */
                function (result){
                var codeType = _this.getFirstProperty(result.codes);
                var datasets = codeType.codes; //Array of data sets

                var sorter = new DatasetSorter(datasets);
                var sortedDatasets = sorter.sortByIntervalsAscending();

                var converter = new NumberByAgeDatasetConverter(sortedDatasets);


                chart.setData(converter.asAbsoluteData())
                    .setTitle(datasets[0].description);
            });
        };

        /**
         * Fetches first property from JSON object, which is the type of code (e.g. ICD, CHOP etc.)
         * @param object JSON result from API call
         * @returns code type object, the object containing the actual datasets
         */
        _this.getFirstProperty = function (object){
            for (var prop in object) {
                return object[prop];
            }
        };

        _this.initialize();

        return _this;
    }

    return OrdinalCurveChartVisualisation;
});