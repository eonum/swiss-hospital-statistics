define([], function() {

    function ChaptersByYearConverter() {
        var _this = {};

        var WOMAN = 0;
        var MAN = 1;

        var cData = [];
        var endData = [[],[]]

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
                if(data[0].categorised_data.categories.icd_chapter_sex_interval[0].sex == 1) {
                    for(i = 0; i < data.length; i++) {
                        year = data[i].year;
                        from = data[i].categorised_data.categories.icd_chapter_sex_interval[0].interval.from;
                        to = data[i].categorised_data.categories.icd_chapter_sex_interval[0].interval.to;
                        percentage = data[i].categorised_data.categories.icd_chapter_sex_interval[0].percentage;
                        sex = data[i].categorised_data.categories.icd_chapter_sex_interval[0].sex;
                        code = data[i].code;
                        endData[1].push([year, from, to, percentage, sex, code]);
                    }
                }
                if(data[0].categorised_data.categories.icd_chapter_sex_interval[0].sex == 0) {
                    for(i = 0; i < data.length; i++) {
                        year = data[i].year;
                        from = data[i].categorised_data.categories.icd_chapter_sex_interval[0].interval.from;
                        to = data[i].categorised_data.categories.icd_chapter_sex_interval[0].interval.to;
                        percentage = data[i].categorised_data.categories.icd_chapter_sex_interval[0].percentage;
                        sex = data[i].categorised_data.categories.icd_chapter_sex_interval[0].sex;
                        code = data[i].code;
                        endData[0].push([year, from, to, percentage, sex, code]);
                    }
                }

                console.log("endData");
                console.log(endData);

                console.log("inside main function")
                console.log(data[80].categorised_data.categories.icd_chapter_sex_interval[0].interval.from);
                console.log(data[80].categorised_data.categories.icd_chapter_sex_interval[0].interval.to);
                /*
                if(data[MAN].categorised_data.categories.icd_chapter_sex_interval[0].interval.sex == 1) {
                    year = data[MAN].categorised_data.categories.icd_chapter_sex_interval[0].year;
                    console.log(year);
                    from = data.categorised_data.categories.icd_chapter_sex_interval[0].interval.from;
                    to = data.categorised_data.categories.icd_chapter_sex_interval[0].interval.from;
                    endData[MAN].push([year, from, to]);
                }*/
            });


            console.log(endData);

            /*for(i = 0; i < cData.length; i++) {
                if(cData[i].categoriesed_data.categories)
            }
*/
            return endData;


        };

        _this.initialize();

        return _this;
    }
    return ChaptersByYearConverter;
});