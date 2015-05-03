define(['d3', 'views/ResponsiveSvg', 'views/ui/ChaptersByYearButtonBar'], function (d3, ResponsiveSvg, ChaptersByYearButtonBar){

    function ChaptersByYearFunction(_width, _height){

        var _this = new ResponsiveSvg(_width, _height);
        var titleFontSize = _height / 20;
        var chartHeight = _height - titleFontSize;

        var chaptersByYearButtonBar = new ChaptersByYearButtonBar();


        _this.marginTop(50);
        _this.marginLeft(50);
        _this.marginRight(140);
        _this.marginBottom(50);

        _this.initialize = function(){
            _this.add(chaptersByYearButtonBar);
        };

        _this.initialize();

        return _this;
    }

    return ChaptersByYearFunction;

});