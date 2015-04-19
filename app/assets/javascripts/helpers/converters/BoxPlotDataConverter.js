define([], function() {


    function BoxPlotDataConverter(datasets) {
        var _this = {};


        _this.initialize = function (){

        };



        _this.convert = function() {
            var intervals = [];
            
            var sum = 0;
            for (var i = 0; i < datasets.length; i++) {
                sum += datasets[i].categorised_data.categories.interval[0].n;
            }

            for (var i = 0; i < datasets.length; i++) {
                var interval = datasets[i].categorised_data.categories.interval[0];
                var min = interval.min;
                var max = interval.max;
                var specificN = interval.n;
                var lowerWhisker = interval.categories.percentile[1].amount;
                var lowerQuartil = interval.categories.percentile[2].amount;
                var avg = interval.categories.percentile[3].amount;
                var higherQuartil = interval.categories.percentile[4].amount;
                var higherWhisker = interval.categories.percentile[5].amount;

                var from = interval.interval.from;

                var to = interval.interval.to;

                var textInterval;
                if (_.isUndefined(to)) {
                    textInterval = from + "+";
                } else {
                    textInterval = from + " - " + to;
                }

                intervals.push({
                        ageInterval: textInterval,
                        percentOfTotal: (100 * (interval.n) / sum),
                        specificN: specificN,
                        min: min,
                        lowerWhisker: lowerWhisker,
                        lowerQ: lowerQuartil,
                        avg: avg,
                        higherQ: higherQuartil,
                        higherWhisker: higherWhisker,
                        max: max,
                        sum: sum
                    }
                );
                console.log("THIIIISSS");
                console.log(intervals);
            }
            return intervals
        }

        _this.initialize();

        return _this;
    }

    return BoxPlotDataConverter;

});