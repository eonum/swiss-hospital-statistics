define([
    'View',
    'Announcer',
    'announcements/OnAlphabeticalItemsUpdated',
    'announcements/OnAlphabeticalItemSelected',
    'announcements/OnAlphabeticalItemDeselected',
    'announcements/OnLabelsCloudAdded',
    'announcements/OnLabelsCloudRemoved'
], function(
    View,
    Announcer,
    OnAlphabeticalItemsUpdated,
    OnAlphabeticalItemSelected,
    OnAlphabeticalItemDeselected,
    OnLabelsCloudAdded,
    OnLabelsCloudRemoved
) {

    var groupID = function(group) {
        return group.selector().prefixOf(group);
    };

    function OnItemClicked(item) {
        var _this = this;
        _this.item = function () {
            return item;
        };
    }

    function Navigation () {
        var _this = new View('<div data-magellan-expedition="fixed" class="navigation"></div>');

        var subNav;
        var model;

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.render();
        };

        _this.render = function () {
            _this.empty();
            subNav = _this.newSubNav();
            _.each(_this.model().groups(), function (group) {
                var groupView = _this.renderGroup(group);
                if (group.isNotEmpty()) groupView.removeClass('inactive');
                subNav.add(groupView);
            });
            _this.add(subNav);
        };

        _this.newSubNav = function () {
            return new View('<dl class="sub-nav"></dl>');
        };

        _this.renderGroup = function (group) {
            return new View('<dd class="inactive" data-magellan-arrival="'+groupID(group)+'"><a href="#'+groupID(group)+'">'+group.label()+'</a></dd>');
        };

        return _this;
    }

    function ItemLabel(_group) {
        var _this = new View('<span class="radius secondary label"></span>');

        var item;
        var group = _group;

        _this.initialize = function() {
            _this.click(function(e){
                e.preventDefault();
                if (_.isUndefined(_this.item())) return;
                _this.group().selector().cloud().toggle(_this.item());
            });
        };

        _this.item = function (_item) {
            if (_.isUndefined(_item)) return item;
            item = _item;
            _this.render();
            return _this;
        };

        _this.group = function () {
            return group;
        };

        _this.render = function () {
            new Multiglot().on(_this).id('compare').apply();
        };

        _this.initialize();

        return _this;
    }

    function ItemView(_group) {
        var _this = new View('<li></li>');
        var link = new View('<a></a>');

        var item;
        var group = _group;
        var label;

        _this.item = function (_item) {
            if (_.isUndefined(_item)) return item;
            item = _item;
            _this.render();
        };

        _this.group = function () {
            return group;
        };

        _this.link = function() {
            return link;
        };

        _this.label = function () {
            return label;
        };

        _this.render = function () {
            var translations = _this.group().selector().nameOf(_this.item());
            new Multiglot().on(link).custom(translations).apply();

            _this.add(link);
            if (_this.group().selector().isItemSelected(_this.item()))
                _this.select();
            if (_this.group().selector().cloud().has(_this.item()))
                _this.mark();
            label = new ItemLabel(_this.group()).item(_this.item());
            _this.add(label);
        };

        _this.select = function () {
            _this.class('selected');
        };

        _this.deselect = function () {
            _this.removeClass('selected');
        };

        _this.mark = function () {
            _this.class('marked');
        };

        _this.unmark = function () {
            _this.removeClass('marked');
        };

        return _this;
    }

    function NullItemView(_group) {
        return new ItemView(_group);
    }

    function GroupView () {
        var _this = new View('<div class="row left" style="width: 100%"></div>');
        var name;
        var content = new View ('<div class="medium-11 large-11 columns"></div>');
        var list = new View ('<ul class="no-bullet"></ul>');
        var announcer = new Announcer();

        var itemLimit = 2;
        var groupLimit = 2;

        var model;

        _this.announcer = function () {
            return announcer;
        };

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.render();
        };

        _this.render = function () {
            name = _this.renderName();
            _this.add(name);
            _this.renderList();
            content.add(list);
            _this.add(content);
        };

        _this.renderList = function () {
            if (_.size(_this.model().items()) > itemLimit * 2 && _this.model().amountOfGroups() > groupLimit) {
                _this.renderItemsIn(_.first(_this.model().items(),itemLimit), list);
                list.add(_this.newExpandItem());
                _this.renderItemsIn(_.last(_this.model().items(),itemLimit), list);
                return;
            }
            _this.renderItemsIn(_this.model().items(), list);
        };

        _this.renderName = function () {
            return new View('<div data-magellan-destination="'+groupID(_this.model())+'" class="medium-1 large-1 columns text-center name" id="'+groupID(_this.model())+'">'+_this.model().label()+'</div>');
        };

        _this.renderItemsIn = function (_items, _list) {
            _.each(_items, function (each) {
                var item = _this.newItem();
                item.item(each);
                item.link().click(function() {
                    _this.announcer().announce(new OnItemClicked(each));
                });
                _list.add(item);
            });
        };

        _this.newExpandItem = function () {
            var expand = _this.newItem();
            expand.html('...');
            return expand;
        };

        _this.newItem = function () {
            return new ItemView(_this.model());
        };

        _this.findItemView = function(item) {
            if (_.isUndefined(list)) return new NullItemView();
            var found = list.children().filter(function(index, each) {
                return $(each).me().item() == item; }).me();
            return _.isUndefined(found) ?  new NullItemView() : found;
        };

        return _this;
    }

    function NullGroupView() {
        var _this = new GroupView();
        _this.findItemView = override(_this, _this.findItemView, function(){
            return new NullItemView();
        });
        return _this;
    }

    function Hint() {
        var _this = new View('<div class="panel radius"></div>');
        var text = new View('<p></p>');

        _this.render = function() {
            new Multiglot().on(text).id('navigation_hint').apply();
            _this.add(text);
        };

        _this.render();

        return _this;
    }

    function AlphabeticalSelector() {
        var _this = new View('<div class="alphabetical-selector"></div>');
        var header;
        var hint;
        var list;
        var model;

        _this.initialize = function() {
            $(document).keydown(function(e) {
                if (_this.closest('.hide').length > 0) return;
                if (_.isUndefined(_this.model())) return;
                var ARROW_UP = 38, ARROW_DOWN = 40;
                switch(e.which) {
                    case ARROW_UP:
                        _this.model().selectPrevious();
                        break;
                    case ARROW_DOWN:
                        _this.model().selectNext();
                        break;
                    default: return;
                }
                e.preventDefault();
            });
        };

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            model.announcer().onSendTo(OnAlphabeticalItemsUpdated, _this.onItemsUpdated, _this);
            model.announcer().onSendTo(OnAlphabeticalItemSelected, _this.onItemSelected, _this);
            model.announcer().onSendTo(OnAlphabeticalItemDeselected, _this.onItemDeselected, _this);
            model.cloud().announcer().onSendTo(OnLabelsCloudAdded, _this.onItemMarked, _this);
            model.cloud().announcer().onSendTo(OnLabelsCloudRemoved, _this.onItemUnmarked, _this);
            _this.render();
        };

        _this.render = function () {
            _this.cleanAll();
            header = new Navigation();
            header.model(_this.model());
            hint = new Hint();
            list = _this.renderGroupList();
            _this.add(header);
            _this.add(hint);
            _this.add(list);
            $(document).foundation('magellan-expedition','reflow');
        };

        _this.renderGroupList = function () {
            var list = new View('<div class="inline-block full-width"></div>');
            _.each(_.filter(_this.model().groups(), function(each) {return each.isNotEmpty()}), function (each) {
                list.add(_this.renderGroup(each));
            });
            return list;
        };

        _this.cleanAll = function () {
            if (!_.isUndefined(list))
                list.children().each(function(index, group) {
                    $(group).me().announcer().unsubscribe(_this);
                });
            _this.empty();
        };

        _this.renderGroup = function (group) {
            var view = new GroupView();
            view.model(group);
            view.announcer().onSendTo(OnItemClicked, _this.onItemClicked,_this);
            return view;
        };

        _this.findGroupView = function (group) {
            if (_.isUndefined(list)) return new NullGroupView();
            var found = list.children().filter(function(index, each) {
                return $(each).me().model() == group }).me();
            return _.isUndefined(found) ?  new NullGroupView() : found;
        };

        _this.findItemView = function (item) {
            return _this.findGroupView(_this.model().groupOf(item)).findItemView(item);
        };

        _this.onItemClicked = function (ann) {
            _this.model().selectItem(ann.item());
        };

        _this.onItemsUpdated = function () {
            _this.render();
        };

        _this.onItemSelected = function (ann) {
            _this.findItemView(ann.item()).select();
        };

        _this.onItemDeselected = function (ann) {
            _this.findItemView(ann.item()).deselect();
        };

        _this.onItemMarked = function (ann) {
            _this.findItemView(ann.item()).mark();
        };

        _this.onItemUnmarked = function (ann) {
            _this.findItemView(ann.item()).unmark();
        };

        _this.initialize();

        return _this;
    }

    return AlphabeticalSelector;

});
