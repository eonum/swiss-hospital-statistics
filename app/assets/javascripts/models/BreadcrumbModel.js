define([
    'Announcer',
    'announcements/OnBreadcrumbSelected'
], function(
    Announcer,
    OnBreadcrumbSelected
) {

    function Level(breadcrumb) {
        var _this = this;

        var labelLogic = function(){return 'Label'};
        var nextLogic = function(){return []};
        var selectedLogic = function(){};
        var defaultChild;
        var defaultLabel = function(){return 'Default'};
        var defaultSelect = function() {};
        var hintText = function () {return ''};
        var isLast = false;

        _this.label = function(_func) {
            labelLogic = _func;
            return _this;
        };

        _this.beLast = function () {
            isLast = true;
            return _this;
        };

        _this.isLast = function () {
            return isLast
        };

        _this.next = function (_func) {
            nextLogic = _func;
            return _this;
        };

        _this.select = function (_func) {
            selectedLogic = _func;
            return _this;
        };

        _this.labelOf = function (entity) {
            return labelLogic(entity);
        };

        _this.hintOf = function(entity) {
            return hintText(entity);
        };

        _this.hint = function (func) {
            hintText = func;
            return _this;
        };

        /**
         * @param entity
         */
        _this.childrenOf = function (entity) {
            return _.compact(_.flatten(_.map(_.flatten([entity]), nextLogic)));
        };

        _this.end = function() {
            return breadcrumb;
        };

        _this.hasDefault = function () {
            return !_.isUndefined(defaultChild);
        };

        _this.nextDefault = function (_func) {
            defaultChild = _func;
            return _this;
        };

        _this.sameDefault = function(){
            defaultChild = nextLogic;
            return _this;
        };

        _this.defaultChildOf = function (entity) {
            return _.compact(_.flatten(_.map(_.flatten([entity]), defaultChild)));
        };

        _this.defaultLabel = function(_func) {
            defaultLabel = _func;
            return _this;
        };

        _this.defaultLabelOf = function(entity) {
            return defaultLabel(entity);
        };

        _this.defaultSelect = function(_func) {
            defaultSelect = _func;
            return _this;
        };

        _this.onSelected = function (node) {
            selectedLogic(node);
        };

        _this.onDefaultSelected = function(node) {
            defaultSelect(node);
        };
    }

    function Node () {
        var _this = this;
        var parent;
        var subnodes = [];
        var breadcrumb;
        var entity;

        _this.parent = function (_node) {
            if (_.isUndefined(_node)) return parent;
            parent = _node;
            breadcrumb = _node.breadcrumb();
            return _this;
        };

        _this.addNode = function (node) {
            _this.subnodes().push(node);
            node.parent(_this);
        };

        _this.subnodes = function () {
            return subnodes;
        };

        _this.entity = function (_entity) {
            if (_.isUndefined(_entity)) return entity;
            entity = _entity;
            _this.invalidate();
        };

        _this.hasParent = function () {
            return !_.isUndefined(_this.parent());
        };

        _this.depth = function () {
            if (!_this.hasParent()) return 0;
            return _this.parent().depth() + 1;
        };

        _this.label = function () {
            return _this.level().labelOf(_this.entity());
        };

        _this.hint = function () {
            return _this.level().hintOf(_this.entity());
        };

        _this.level = function () {
            return _this.breadcrumb().levelAt(_this.depth());
        };

        _this.children = function () {
            return _this.level().childrenOf(_this.entity());
        };

        _this.breadcrumb = function(_breadcrumb) {
            if (_.isUndefined(_breadcrumb)) return breadcrumb;
            breadcrumb = _breadcrumb;
        };

        _this.invalidate = function () {
            subnodes = [];
            _this.initializeDefaultIn();
            var subentities = _this.children();
            _.each(subentities, function(each){
                var node = new Node();
                _this.addNode(node);
                node.entity(each);
            });
        };

        _this.initializeDefaultIn = function () {
            if(!_this.level().hasDefault()) return;
            var node = new DefaultNode();
            _this.addNode(node);
            node.entity(_this.level().defaultChildOf(_this.entity()));
        };

        _this.hasNext = function () {
            return !_.isEmpty(_this.subnodes()) && !_this.level().isLast();
        };

        _this.alternatives = function () {
            if (!_this.hasParent()) return [];
            return _this.parent().subnodes();
        };

        _this.hasAlternatives = function () {
            return !_.isEmpty(_this.alternatives());
        };

        _this.path = function () {
            if (!_this.hasParent()) return [ _this];
            return _.union(_this.parent().path(), [_this]);
        };

        _this.deepest = function () {
            if (!_this.hasNext()) return _this;
            var next = _.first(_this.subnodes());
            if (!next.isDefault()) return _this;
            return next.deepest();
        };

        _this.isDefault = function () {
            return false;
        };

        /**
         * @param {boolean} [force=false]
         */
        _this.select = function (force) {
            force = _.isUndefined(force) ? false : force;
            if (!force) _this.virtuallySelect();
            if (!force && _this.isSelected()) return;
            _this.breadcrumb().select(_this);
        };

        _this.isSelected = function () {
            return _.contains(_this.breadcrumb().selected().path(), _this);
        };

        _this.virtuallySelect = function () {
            _.each(_this.deepest().path(), function(node){
                if (node.isDefault()) _this.level().onDefaultSelected(node);
                else _this.level().onSelected(node);
            });
        };
    }

    function DefaultNode () {
        var _this = new Node();

        _this.label = function () {
            return _this.level().defaultLabelOf(_this.entity());
        };

        _this.isDefault = function () {
            return true;
        };

        return _this;
    }

    function BreadcrumbModel() {
        var _this = this;

        var announcer = new Announcer();
        var rootNode;
        var levels = [];
        var selectedNode;

        _this.initialize = function () {
            rootNode = new Node();
            rootNode.breadcrumb(_this);
        };

        _this.announcer = function () {
            return announcer;
        };

        _this.root = function () {
            return rootNode;
        };

        _this.on = function (entity) {
            _this.root().entity(entity);
        };

        _this.levelAt = function (level) {
            if (level >= _this.levels().length) return new Level(_this);
            return _this.levels()[level];
        };

        _this.level = function () {
            var level = new Level(_this);
            _this.levels().push(level);
            return level;
        };

        _this.levels = function () {
            return levels;
        };

        _this.entity = function () {
            return _this.root().entity();
        };

        _this.selected = function() {
            if (!_.isUndefined(selectedNode)) return selectedNode;
            return _this.root().deepest();
        };

        _this.select = function (node) {
            selectedNode = node.deepest();
            _this.notifySelected(_this.selected());
        };

        _this.notifySelected = function (node) {
            var level = node.level();
            _this.announcer().announce(new OnBreadcrumbSelected(node));
        };

        _this.initialize();
    }

    return BreadcrumbModel;
});