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

        var linkTextLogic = function(link, item, model){
            link.text(model.label(item));
        };

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

        _this.setLinkTextLogic = function(logic){
            if(_.isUndefined(logic) || !_.isFunction(logic)){
                return linkTextLogic;
            }else{
                linkTextLogic = logic;
            }
        };

        _this.buildItemView = function(item) {
            var itemView = new View('<li class="label radius secondary"></li>');
            var link = new View('<a></a>');
            linkTextLogic(link, item, _this.model());
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

        _this.select = function(item) {
            _this.children().each(function(index,each){
                if (item === $(each).me().model())
                    _this.beActive($(each).me());
            })
        };

        _this.deselect = function (item) {
            _this.children().each(function(index,each){
                if (item === $(each).me().model())
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
        var _this = new View('<div class="selector"></div>');

        var selectors = [];
        var model;

        var linkTextLogic;

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
            var selector = new Selector();
            if(!_.isUndefined(linkTextLogic)){
                selector.setLinkTextLogic(linkTextLogic);
            }
            return selector;
        };

        _this.setOuterLinkTextLogic = function (logic){
            if(_.isUndefined(logic) || !_.isFunction(logic)){
                return linkTextLogic;
            }else{
                linkTextLogic = logic;
            }
        };

        return _this;
    }

    return IcdYearsSelector;

});