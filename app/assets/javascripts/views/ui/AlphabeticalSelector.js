define([
    'View'
], function(
    View
) {

    function GroupView () {
        var _this = new View('<div class="row left"></div>');
        var name = new View('<div class="medium-1 large-1 columns"></div>');
        var content = new View ('<div class="medium-11 large-11 columns"></div>');
        var list = new View ('<ul class="no-bullet"></ul>');

        var model;

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.render();
        };

        _this.render = function () {
            name.html(_this.model().label());
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

        _this.renderItemsIn = function (_items, _list) {
            _.each(_items, function (each) {
                var item = _this.newItem();
                item.html(_this.model().selector().nameOf(each));
                _list.add(item);
            });
        };

        _this.newExpandItem = function () {
            var expand = _this.newItem();
            expand.html('...');
            return expand;
        };

        _this.newItem = function () {
            return new View('<li></li>')
        };

        return _this;
    }

    function AlphabeticalSelector() {
        var _this = new View('<div></div>');
        var header;
        var list;
        var model;

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.render();
        };

        _this.render = function () {
            header = _this.renderCharacterList();
            list = _this.renderGroupList();
            _this.add(header);
            _this.add(list);
        };

        _this.renderCharacterList = function () {
            var list = _this.newCharacterList();
            _.each(_this.model().groups(), function (group) {
                var item = _this.newCharacterListItem();
                item.find('a').text(group.label());
                list.add(item);
            });
            return list;
        };

        _this.renderGroupList = function () {
            var list = new View('<div></div>');
            _.each(_.filter(_this.model().groups(), function(each) {return each.isNotEmpty()}), function (each) {
                list.add(_this.renderGroup(each));
            });
            return list;
        };

        _this.renderGroup = function (group) {
            var view = new GroupView();
            view.model(group);
            return view;
        };

        _this.newCharacterList = function () {
            return new View('<ul class="inline-list"></ul>');
        };

        _this.newCharacterListItem = function () {
            return new View('<li><a></a></li>')
        };

        return _this;
    }

    return AlphabeticalSelector;

});