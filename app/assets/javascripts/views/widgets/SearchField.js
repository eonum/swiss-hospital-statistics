define([
    'View'
], function(
    View
) {

    function SearchField() {
        var _this = new View('<div class="row search"></div>');
        var inputWrapper = new View('<div class="small-10 columns"></div>');
        var buttonWrapper = new View('<div class="small-2 columns"></div>');

        var input;
        var button;

        var model;

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.render();
            _this.search(_this.input());
        };

        _this.render = function () {
            input = _this.newInput();
            new Multiglot().on(input).id('search_placeholder').attr('placeholder').apply();

            button = _this.newButton();
            new Multiglot().on(button).id('search_button').apply();

            inputWrapper.add(input);
            buttonWrapper.add(button);
            _this.add(inputWrapper);
            _this.add(buttonWrapper);
            _this.attachInputHandler();
        };

        _this.newButton = function () {
            return new View('<a href="#" class="button postfix"></a>');
        };

        _this.newInput = function () {
            return new View('<input type="text">');
        };

        _this.search = function (query) {
            _this.model().process(query);
        };

        _this.input = function () {
            return _.isUndefined(_this.inputField()) ? '' : _this.inputField().val();
        };

        _this.inputField = function () {
            return input;
        };

        _this.attachInputHandler = function(){
            if (_.isUndefined(_this.inputField())) return;
            _this.inputField().keyup(function () {
                _this.search(_this.input());
            });
        };

        return _this;
    }

    return SearchField;


});