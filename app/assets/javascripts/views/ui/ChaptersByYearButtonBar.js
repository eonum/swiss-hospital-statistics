define([
    'View'
], function(
    View
){

    function YearChoiceButtonBar(callback){


        var _this = new View('<div></div>');

        var typeButtons = new View('<div class="button-bar"></div>');
        var typeButtonGroup = new View('<ul class="button-group round"></ul>');

        var subtypeButtons = new View('<div class="button-bar"></div>');
        var callback = callback;

        _this.initialize = function(){
            _this.addTypeButtons();
        };

        _this.set2013Button = function(){

        };

        _this.set2012Button = function(){

        };

        _this.set2011Button = function(){

        };

        _this.set2010Button = function(){

        };

        _this.set2009Button = function(){

        };

        _this.set2008Button = function(){

        };

        _this.set2007Button = function(){

        };

        _this.set2006Button = function(){

        };

        _this.set2005Button = function(){

        };

        _this.set2004Button = function(){

        };

        _this.set2003Button = function(){

        };


        _this.addTypeButtons = function(){
            var year2013 = new $(new View('<a href="#" class="small button secondary">2013</a>'));
            year2013.click(_this.set2013Button());
            typeButtonGroup.add(new View('<li></li>').add(year2013));

            var year2012 = new $(new View('<a href="#" class="small button secondary">2012</a>'));
            year2012.click(_this.set2012Button());
            typeButtonGroup.add(new View('<li></li>').add(year2012));

            var year2011 = new $(new View('<a href="#" class="small button secondary">2012</a>'));
            year2011.click(_this.set2011Button());
            typeButtonGroup.add(new View('<li></li>').add(year2011));

            var year2010 = new $(new View('<a href="#" class="small button secondary">2012</a>'));
            year2010.click(_this.set2010Button());
            typeButtonGroup.add(new View('<li></li>').add(year2010));

            var year2009 = new $(new View('<a href="#" class="small button secondary">2012</a>'));
            year2009.click(_this.set2009Button());
            typeButtonGroup.add(new View('<li></li>').add(year2009));

            var year2008 = new $(new View('<a href="#" class="small button secondary">2012</a>'));
            year2008.click(_this.set2008Button());
            typeButtonGroup.add(new View('<li></li>').add(year2008));

            var year2007 = new $(new View('<a href="#" class="small button secondary">2012</a>'));
            year2007.click(_this.set2007Button());
            typeButtonGroup.add(new View('<li></li>').add(year2007));

            var year2006 = new $(new View('<a href="#" class="small button secondary">2012</a>'));
            year2006.click(_this.set2006Button());
            typeButtonGroup.add(new View('<li></li>').add(year2006));

            var year2005 = new $(new View('<a href="#" class="small button secondary">2012</a>'));
            year2005.click(_this.set2005Button());
            typeButtonGroup.add(new View('<li></li>').add(year2005));

            var year2004 = new $(new View('<a href="#" class="small button secondary">2012</a>'));
            year2004.click(_this.set2004Button());
            typeButtonGroup.add(new View('<li></li>').add(year2004));

            var year2003 = new $(new View('<a href="#" class="small button secondary">2012</a>'));
            year2003.click(_this.set2003Button());
            typeButtonGroup.add(new View('<li></li>').add(year2003));


            typeButtons.add(typeButtonGroup);
            _this.append(typeButtons);
        };

        _this.initialize();

        return _this;
    }

    return YearChoiceButtonBar;
});