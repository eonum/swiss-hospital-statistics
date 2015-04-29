define([
    'View'
], function(
    View
){

    function Step () {
        var _this = new View('<li></li>');
        var link;
        var model;

        _this.initialize = function() {
            link = _this.newLink();
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
        };

        _this.beCurrent = function () {
            _this.class('current');
        };

        _this.label = function(string) {
            _this.link().text(string);
        };

        _this.link = function() {
            return link;
        };

        _this.newLink = function () {
            return new View('<a></a>');
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