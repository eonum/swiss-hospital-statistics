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



        return _this;
    }

    return YearChoiceButtonBar;
});