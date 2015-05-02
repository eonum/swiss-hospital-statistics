define([], function() {


    function BoxPlotDataConverter(datasets) {
        var _this = {};

        //returns the total number of cases for a specific code
        _this.getTotalCases = function() {
            return _.reduce(datasets, function(cases, data){ return cases + data.categorised_data.categories.interval[0].n; }, 0);
        };

        _this.convert = function() {
            var sum = _this.getTotalCases();
            return _.map(datasets, function(data){
                var interval = data.categorised_data.categories.interval[0];
                var min = interval.min;
                var max = interval.max;
                var specificN = interval.n;
                var lowerWhisker = interval.categories.percentile[1].amount;
                var lowerQuartile = interval.categories.percentile[2].amount;
                var avg = interval.categories.percentile[3].amount;
                var higherQuartile = interval.categories.percentile[4].amount;
                var higherWhisker = interval.categories.percentile[5].amount;
                var from = interval.interval.from;
                var to = interval.interval.to;
                var textInterval = from + (_.isUndefined(to) ? '+' : ' - ' + to );

                return {
                    ageInterval: textInterval,
                    percentOfTotal: (100 * (interval.n) / sum),
                    specificN: specificN,
                    min: min,
                    lowerWhisker: lowerWhisker,
                    lowerQ: lowerQuartile,
                    avg: avg,
                    higherQ: higherQuartile,
                    higherWhisker: higherWhisker,
                    max: max,
                    sum: sum
                };
            });
        };

        return _this;
    }

    return BoxPlotDataConverter;

});