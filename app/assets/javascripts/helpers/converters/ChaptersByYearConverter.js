define([], function() {

    function ChaptersByYearConverter() {
        var _this = {};

        var WOMAN = 0;
        var MAN = 1;

        var cData = [];

        _this.initialize = function () {

        };

        _this.cleanData = function(dataset) {
            var cleanedData = [[],[]];
            function removeItem() {
                function sex(data) {
                    return _.first(data.categorised_data.categories.icd_chapter_sex_interval).sex;
                }
                _.each (dataset, function(data){
                    if(sex(data) === WOMAN)
                        cleanedData[WOMAN].push(data);
                    if(sex(data) === MAN)
                        cleanedData[MAN].push(data); });

                _.each(dataset, function(data){
                    // do something with data here
                });
            }
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