define([
    'View',
    'announcements/OnIcdAgesDeselected',
    'announcements/OnIcdAgesSelected',
    'announcements/OnIcdYearsDeselected',
    'announcements/OnIcdYearsSelected'
], function(
    View,
    OnIcdAgesDeselected,
    OnIcdAgesSelected,
    OnIcdYearsDeselected,
    OnIcdYearsSelected
){

    function Selector() {
        var _this = new View('<ul class="inline-list"></ul>');

        var model;

        var itemsLogic = function() { return [] };
        var isSelectedLogic = function() {return false};
        var onClick = _.identity;

        _this.model = function(_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.render();
            return _this;
        };

        _this.render = function () {
            _this.empty();
            _.each(_this.items(), function(item){
                var itemView = _this.buildItemView(item);
                _this.add(itemView);
            });
        };

        _this.items = function (func) {
            if (_.isUndefined(func)) return itemsLogic(_this.model());
            itemsLogic = func;
            return _this;
        };

        _this.onClick = function(func) {
            onClick = func;
            return _this;
        };

        _this.selected = function(func) {
            isSelectedLogic = func;
            return _this;
        };

        _this.isSelected = function(item) {
            return isSelectedLogic(_this.model(), item);
        };

        _this.buildItemView = function(item) {
            var itemView = new View('<li class="label radius secondary"></li>');
            var link = new View('<a></a>');
            link.text(''+item);
            itemView.add(link);
            itemView.model(item);
            itemView.click(function(e){
                e.preventDefault();
                onClick(_this.model(), $(this).me().model());
            });
            if (_this.isSelected(item))
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

        return _this;
    }

    function IcdYearsSelector() {
        var _this = new View('<div></div>');

        var yearsSelector;
        var agesSelector;
        var model;

        _this.initialize = function () {
            yearsSelector = _this.newSelector()
                .items(function(model) { return model.years()})
                .selected(function(model, item) { return model.isYearSelected(item)})
                .onClick(function(model, item) { model.toggleYear(item) });
            agesSelector = _this.newSelector()
                .items(function(model) { return model.ages()})
                .selected(function(model, item) { return model.isAgeSelected(item)})
                .onClick(function(model, item) { model.toggleAge(item) });
        };

        _this.model = function(_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            model.announcer().onSendTo(OnIcdAgesDeselected, _this.onAgeDeselected, _this);
            model.announcer().onSendTo(OnIcdAgesSelected, _this.onAgeSelected, _this);
            model.announcer().onSendTo(OnIcdYearsDeselected, _this.onYearDeselected, _this);
            model.announcer().onSendTo(OnIcdYearsSelected, _this.onYearSelected, _this);
            yearsSelector.model(model);
            agesSelector.model(model);
            _this.render();
            return _this;
        };

        _this.render = function () {
            _this.empty();
            _this.add(yearsSelector);
            _this.add(agesSelector);
        };

        _this.onAgeDeselected = function(ann) {
            agesSelector.deselect(ann.ages());
        };

        _this.onAgeSelected = function(ann) {
            agesSelector.select(ann.ages());
        };

        _this.onYearDeselected = function(ann) {
            yearsSelector.deselect(ann.years());
        };

        _this.onYearSelected = function(ann) {
            yearsSelector.select(ann.years());
        };

        _this.newSelector = function () {
            return new Selector();
        };

        _this.initialize();


        return _this;
    }

    return IcdYearsSelector;

});