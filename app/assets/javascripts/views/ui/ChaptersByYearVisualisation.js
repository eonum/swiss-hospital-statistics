define([
    'View', 'views/ChaptersByYear', 'helpers/converters/ChaptersByYearConverter'
], function (
    View, ChaptersByYear, ChaptersByYearConverter
) {

    function ChaptersByYearVisualisation(_width, _height) {
        var _this = new View('<div></div>');
        var content = new View('<div></div>');
        var chaptersByYear = new ChaptersByYear(_width, _height);

        _this.initialize = function () {
            this.append(content);
            content.append(chaptersByYear);
        };

        _this.visualiseData = function(title, datasets){
            var converter = new ChaptersByYearConverter(datasets);

            // TODO get clean data from converter and continue with it.

            // chaptersByYear.setTitle(title);

            content.empty();



        };

        _this.initialize();

        return _this;
    }

    return ChaptersByYearVisualisation;
});