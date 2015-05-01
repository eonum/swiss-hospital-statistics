define([], function() {

    function ChaptersByYearConverter() {
        var _this = {};

        var cData = [];

        _this.initialize = function () {

        };

        _this.cleanData = function(dataset) {
            var cleanedData = [];
            function removeItem(obj, prop, val) {
                for (i = 0; i<dataset.length; i++) {
                    if(dataset[i].categorised_data.categories.icd_chapter_sex_interval[0].sex != 2) {
                        cleanedData.push(dataset[i]);
                    }
                }
            };
            removeItem(dataset, 'sex', '2');
            return cleanedData;
        };

        _this.convert = function (dataset) {

            var sex;
            var interval;
            var percentil;



            cData = _this.cleanData(dataset);

            for(i = 0; i < cData.length; i++) {
                
            }

            return cData;


        };

        _this.initialize();

        return _this;
    }
    return ChaptersByYearConverter;
});