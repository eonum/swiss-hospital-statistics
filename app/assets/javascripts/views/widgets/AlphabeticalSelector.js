define([
    'View',
    'Announcer',
    'announcements/OnAlphabeticalItemsUpdated',
    'announcements/OnAlphabeticalItemSelected',
    'announcements/OnAlphabeticalItemDeselected'
], function(
    View,
    Announcer,
    OnAlphabeticalItemsUpdated,
    OnAlphabeticalItemSelected,
    OnAlphabeticalItemDeselected
) {

    var groupID = function(group) {
        return 'group'+group.label();
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
            return new View('<dd data-magellan-arrival="'+groupID(group)+'"><a href="#'+groupID(group)+'">'+group.label()+'</a></dd>');
        };

        return _this;
    }

    function ItemView(_group) {
        var _this = new View('<li></li>');
        var link = new View('<a></a>');

        var item;
        var group = _group;

        _this.item = function (_item) {
            if (_.isUndefined(_item)) return item;
            item = _item;
            _this.render();
        };

        _this.group = function () {
            return group;
        };

        _this.render = function () {
            link.text(_this.group().selector().nameOf(_this.item()));
            _this.add(link);
        };

        _this.select = function () {
            _this.class('selected');
        };

        _this.deselect = function () {
            _this.removeClass('selected');
        };

        return _this;
    }

    function GroupView () {
        var _this = new View('<div class="row left" style="width: 100%"></div>');
        var name;
        var content = new View ('<div class="medium-11 large-11 columns"></div>');
        var list = new View ('<ul class="no-bullet"></ul>');
        var announcer = new Announcer();

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
            if (_.size(_this.model().items()) > 4) {
                _this.renderItemsIn(_.first(_this.model().items(),2), list);
                list.add(_this.newExpandItem());
                _this.renderItemsIn(_.last(_this.model().items(),2), list);
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
                item.click(function() {
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
            if (!_.isUndefined(list))
                return list.children().filter(function(index, each) {
                    return $(each).me().item() == item;
                }).me();
        };

        return _this;
    }

    function AlphabeticalSelector() {
        var _this = new View('<div class="alphabetical-selector"></div>');
        var header;
        var list;
        var model;

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            model.announcer().onSendTo(OnAlphabeticalItemsUpdated, _this.onItemsUpdated, _this);
            model.announcer().onSendTo(OnAlphabeticalItemSelected, _this.onItemSelected, _this);
            model.announcer().onSendTo(OnAlphabeticalItemDeselected, _this.onItemDeselected, _this);
            _this.render();
        };

        _this.render = function () {
            _this.cleanAll();
            header = new Navigation();
            header.model(_this.model());
            list = _this.renderGroupList();
            _this.add(header);
            _this.add(list);
            $(document).foundation();
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
            if (!_.isUndefined(list))
               return list.children().filter(function(index, each) {
                    return $(each).me().model() == group
                }).me();
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

        return _this;
    }

    return AlphabeticalSelector;

});
