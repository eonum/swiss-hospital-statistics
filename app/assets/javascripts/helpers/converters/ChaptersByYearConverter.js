define([], function() {

    function ChaptersByYearConverter() {
        var _this = {};

        var WOMAN = 0;
        var MAN = 1;

        var cData = [];
        var endData = [[],[]];

        _this.initialize = function () {

        };

        _this.cleanData = function(dataset) {
            var cleanedData = [[],[]];
            function removeItem() {
                function sex(data) {
                    return _.first(data.categorised_data.categories.icd_chapter_sex_interval).sex;
                }
                cleanedData = _.map([WOMAN, MAN], function(each) {
                    return _.filter(dataset, function(data) {
                        return (sex(data) === each);
                    })
                });

                _.each(dataset, function(data){

                });
            }
            removeItem();
            return cleanedData;
        };

        _this.convert = function (dataset) {
            var year, from, to, percentage, sex, code;
            cData = _this.cleanData(dataset);

            _.each(cData, function(data) {
                if(data[0].categorised_data.categories.icd_chapter_sex_interval[0].sex == MAN) {
                    for(i = 0; i < data.length; i++) {
                        year = data[i].year;
                        from = data[i].categorised_data.categories.icd_chapter_sex_interval[0].interval.from;
                        to = data[i].categorised_data.categories.icd_chapter_sex_interval[0].interval.to;
                        percentage = data[i].categorised_data.categories.icd_chapter_sex_interval[0].percentage;
                        sex = data[i].categorised_data.categories.icd_chapter_sex_interval[0].sex;
                        code = data[i].code;
                        endData[MAN].push([year, from, to, percentage, sex, code]);
                    }
                }
                if(data[0].categorised_data.categories.icd_chapter_sex_interval[0].sex == WOMAN) {
                    for(i = 0; i < data.length; i++) {
                        year = data[i].year;
                        from = data[i].categorised_data.categories.icd_chapter_sex_interval[0].interval.from;
                        to = data[i].categorised_data.categories.icd_chapter_sex_interval[0].interval.to;
                        percentage = data[i].categorised_data.categories.icd_chapter_sex_interval[0].percentage;
                        sex = data[i].categorised_data.categories.icd_chapter_sex_interval[0].sex;
                        code = data[i].code;
                        endData[WOMAN].push([year, from, to, percentage, sex, code]);
                    }
                }
            });

            return endData;
        };

        _this.initialize();

        return _this;
    }
    return ChaptersByYearConverter;
});