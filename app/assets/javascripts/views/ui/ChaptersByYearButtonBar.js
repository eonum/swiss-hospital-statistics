define([
    'View', 'helpers/converters/ChaptersByYearConverter'
], function(
    View, ChaptersByYearConverter
){

    function YearChoiceButtonBar(callback){


        var _this = new View('<div></div>');

        var typeButtons = new View('<div class="button-bar"></div>');
        var typeButtonGroup = new View('<ul class="button-group round"></ul>');

        var subtypeButtons = new View('<div class="button-bar"></div>');
        var callback = callback;

        var chaptersByYearConverter = new ChaptersByYearConverter();

        _this.initialize = function(){
            _this.addTypeButtons();
        };

        _this.setButton = function(year){
            var data = $.getJSON("/api/v1/chaptersbyyear/" + year);
            chaptersByYearConverter.convert(data);
            console.log(data);
        };


        _this.addTypeButtons = function(){
            var year2013 = new $(new View('<a href="#" class="tiny button secondary">2013</a>'));
            year2013.click(function () { _this.setButton(2013)});
            typeButtonGroup.add(new View('<li></li>').add(year2013));

            var year2012 = new $(new View('<a href="#" class="tiny button secondary">2012</a>'));
            year2012.click(function () { _this.setButton(2012)});
            typeButtonGroup.add(new View('<li></li>').add(year2012));

            var year2011 = new $(new View('<a href="#" class="tiny button secondary">2011</a>'));
            year2011.click(function () { _this.setButton(2011)});
            typeButtonGroup.add(new View('<li></li>').add(year2011));

            var year2010 = new $(new View('<a href="#" class="tiny button secondary">2010</a>'));
            year2010.click(function () { _this.setButton(2010)});
            typeButtonGroup.add(new View('<li></li>').add(year2010));

            var year2009 = new $(new View('<a href="#" class="tiny button secondary">2009</a>'));
            year2009.click(function () { _this.setButton(2009)});
            typeButtonGroup.add(new View('<li></li>').add(year2009));

            var year2008 = new $(new View('<a href="#" class="tiny button secondary">2008</a>'));
            year2008.click(function () { _this.setButton(2008)});
            typeButtonGroup.add(new View('<li></li>').add(year2008));

            var year2007 = new $(new View('<a href="#" class="tiny button secondary">2007</a>'));
            year2007.click(function () { _this.setButton(2007)});
            typeButtonGroup.add(new View('<li></li>').add(year2007));

            var year2006 = new $(new View('<a href="#" class="tiny button secondary">2006</a>'));
            year2006.click(function () { _this.setButton(2006)});
            typeButtonGroup.add(new View('<li></li>').add(year2006));

            var year2005 = new $(new View('<a href="#" class="tiny button secondary">2005</a>'));
            year2005.click(function () { _this.setButton(2005)});
            typeButtonGroup.add(new View('<li></li>').add(year2005));

            var year2004 = new $(new View('<a href="#" class="tiny button secondary">2004</a>'));
            year2004.click(function () { _this.setButton(2004)});
            typeButtonGroup.add(new View('<li></li>').add(year2004));

            var year2003 = new $(new View('<a href="#" class="tiny button secondary">2003</a>'));
            year2003.click(function () { _this.setButton(2003)});
            typeButtonGroup.add(new View('<li></li>').add(year2003));


            typeButtons.add(typeButtonGroup);
            _this.append(typeButtons);
        };

        _this.initialize();

        return _this;
    }

    return YearChoiceButtonBar;
});