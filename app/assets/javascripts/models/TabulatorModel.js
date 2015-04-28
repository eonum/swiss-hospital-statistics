define([
    'Announcer',
    'announcements/OnTabulatorAdded',
    'announcements/OnTabulatorSelected',
    'announcements/OnTabulatorDeselected'
], function(
    Announcer,
    OnTabulatorAdded,
    OnTabulatorSelected,
    OnTabulatorDeselected
){
    function Tab(tabulator) {
        var _this = this;

        var name = "Tab";
        var renderingLogic = function () {return $('<div></div>')};

        _this.name = function(string) {
            if (_.isUndefined(string)) return name;
            name = string;
        };

        _this.tabulator = function() {
            return tabulator;
        };

        _this.render = function (_renderingLogic) {
            if (_.isUndefined(_renderingLogic)) return renderingLogic();
            renderingLogic = _renderingLogic;
            return _this;
        };

        _this.select = function () {
            if (_this.isSelected()) return _this;
            _this.tabulator().selectTab(_this);
            return _this;
        };

        _this.deselect = function () {
            if (!_this.isSelected()) return _this;
            _this.tabulator().deselectTab(_this);
            return _this;
        };

        _this.isSelected = function () {
            if (_.isUndefined(_this.tabulator()))
                return false;
            return _this.tabulator().isTabSelected(_this);
        };
    }

    function TabulatorModel() {
        var _this = this;

        var announcer = new Announcer();
        var tabs = [];
        var selectedTab;

        _this.announcer = function() {
            return announcer;
        };

        _this.tabs = function() {
            return tabs;
        };

        _this.add = function(tab) {
            _this.tabs().push(tab);
            _this.notifyAdded(tab);
        };

        _this.addTab = function (name) {
            var tab = _this.newTab();
            tab.name(name);
            _this.add(tab);
            return tab;
        };

        _this.newTab = function () {
            return new Tab(_this);
        };

        _this.selectTab = function(tab) {
            _this.deselectTab();
            selectedTab = tab;
            _this.notifySelected(tab);
        };

        _this.selectTabAt = function (index) {
            _this.tabAt(index).select();
        };

        _this.deselectTab = function () {
            if (!_this.isTabSelected()) return;
            var wasSelected = _this.selectedTab();
            selectedTab = null;
            _this.notifyDeselected(wasSelected);
        };

        _this.selectedTab = function () {
            return selectedTab;
        };

        _this.isTabSelected = function (tab) {
            if (_.isUndefined(tab))
                return !_.isUndefined(_this.selectedTab());
            return _this.selectedTab() === tab;
        };

        _this.tabAt = function(index) {
            return _this.tabs()[index];
        };

        _this.notifySelected = function (tab) {
            _this.announcer().announce(new OnTabulatorSelected(tab));
        };

        _this.notifyDeselected = function (tab) {
            _this.announcer().announce(new OnTabulatorDeselected(tab));
        };

        _this.notifyAdded = function(tab) {
            _this.announcer().announce(new OnTabulatorAdded(tab));
        };
    }

    return TabulatorModel;

});