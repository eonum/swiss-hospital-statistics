define([
    'Announcer',
    'announcements/OnAlphabeticalItemSelected',
    'announcements/OnAlphabeticalItemDeselected',
    'announcements/OnAlphabeticalItemsUpdated'
], function(
    Announcer,
    OnAlphabeticalItemSelected,
    OnAlphabeticalItemDeselected,
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
    }

    function AlphabeticalSelectorModel() {
        var _this = this;

        var items = [];
        var selectedItem;
        var nameLogic = function(_item) {return _item.toString();};
        var groups = {};
        var announcer = new Announcer();

        _this.initialize = function () {
            groups = {};
            _.each("abcdefghijklmnopqrstuvwxyz".toUpperCase().split(""),function(each) {
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

        _this.nameLogic = function (_func) {
            nameLogic = _func;
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

        _this.initialize();
    }

    return AlphabeticalSelectorModel;

});