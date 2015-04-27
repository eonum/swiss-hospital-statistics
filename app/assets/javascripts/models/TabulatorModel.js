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

        _this.name = function() {
            return name;
        };

        _this.tabulator = function() {
            return tabulator;
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

        _this.selectTab = function(tab) {
            _this.deselectItem();
            selectedTab = tab;
            _this.notifySelected(tab);
        };

        _this.deselectTab = function () {
            if (!_this.isTabSelected()) return;
            var wasSelected = _this.selectedTab();
            selectedTab = null;
            _this.notifyItemDeselected(wasSelected);
        };

        _this.selectedTab = function () {
            return selectedTab;
        };

        _this.isTabSelected = function (tab) {
            if (_.isUndefined(tab))
                return !_.isUndefined(_this.selectedTab());
            return _this.selectedTab() === tab;
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