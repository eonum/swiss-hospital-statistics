define([], function(){

    /**
     * Creates a new converter that will convert several ICD, DRG or CHOP datasets
     * to data that can be visualized by extracting the information about the number
     * of cases per diagnosis from the datasets.
     * @param datasets the datasets to be converted, the datasets that are returned by an API call
     * @constructor
     */
    function NumberByAgeDatasetConverter(datasets){
        var _this = {};
        var textIntervals = [];
        var totalNumber = 0;

        /**
         * Counts total number of cases and parses intervals to interval name tags (text)
         */
        _this.initialize = function (){
            //get total number of cases
            totalNumber = _this.getTotalCases();

            //get used age intervals
            textIntervals = _this.pushTextIntervals();
        };

        /* go through each data set (i.e. interval), read "from" and "to" and store it as formatted text,
         e.g. "15 - 36" or "70+"
         Does NOT sort the intervals*/
        _this.pushTextIntervals = function() {
            return _.map(datasets, function(dataset){
                var interval = _.first(dataset.categorised_data.categories.interval).interval;
                return interval.from + (_.has(interval,'to') ? ' - ' + interval.to : '+');
            });
        };

        //returns the total number of cases for a specific code
        _this.getTotalCases = function() {
            return _.reduce(datasets, function(cases, data){ return cases + data.categorised_data.categories.interval[0].n; }, 0);
        };

        /**
         * Converts the datasets using absolute values.
         * @returns array of data set objects {interval: val, amount: val}, sorted by the interval
         */
        _this.asAbsoluteData = function(){
            return _this.asData(_.identity);
        };

        /**
         * Converts the datasets using percent values.
         * @returns array of data set objects {interval: val, amount: val}, sorted by the interval
         */
        _this.asPercentData = function () {
            return _this.asData(function (n) {
                return 100 * n / totalNumber;
            });
        };

        _this.asData = function (amountCalculator){
            var data = _.map(datasets, function(dataset, index){
                var interval = dataset.categorised_data.categories.interval[0];
                return { interval: textIntervals[index], amount: amountCalculator(interval.n) };
            });
            // sort by interval
            return _.sortBy(data, 'interval');
        };

        _this.initialize();

        return _this;
    }

    return NumberByAgeDatasetConverter;

});