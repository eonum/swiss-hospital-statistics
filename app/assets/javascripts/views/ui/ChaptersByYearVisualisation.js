define([
    'View', 'views/ChaptersByYear'
], function (
    View, ChaptersByYear
) {

    function ChaptersByYearVisualisation(_width, _height) {
        var _this = new View('<div></div>');
        var chaptersByYear = new ChaptersByYear(_width, _height);

        _this.initialize = function () {
            _this.add(chaptersByYear);
        };

        _this.visualiseData = function(title, datasets){
            //var converter = new ChaptersByYearConverter(datasets);
            console.log(title);
            // TODO get clean data from converter and continue with it.

            // chaptersByYear.setTitle(title);

            return _this;

        };

        _this.initialize();

        return _this;
    }

    return ChaptersByYearVisualisation;
});