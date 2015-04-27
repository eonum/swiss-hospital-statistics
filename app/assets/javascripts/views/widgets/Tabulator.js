define([
    'View'
], function(
    View
){

    function Tab() {
        var _this = new View('<div></div>');

        return _this;
    }

    function Tabulator() {
        var _this = new View('<div></div>');

        var tabs = [];
        var model;

        _this.model = function(_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
        };

        _this.tabs = function () {
            return tabs;
        };

        return _this;
    }

    return Tabulator;

});