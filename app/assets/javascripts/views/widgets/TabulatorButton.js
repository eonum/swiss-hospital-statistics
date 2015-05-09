define([
    'View',
    'announcements/OnTabulatorSelected',
    'announcements/OnTabulatorDeselected'
], function(
    View,
    OnTabulatorSelected,
    OnTabulatorDeselected
){
    function TabulatorButton() {
        var _this = new View('<li class="text-center"></li>');
        var link;
        var model;

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            model.tabulator().announcer().onSendTo(OnTabulatorSelected, _this.onSelected, _this);
            model.tabulator().announcer().onSendTo(OnTabulatorDeselected, _this.onDeselected, _this);
            _this.render();
            return _this;
        };

        _this.render = function () {
            _this.renderLink();
            _this.attachListeners();
            _this.label(_this.model().name());
            if(_this.model().isSelected())
                _this.beActive();
        };

        _this.renderLink = function () {
            link = _this.newLink();
            _this.add(_this.link());
        };

        _this.link = function () {
            return link;
        };

        _this.newLink = function() {
            return new View('<a></a>');
        };

        _this.label = function (translations) {
            Multiglot.custom(_this.link(), translations);
        };

        _this.beActive = function () {
            _this.class('active');
        };

        _this.beNormal = function() {
            _this.removeClass('active');
        };

        _this.active = function(bool) {
            bool ? _this.beActive() : _this.beNormal();
        };

        _this.attachListeners = function () {
            _this.link().click(function(e){
                e.preventDefault();
                _this.model().select();
            });
        };

        _this.onSelected = function (ann) {
            if (ann.tab() === _this.model())
                _this.beActive();
        };

        _this.onDeselected = function (ann) {
            if (ann.tab() === _this.model())
                _this.beNormal();
        };

        return _this;
    }

    return TabulatorButton;
});