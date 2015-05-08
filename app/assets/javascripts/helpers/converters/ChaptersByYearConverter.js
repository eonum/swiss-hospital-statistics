define([], function() {

    function ChaptersByYearConverter() {
        var _this = {};

        var WOMAN = {name: 'woman', index: 0};
        var MAN = {name: 'man', index: 1};
        var TOTAL = {name: 'total', index: 2};

        _this.initialize = function () {

        };

        // This function will iterate per year through all age intervals and sum it up
        // first for loop iterates through the years while the second iterates through
        // the age intervals.
        _this.convert = function (selection, resultCallback) {
            var cache = [];
            $.when.apply($, _.map(selection.years, function (year) {
                return $.get('/api/v1/chaptersbyyear/' + year, function (result) {
                    cache.push(result);
                });
            })).then(function () {
                resultCallback(_this.convertData(selection, _.flatten(cache)));
            });

        };

        /**
         * @param selection
         * @param {Array} chaptersArray
         */

        _this.convertData = function(selection, chaptersArray) {
            function d(chapter) { return chapter.categorised_data.categories.icd_chapter_sex_interval[0] }
            function sex(data) { return data.sex }
            function chapter(data) { return data.code }
            function percentage(data) { return data.percentage }
            function interval(data) { return data.interval.from + (_.isUndefined(data.interval.to) ? '+' : '-'+data.interval.to) }
            function isTotal(sex) { return sex === TOTAL.index }
            function ages(selection) { return selection.ages }
            function isSelected(interval) { return _.contains(ages(selection),interval) }
            function nameOf(sex) { return _.find([WOMAN, MAN], function(human){ return human.index === sex }).name }

            //_.compose wird dann mit chapter aufgerufen weil es 2. parameter ist
            var filteredData = _.reject(chaptersArray, _.compose(isTotal, sex, d));
            filteredData = _.filter(filteredData, _.compose(isSelected, interval, d));

            return  _.mapObject(_.groupBy(filteredData, _.compose(nameOf, sex, d)), function(chapters){
                return  _.mapObject(_.groupBy(chapters, chapter), function(chapters) {
                    return _.reduce(chapters, function(summe, chapter){
                        return summe + percentage(d(chapter)) }, 0) }); });
        };

            //// iterates through all years of the year interval
            //for(var i = 0; i < dataset.years.length; i++) {
            //
            //    $.getJSON("/api/v1/chaptersbyyear/" + dataset.years[i], function(data) {
            //        var agesLength = dataset.ages.length;
            //        var yearsLength = dataset.years.length;
            //
            //        // var tmpYear = dataset.years[i];
            //
            //        for (var j = 0; j < agesLength; j++) {
            //            var tmpAgeInterval = dataset.ages[j];
            //
            //
            //            _.each(data, function(d) {
            //                var dataShortHand = d.categorised_data.categories.icd_chapter_sex_interval[0];
            //                var intervalShortHand = dataShortHand.interval.from +
            //                    (_.isUndefined(dataShortHand.interval.to) ? '+' : '-' + dataShortHand.interval.to );
            //
            //
            //                if(dataShortHand.sex == MAN && intervalShortHand == tmpAgeInterval) {
            //                    percentageInterval_male[d.code] += dataShortHand.percentage;
            //                }
            //                if(dataShortHand.sex == WOMAN && intervalShortHand == tmpAgeInterval) {
            //                    percentageInterval_female[d.code] += dataShortHand.percentage;
            //                }
            //            })
            //        }
            //
            //        percentageInterval_male = _this.normalizeData(percentageInterval_male, agesLength*yearsLength);
            //        percentageInterval_female = _this.normalizeData(percentageInterval_female, agesLength*yearsLength);
            //
            //        resultCallback(percentageInterval_male, percentageInterval_female);
            //    });
            //}
        //};



        _this.normalizeData = function(notNormalized, a) {
            if(a != 0) {
                var normalizedData = _.object(_.map(notNormalized, function(value, key) {
                    return [key, value/a];
                }));
            }
            return normalizedData;
        };

        _this.initialize();

        return _this;
    }
    return ChaptersByYearConverter;
});