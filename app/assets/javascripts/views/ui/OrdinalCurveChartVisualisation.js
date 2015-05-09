define(['View', 'views/OrdinalCurveChart', 'helpers/converters/NumberByAgeDatasetConverter', 'helpers/converters/DatasetSorter'],
function(View, OrdinalCurveChart, NumberByAgeDatasetConverter, DatasetSorter)
{
    function OrdinalCurveChartVisualisation(_width, _height){
        var _this = new View('<div></div>');
        var chart = new OrdinalCurveChart(_width, _height);

        _this.initialize = function(){
            _this.add(chart
                .title(function(entity) { return {
                    de: entity.codes[0].code[0].code + ': ' + entity.codes[0].code[0].text_de,
                    fr: entity.codes[0].code[0].code + ': ' + entity.codes[0].code[0].text_fr,
                    it: entity.codes[0].code[0].code + ': ' + entity.codes[0].code[0].text_it
                }})

                .display(function(entity) { return entity.data })
                .x('interval')
                .y('amount'));
        };

        /**
         * Updates this visualisation based upon the given description and datasets.
         * @param codes
         */
        _this.visualiseData = function (codes){
                var data = _.map(codes, function(code) {
                    var sorter = new DatasetSorter(code.datasets);
                    var sortedDatasets = sorter.sortByIntervalsAscending();
                    var converter = new NumberByAgeDatasetConverter(sortedDatasets);
                    return converter.asAbsoluteData();
                });
                data = _.map(data, function(curve){return _.sortBy(curve, function(d){return d.interval})});
                console.log(data);
                chart.on({codes: codes, data: data});
        };

        _this.initialize();

        return _this;
    }

    return OrdinalCurveChartVisualisation;
});