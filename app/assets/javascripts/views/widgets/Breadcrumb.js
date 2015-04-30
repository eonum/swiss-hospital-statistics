define([
    'View',
    'announcements/OnBreadcrumbSelected'
], function(
    View,
    OnBreadcrumbSelected
){
    function Dropdown () {
        var _this = new View('<ul class="dropdown"></ul>');

        var model;

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.render();
        };

        _this.render = function () {
            _.each(_this.model().alternatives(), function(node) {
                _this.add(_this.renderLink(node));
            });
        };

        _this.renderLink = function(node) {
            var item = _this.newItem();
            var link = _this.newLink();
            link.model(node).text(node.label()).click(function(e){
                e.preventDefault();
                $(this).me().model().select()
            });
            item.add(link);
            return item;
        };

        _this.newLink = function () {
            return new View('<a></a>');
        };

        _this.newItem = function () {
            return new View('<li></li>');
        };

        return _this;
    }

    function Step () {
        var _this = new View('<li class="has-dropdown not-click"></li>');
        var link;
        var dropdown;
        var model;

        _this.initialize = function() {
            link = _this.newLink();
            dropdown = _this.newDropdown();
            _this.add(link);
        };

        _this.model = function(_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.render();
        };

        _this.render = function () {
            _this.label(_this.model().label());
            if (!_this.model().hasNext())
                _this.beCurrent();
            if (_this.model().hasAlternatives()) {
                _this.dropdown().model(_this.model());
                _this.add(_this.dropdown());
            }
        };

        _this.beCurrent = function () {
            _this.class('current');
        };

        _this.label = function(string) {
            _this.link().text(string);
        };

        _this.dropdown = function () {
            return dropdown;
        };

        _this.link = function() {
            return link;
        };

        _this.newLink = function () {
            return new View('<a></a>');
        };

        _this.newDropdown = function () {
            return new Dropdown();
        };

        _this.initialize();

        return _this;
    }

    function Breadcrumb() {
        var _this = new View('<ul class="breadcrumbs"></ul>');

        var model;

        _this.model = function(_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            model.announcer().onSendTo(OnBreadcrumbSelected, _this.onSelected, _this);
            _this.render();
        };

        _this.render = function() {
            _.each(_this.model().selected().path(), function(each){
                _this.addStep(each);
            });
        };

        _this.addStep = function (stepModel) {
            var step = _this.newStep();
            step.model(stepModel);
            _this.add(step);
        };

        _this.newStep = function () {
            return new Step();
        };

        _this.onSelected = function () {
            _this.empty();
            _this.render();
        };

        return _this;
    }

    return Breadcrumb;

});