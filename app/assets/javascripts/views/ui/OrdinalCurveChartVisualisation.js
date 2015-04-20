define(['View', 'views/OrdinalCurveChart', 'helpers/converters/NumberByAgeDatasetConverter', 'helpers/converters/DatasetSorter'],
function(View, OrdinalCurveChart, NumberByAgeDatasetConverter, DatasetSorter)
{
    function OrdinalCurveChartVisualisation(_width, _height){
        var _this = new View('<div></div>');
        var chart = new OrdinalCurveChart(_width, _height);

        _this.initialize = function(){
            _this.add(chart);
        };

        /**
         * Updates this visualisation based upon the given description and datasets.
         * @param description the description of the code
         * @param datasets the datasets to use
         */
        _this.visualiseData = function (description, datasets){
                var sorter = new DatasetSorter(datasets);
                var sortedDatasets = sorter.sortByIntervalsAscending();

                var converter = new NumberByAgeDatasetConverter(sortedDatasets);
                chart.setData(converter.asAbsoluteData()).setTitle(description);
        };

        _this.initialize();

        return _this;
    }

    return OrdinalCurveChartVisualisation;
});