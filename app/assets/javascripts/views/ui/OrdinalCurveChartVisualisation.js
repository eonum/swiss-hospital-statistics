define([
    'View',
    'views/OrdinalCurveChart',
    'helpers/converters/NumberByAgeDatasetConverter',
    'helpers/converters/DatasetSorter'
], function(
    View,
    OrdinalCurveChart,
    NumberByAgeDatasetConverter,
    DatasetSorter
) {
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
                .settingsDo(function(settings){
                    settings.legendItems = function(entity) {
                        return _.map(entity.codes, function(each){
                            return each.code[0];
                        });
                    };
                    settings.legendLabel = function(item) {
                        return {
                            de: item.code + ': ' + item.text_de,
                            fr: item.code + ': ' + item.text_fr,
                            it: item.code + ': ' + item.text_it
                        }
                    }
                })
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
            var intervals = _.unique(_.pluck(_.flatten(data), 'interval')).sort();
            data = _.map(data, function(curve){
                return _.sortBy(_.union(curve,_.map(_.reject(intervals, function(interval) {
                    return _.contains(_.pluck(curve, 'interval'), interval) }), function(interval){
                        return {interval: interval, amount: 0}
                })), function(d){return d.interval});
            });

            chart.on({codes: codes, data: data});
        };

        _this.initialize();

        return _this;
    }

    return OrdinalCurveChartVisualisation;
});