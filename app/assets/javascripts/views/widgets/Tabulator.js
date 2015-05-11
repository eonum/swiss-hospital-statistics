define([
    'View',
    'announcements/OnTabulatorAdded',
    'announcements/OnTabulatorSelected',
    'announcements/OnTabulatorDeselected'
], function(
    View,
    OnTabulatorAdded,
    OnTabulatorSelected,
    OnTabulatorDeselected
){

    function Tab() {
        var _this = new View('<div class="fill-width"></div>');

        var duration = 500;
        var model;
        var content;

        _this.model = function (_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            model.tabulator().announcer().onSendTo(OnTabulatorSelected, _this.onSelected, _this);
            model.tabulator().announcer().onSendTo(OnTabulatorDeselected, _this.onDeselected, _this);
        };

        _this.isRendered = function () {
            return !_.isUndefined(_this.content());
        };

        _this.content = function () {
            return content;
        };

        _this.duration = function(number) {
            if (_.isUndefined(number)) return duration;
            duration = number;
            return _this;
        };

        _this.select = function () {
            _this.render();
            _this.fixMagellanSelect();
            _this.show(function(){
                _this.fixMagellanSelect();
            });
        };

        _this.deselect = function () {
            _this.hide(function(){
                _this.fixMagellanDeselect();
            });
        };

        _this.fixMagellanDeselect = function () {
            _this.renameData('magellan-expedition', 'magellan-expedition-backup');
        };

        _this.fixMagellanSelect = function () {
            _this.renameData('magellan-expedition-backup', 'magellan-expedition');
        };

        _this.renameData = function (oldName, newName) {
            var $target = _this.find('[data-'+oldName+']'),
                oldData = $target.data(oldName);
            var attr = {};
            attr['data-'+newName] = oldData;
            $target.removeAttr('data-'+oldName).attr(attr);
        };

        _this.render = function () {
            if (_this.isRendered()) return;
            content = _this.model().render();
            _this.append(content);
        };

        _this.beHidden = function () {
            _this.class('hide');
        };

        _this.beVisible = function () {
            _this.removeClass('hide');
        };

        _this.hide = function(callback) {
            _this.stop(true, true);
            _this.fadeOut(_this.duration(), function(){
                _this.beHidden();
                if (!_.isUndefined(callback)) callback();
            });
        };

        _this.show = function (callback) {
            _this.stop(true, true);
            _this.beVisible();
            _this.fadeOut(0);
            _this.fadeIn(_this.duration(), callback);
        };

        _this.onSelected = function (ann) {
            if (ann.tab() === _this.model())
                _this.select();
        };

        _this.onDeselected = function (ann) {
            if (ann.tab() === _this.model())
                _this.deselect();
        };

        return _this;
    }

    function Tabulator() {
        var _this = new View('<div class="tabulator"></div>');

        var tabs = [];
        var styled = _.identity;
        var model;

        _this.model = function(_model) {
            if (_.isUndefined(_model)) return model;
            model = _model;
            _this.addTabsAll(model.tabs());
            model.announcer().onSendTo(OnTabulatorAdded, _this.onAdded, _this);
            return _this;
        };

        _this.tabs = function () {
            return tabs;
        };

        _this.styled = function(func) {
            styled = func;
            return _this;
        };

        _this.onAdded = function(ann) {
            _this.addTab(ann.tab());
        };

        _this.addTab = function (tabModel) {
            var tab = _this.buildTabFor(tabModel);
            _this.tabs().push(tab);
            _this.add(tab);
            if (!_this.model().isLazy())
                tab.render();
            if (tabModel.isSelected())
                tab.select();
        };

        _this.addTabsAll = function (tabModels) {
            _.each(tabModels, function(each){
                _this.addTab(each);
            });
        };

        _this.buildTabFor = function (tabModel) {
            var tab = _this.newTab();
            tab.model(tabModel);
            tab.beHidden();
            var newTab = styled(tab);
            return _.isUndefined(newTab) ? tab : newTab;
        };

        _this.renderAll = function () {

        };

        _this.newTab = function () {
            return new Tab();
        };

        return _this;
    }

    return Tabulator;

});