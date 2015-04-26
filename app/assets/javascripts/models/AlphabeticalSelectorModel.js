define([
    'Announcer',
    'announcements/OnAlphabeticalItemSelected',
    'announcements/OnAlphabeticalItemsUpdated'
    ],
    function(
        Announcer,
        OnAlphabeticalItemSelected,
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
                _this.groupAt(_this.firstCharacterOf(_.first(each)).toUpperCase()).items(each);
            });
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
            _this.announcer().announce(new OnAlphabeticalItemSelected(item));
        };

        _this.invalidate = function () {
            _this.initialize();
            _this.initializeGroupsFrom();
            _this.notifyItemsUpdated();
        };

        _this.notifyItemsUpdated = function () {
            _this.announcer().announce(new OnAlphabeticalItemsUpdated());
        };

        _this.initialize();
    }

    return AlphabeticalSelectorModel;

});