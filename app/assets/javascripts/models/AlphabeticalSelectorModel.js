define([
    'Announcer',
    'announcements/OnAlphabeticalItemSelected',
    'announcements/OnAlphabeticalItemDeselected',
    'announcements/OnAlphabeticalItemMarked',
    'announcements/OnAlphabeticalItemUnmarked',
    'announcements/OnAlphabeticalItemsUpdated'
], function(
    Announcer,
    OnAlphabeticalItemSelected,
    OnAlphabeticalItemDeselected,
    OnAlphabeticalItemMarked,
    OnAlphabeticalItemUnmarked,
    OnAlphabeticalItemsUpdated
) {

    function Group (_selector, _label) {
        var _this = this;

        var selector = _selector;
        var label = _label;
        var isExpanded = false;
        var items = [];

        _this.isEmpty = function () {
            return _.isEmpty(_this.items());
        };

        _this.isNotEmpty = function () {
            return !_this.isEmpty();
        };

        _this.label = function () {
            return label;
        };

        _this.items = function (_items) {
            if (_.isUndefined(_items)) return items;
            items = _items;
        };

        _this.isExpanded = function () {
            return isExpanded;
        };

        _this.selector = function () {
            return selector;
        };

        _this.amountOfGroups = function () {
            return _this.selector().amountOfGroups();
        };
    }

    function AlphabeticalSelectorModel() {
        var _this = this;

        var items = [];
        var selectedItem;
        var markedItems = [];
        var nameLogic = function(_item) {return _item.toString();};
        var rangeLogic = function() { return '0123456789abcdefghijklmnopqrstuvwxyz'.toUpperCase().split("") };
        var prefixLogic = function() { return 'group' };
        var groups = {};
        var timestamp;
        var announcer = new Announcer();

        _this.initialize = function () {
            groups = {};
            _.each(_this.range(),function(each) {
                groups[each] = new Group(_this, each);
            });
        };

        _this.announcer = function () {
            return announcer;
        };

        _this.items = function (_items) {
            if (_.isUndefined(_items)) return items;
            items = _items;
            _this.invalidate();
        };

        _this.name = function (_func) {
            nameLogic = _func;
            return _this;
        };

        _this.timestamp = function() {
            if (_.isUndefined(timestamp))
                timestamp = new Date().getTime();
            return timestamp;
        };

        _this.prefix = function (_func) {
            if (_.isUndefined(_func)) return prefixLogic();
            prefixLogic = _func;
            return _this;
        };

        _this.prefixOf = function (group) {
            return _this.prefix() + group.label();
        };

        _this.range = function (_func) {
            if (_.isUndefined(_func)) return rangeLogic();
            rangeLogic = _func;
        };

        _this.characterRange = function () {
            _this.range(function() {return 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split("")});
            return _this;
        };

        _this.numeralRange = function () {
            _this.range(function() { return '0123456789'.toUpperCase().split("")});
            return _this;
        };

        _this.initializeGroupsFrom = function() {
            _.each(_.groupBy(_this.items(), _this.firstCharacterOf), function(each) {
                _this.groupOf(_.first(each)).items(each);
            });
        };

        _this.groupOf = function(item) {
            return _this.groupAt(_this.firstCharacterOf(item).toUpperCase());
        };

        _this.groupAt = function (character) {
            return _this.groups()[character];
        };

        _this.nameOf = function (_item) {
            return nameLogic(_item);
        };

        _this.firstCharacterOf = function (_item) {
            return _this.nameOf(_item).charAt(0);
        };

        _this.groups = function () {
            return groups;
        };

        _this.selectItem = function(item) {
            _this.deselectItem();
            selectedItem = item;
            _this.notifyItemSelected(item);
        };

        _this.deselectItem = function () {
            if (!_this.isItemSelected()) return;
            var wasSelected = _this.selectedItem();
            selectedItem = null;
            _this.notifyItemDeselected(wasSelected);
        };

        _this.selectedItem = function () {
            return selectedItem;
        };

        _this.isItemSelected = function (item) {
            if (_.isUndefined(item))
                return !_.isUndefined(_this.selectedItem());
            return _this.selectedItem() === item;
        };

        _this.invalidate = function () {
            _this.initialize();
            _this.initializeGroupsFrom();
            _this.notifyItemsUpdated();
        };

        _this.notifyItemsUpdated = function () {
            _this.announcer().announce(new OnAlphabeticalItemsUpdated());
        };

        _this.notifyItemSelected = function(item) {
            _this.announcer().announce(new OnAlphabeticalItemSelected(item));
        };

        _this.notifyItemDeselected = function(item) {
            _this.announcer().announce(new OnAlphabeticalItemDeselected(item));
        };

        _this.notifyItemMarked = function(item) {
            _this.announcer().announce(new OnAlphabeticalItemMarked(item));
        };

        _this.notifyItemMarked = function(item) {
            _this.announcer().announce(new OnAlphabeticalItemMarked(item));
        };

        _this.notifyItemUnmarked = function(item) {
            _this.announcer().announce(new OnAlphabeticalItemUnmarked(item));
        };

        _this.amountOfGroups = function () {
            return _.size(_.filter(_this.groups(), function(each) {return each.isNotEmpty()}));
        };

        _this.selectFirst = function () {
            _this.selectItem(_.first(_this.items()));
        };

        _this.selectLast = function() {
            _this.selectItem(_.last(_this.items()));
        };

        _this.indexOf = function(item) {
            return _.indexOf(_this.items(), item);
        };

        _this.selectNext = function () {
            if (_.isEmpty(_this.items())) return;
            if (!_this.isItemSelected())
                return _this.selectFirst();
            var index = _this.indexOf(_this.selectedItem());
            if (index === -1) return _this.selectFirst();
            if (index + 1 < _.size(_this.items()))
                return _this.selectItem(_this.items()[index + 1]);
            _this.selectFirst();
        };

        _this.selectPrevious = function () {
            if (_.isEmpty(_this.items())) return;
            if (!_this.isItemSelected())
                return _this.selectLast();
            var index = _this.indexOf(_this.selectedItem());
            if (index === -1) return _this.selectLast();
            if (index - 1 >= 0)
                return _this.selectItem(_this.items()[index - 1]);
            _this.selectLast();
        };

        _this.markedItems = function () {
            return markedItems;
        };

        _this.markItem = function (item) {
            if (_this.isMarked(item)) return;
            _this.markedItems().push(item);
            _this.notifyItemMarked(item);
        };

        _this.unmarkItem = function(item) {
            if (!_this.isMarked(item)) return;
            markedItems = _.without(_this.markedItems(), item);
            _this.notifyItemUnmarked(item);
        };

        _this.toggleMark = function(item) {
            console.log('mark item');
            if (_this.isMarked(item))
                _this.unmarkItem(item);
            else
                _this.markItem(item);
        };

        _this.unmarkAll = function () {
            var marked = _.flatten(_this.markedItems());
            markedItems = [];
            _.each(marked, function(each){_this.notifyItemUnmarked(each)});
        };

        _this.isMarked = function(item) {
            return _.indexOf(_this.markedItems(), item) >= 0;
        };

        _this.initialize();
    }

    return AlphabeticalSelectorModel;

});