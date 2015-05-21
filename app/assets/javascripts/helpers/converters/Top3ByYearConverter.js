define([], function() {

    function Top3ByYearConverter() {
        var _this = {};

        _this.convert = function (datasets, year, hospitalType) {
            // first filter by year
            var filtered = _.filter(datasets, function(dataset){
                return dataset.year === year;
            });

            // filter by hospital type
            filtered = _.filter(filtered, function(dataset){
                return dataset.hospital.text_de == hospitalType;
            });

            // group by age interval
            var result = _.groupBy(filtered, function(dataset){
                return dataset.interval.from;
            });

            // the total age interval is saved as from: 0, but 0-14 also from: 0
            var zeroAgeIntervalDatasets = result[0];

            var splitAgeIntervalDatasets = _.groupBy(zeroAgeIntervalDatasets, function(dataset){
                return dataset.interval.to;
            });

            result[0] = splitAgeIntervalDatasets[14];
            // get the age intervals as array of arrays
            result = _.values(result);
            // readd total age interval datasets
            result.push(splitAgeIntervalDatasets[undefined]);

            // group by sex
            result = _.map(result, function(ageIntervalDatasets){
                return _.groupBy(ageIntervalDatasets, function(singleDataset){
                    return singleDataset.sex;
                })
            });

            return result;
        };


        return _this;
    }
    return Top3ByYearConverter;
});