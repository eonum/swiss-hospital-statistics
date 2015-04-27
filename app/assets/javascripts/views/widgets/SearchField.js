define([
    'View'
], function(
    View
) {

    function SearchField() {
        var _this = new View('<div class="row"><div class="large-12 columns"><div class="row collapse"></div></div></div>');
        var inputWrapper = new View('<div class="small-10 columns"></div>');
        var buttonWrapper = new View('<div class="small-2 columns"></div>');

        var input;
        var button;

        _this.render = function () {
            input = _this.newInput();
            button = _this.newButton();
            inputWrapper.add(input);
            buttonWrapper.add(button);
            _this.add(inputWrapper);
            _this.add(buttonWrapper);
        };

        _this.newButton = function () {
            return new View('<a href="#" class="button postfix">Search</a>');
        };

        _this.newInput = function () {
            return new View('<input type="text" placeholder="Search codes e.g. A045">');
        };

        _this.render();

        return _this;
    }

    return SearchField;


});