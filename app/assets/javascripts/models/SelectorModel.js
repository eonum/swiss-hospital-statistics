define([
    'Announcer',
    'announcements/OnDeselected',
    'announcements/OnSelected',
    'announcements/OnSelectionChanged'
], function(
    Announcer,
    OnDeselected,
    OnSelected,
    OnSelectionChanged
){

    function CategoryModel(_holder) {
        var _this = this;
        var items = [];
        var labelLogic = function(item){ return item.toString() };
        var selected = [];
        var name = 'unknown';
        var multipleSelection = false;

        var holder = _holder;
        var announcer = new Announcer();

        _this.announcer = function () {
            return announcer;
        };

        _this.toggle = function(item) {
            if (_this.isSelected(item))
                _this.deselect(item);
            else
                _this.select(item);
        };

        _this.select = function (item) {
            if (_this.isSelected(item)) return;
            item = _this.asArray(item);
            if (!_this.isMultipleSelection())
                _this._deselectAll();
            selected = _this.selected().concat(item);
            _this.notifySelected(item);
            _this.holder().notifyChanged();
        };

        _this.deselectAll = function () {
            if (_.isEmpty(_this.selected())) return;
            _this._deselectAll();
            _this.holder().notifyChanged();
        };

        _this._deselectAll = function () {
            if (_.isEmpty(_this.selected())) return;
            var old = _this.selected();
            selected = [ ];
            _.each(old, _this.notifyDeselected);
        };

        _this.deselect = function (item) {
            if (!_this.isSelected(item)) return;
            item = _this.asArray(item);
            selected = _.difference(_this.selected(),item);
            _this.notifyDeselected(item);
            _this.holder().notifyChanged();
        };

        _this.isSelected = function (item) {
            return _.contains(_this.selected(), item);
        };

        _this.selected = function () {
            return selected;
        };

        _this.items = function (_items) {
            if (_.isUndefined(_items)) return items;
            items = _items;
            return _this;
        };

        _this.isMultipleSelection = function () {
            return multipleSelection;
        };

        _this.beMultiple = function () {
            multipleSelection = true;
            return _this;
        };

        _this.beSingle = function () {
            multipleSelection = false;
            return _this;
        };

        _this.name = function (_name) {
            if (_.isUndefined(_name)) return name;
            name = _name;
            return _this;
        };

        _this.label = function (obj) {
            if (_.isFunction(obj)) {
                labelLogic = obj;
                return _this;
            }
            return labelLogic(obj);
        };

        _this.holder = function() {
            return holder;
        };

        _this.notifySelected = function(item) {
            _this.announcer().announce(new OnSelected(item));
            _this.holder().notifySelected(item);
        };

        _this.notifyDeselected = function(item) {
            _this.announcer().announce(new OnDeselected(item));
            _this.holder().notifyDeselected(item);
        };

        _this.selection = function () {
            var selection = {};
            selection[_this.name()] = _this.selected();
            return selection;
        };

        _this.asArray = function (obj) {
            if (_.isArray(obj)) return obj;
            return [ obj ];
        };
    }

    function SelectorModel() {
        var _this = this;

        var announcer = new Announcer();

        var categories = [];

        _this.announcer = function () {
            return announcer;
        };

        _this.add = function(name) {
            var category = _this.newCategory().name(name);
            _this.categories().push(category);
            return category;
        };

        _this.newCategory = function() {
            return new CategoryModel(_this);
        };

        _this.categories = function () {
            return categories;
        };

        _this.notifySelected = function(item) {
            _this.announcer().announce(new OnSelected(item));
        };

        _this.notifyDeselected = function(item) {
            _this.announcer().announce(new OnDeselected(item));
        };

        _this.notifyChanged = function () {
            _this.announcer().announce(new OnSelectionChanged(_this.selection()));
        };

        _this.selection = function () {
            var selection = {};
            _.each(_this.categories(), function(each){
               selection =  _.extend(selection, each.selection())
            });
            return selection;
        };

        return _this;
    }

    return SelectorModel;
});