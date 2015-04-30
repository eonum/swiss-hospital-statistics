define([
    'View'
], function(
    View
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
            var link = _this.newLink();
            link.find('a').text(node.label());
            return link;
        };

        _this.newLink = function () {
            return new View('<li><a></a></li>');
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
            _this.render();
        };

        _this.render = function() {
            var stepModel = _this.model().root();
            while (stepModel.hasNext()) {
                _this.addStep(stepModel);
                stepModel = stepModel.next();
            }
            _this.addStep(stepModel);
        };

        _this.addStep = function (stepModel) {
            var step = _this.newStep();
            step.model(stepModel);
            _this.add(step);
        };

        _this.newStep = function () {
            return new Step();
        };

        return _this;
    }

    return Breadcrumb;

});