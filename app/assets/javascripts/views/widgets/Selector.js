define([
    'View',
    'announcements/OnDeselected',
    'announcements/OnSelected'
], function(
    View,
    OnDeselected,
    OnSelected
){

    function Selector() {
        var _this = new View('<ul class="inline-list"></ul>');

        var model;

        _this.model = function(_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            model.announcer().onSendTo(OnSelected, _this.onSelected, _this);
            model.announcer().onSendTo(OnDeselected, _this.onDeselected, _this);
            _this.render();
            return _this;
        };

        _this.render = function () {
            _this.empty();
            _.each(_this.model().items(), function(item){
                var itemView = _this.buildItemView(item);
                _this.add(itemView);
            });
        };

        _this.buildItemView = function(item) {
            var itemView = new View('<li class="label radius secondary"></li>');
            var link = new View('<a></a>');
            link.text(_this.model().label(item));
            itemView.add(link);
            itemView.model(item);
            itemView.click(function(e){
                e.preventDefault();
                _this.model().toggle($(this).me().model());
            });
            if (_this.model().isSelected(item))
                _this.beActive(itemView);
            return itemView;
        };

        _this.beActive = function(itemView) {
            itemView.class('success').removeClass('secondary');
        };

        _this.beNormal = function(itemView) {
            itemView.class('secondary').removeClass('success');
        };

        _this.select = function(items) {
            _this.children().each(function(index,each){
                if (_.indexOf(items,$(each).me().model()) >= 0)
                    _this.beActive($(each).me());
            })
        };

        _this.deselect = function (items) {
            _this.children().each(function(index,each){
                if (_.indexOf(items,$(each).me().model()) >= 0)
                    _this.beNormal($(each).me());
            })
        };

        _this.onSelected = function (ann) {
            _this.select(ann.item());
        };

        _this.onDeselected = function (ann) {
            _this.deselect(ann.item());
        };

        return _this;
    }

    function IcdYearsSelector() {
        var _this = new View('<div></div>');

        var selectors = [];
        var model;

        _this.model = function(_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.render();
            return _this;
        };

        _this.render = function () {
            _this.empty();
            selectors = _.map(_this.model().categories(), function(category){
                return _this.newSelector().model(category);
            });
            _this.append(selectors);
        };

        _this.newSelector = function () {
            return new Selector();
        };

        return _this;
    }

    return IcdYearsSelector;

});