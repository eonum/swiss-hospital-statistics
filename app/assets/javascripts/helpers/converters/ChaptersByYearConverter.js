define([], function() {

    function ChaptersByYearConverter() {
        var _this = {};

        var WOMAN = 0;
        var MAN = 1;

        var cData = [];
        var endData = [[],[]];

        _this.initialize = function () {

        };
/*
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
*/
        // This function will iterate per year through all age intervals and sum it up
        // first for loop iterates through the years while the second iterates through
        // the age intervals.
        _this.convert = function (dataset) {
            // TODO: man woman
            var year, from, to, percentage, sex, code;

            console.log(dataset);
            for(i = 0; i < dataset.years.length; i++) {
                $.getJSON("/api/v1/chaptersbyyear/" + dataset.years[i], function(data) {

                    var tmpYear = dataset.years[i];

                    for (j = 0; j < dataset.ages.length; j++) {
                        var tmpAgeInterval = dataset.ages[j];


                        _.each(data, function(daten) {
                            if(daten.categorised_data.categories.icd_chapter_sex_interval[0].sex == MAN) {
                                console.log("MAN");
                            }
                            if(daten.categorised_data.categories.icd_chapter_sex_interval[0].sex == WOMAN) {
                                console.log("WOMAN");
                            }
                        })
                    }

                });


            }

            return dataset;
            /*
                    ._each(data, function(d) {
                        if(d[0].categorised_data.categories.icd_chapter_sex_interval[0].sex == MAN) {
                            console.log("MAN");
                        }
                        if(d[0].categorised_data.categories.icd_chapter_sex_interval[0].sex == WOMAN) {
                            console.log("WOMAN");
                        }
                    })
                }
                return dataset;

                */
        };

                //cData = _.this.cleanData(data);

            /*

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
        */

        _this.initialize();

        return _this;
    }
    return ChaptersByYearConverter;
});