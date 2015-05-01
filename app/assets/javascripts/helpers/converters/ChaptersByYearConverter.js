define([], function() {

    function ChaptersByYearConverter() {
        var _this = {};

        var cData = [];

        _this.initialize = function () {

        };

        _this.cleanData = function(dataset) {
            var cleanedData = [[],[]];
            function removeItem() {
                for (i = 0; i<dataset.length; i++) {
                    if(dataset[i].categorised_data.categories.icd_chapter_sex_interval[0].sex == 0) {
                        cleanedData[0].push(dataset[i]);
                    }
                    if(dataset[i].categorised_data.categories.icd_chapter_sex_interval[0].sex == 1) {
                        cleanedData[1].push(dataset[i]);
                    }
                }
            };
            removeItem();
            return cleanedData;
        };

        _this.convert = function (dataset) {

            var sex;
            var interval;
            var percentil;



            cData = _this.cleanData(dataset);
            console.log(cData);

            /*for(i = 0; i < cData.length; i++) {
                if(cData[i].categoriesed_data.categories)
            }
*/
            return cData;


        };

        _this.initialize();

        return _this;
    }
    return ChaptersByYearConverter;
});