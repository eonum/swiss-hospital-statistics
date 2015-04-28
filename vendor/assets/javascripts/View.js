define([], function(){

    /**
     *
     * @param html
     * @returns {*|jQuery|HTMLElement|View}
     * @class {View}
     */
    function View (html) {
        var _this = $(html);
        var model;

        _this.data('me', _this);

        _this.class = function (className) {
            if (_.isUndefined(className)) return _this.attr('class');
            _this.addClass(className);
            return _this;
        };

        _this.add = function (domElement) {
            _this.append(domElement);
            return _this;
        };

        _this.with = function (_function) {
            _function(_this);
            return _this;
        };

        _this.color = function (_color) {
            _this.css('background-color', _color);
            return _this;
        };

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            return _this;
        };

        _this.subclassResponsibility = function() {
            throw 'Should be implemented by subclass!';
        };

        return _this;
    }

    return View;
});