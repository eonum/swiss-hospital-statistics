define([
    'View',
    'announcements/OnBreadcrumbSelected'
], function(
    View,
    OnBreadcrumbSelected
){
    function Dropdown () {
        var _this = new View('<ul class="dropdown"></ul>');
        var itemLimit = 50;
        var model;

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.render();
        };

        _this.render = function () {
            var items = _this.model().alternatives();
            if (_.size(items) > itemLimit * 2) {
                _this.renderItemsIn(_.first(items,itemLimit), _this);
                _this.add(_this.newExpandItem());
                _this.renderItemsIn(_.last(items,itemLimit), _this);
                return;
            }
            _this.renderItemsIn(items, _this);
        };

        _this.renderLink = function(node) {
            var item = _this.newItem();
            var link = _this.newLink();
            new Multiglot().on(link).custom(node.label()).apply();
            link.model(node).click(function(e){
                e.preventDefault();
                $(this).me().model().select()
            });
            if (node.isSelected())
                item.class('selected');
            if (!node.isDefault())
                item.append('<span '+Multiglot.renderCustom(node.hint())+'>'+Multiglot.translate(node.hint())+'</span>');
            item.add(link);
            return item;
        };

        _this.renderItemsIn = function (_items, _list) {
            _.each(_items, function (item) {
                _list.add(_this.renderLink(item));
            });
        };

        _this.newExpandItem = function () {
            var expand = _this.newItem();
            expand.html('...');
            return expand;
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
            _this.click(function(e){
                e.preventDefault();
                _this.model().select();
            });
        };

        _this.beCurrent = function () {
            _this.class('current');
        };

        _this.label = function(translations) {
            new Multiglot().on(_this.link()).custom(translations).apply();
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