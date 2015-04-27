define([
    'View', 'views/ChaptersByYear', 'helpers/converters/ChaptersByYearConverter'
], function (
    View, ChaptersByYear, ChaptersByYearConverter
) {

    function ChaptersByYearVisualisation() {
        var _this = new View('<div></div>');
        var content = new View('<div></div>');
        var chaptersByYear;

        _this.initialize = function () {
            this.append(content);
            _this.class('chaptersByYearContainer');
        };

        _this.visualiseData = function(description, datasets){
            var converter = new ChaptersByYearConverter(datasets);

            chaptersByYear = new ChaptersByYear()
                .key('interval')
                .value('amount')
                .transformed(function (v) {
                    return v.toPrecision(3)
                })
                .labeled(function (value) {
                    return (value ) + '%'
                })
                .openOn(intervals);

            content.empty();

            content.add('<h3>' + description + '</h3>');
            content.add(pieChart);

        };

        _this.initialize();

        return _this;
    }

    return ChaptersByYearVisualisation;
});