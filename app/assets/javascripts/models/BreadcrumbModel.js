define([], function() {

    function Level(breadcrumb) {
        var _this = this;

        var labelLogic = function(){return "Label"};
        var nextLogic = function(){return []};
        var selectedLogic = function(){};

        _this.label = function(_func) {
            labelLogic = _func;
            return _this;
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

        _this.childrenOf = function (entity) {
            return nextLogic(entity);
        };

        _this.end = function() {
            return breadcrumb;
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
            var subentities = _this.children();
            _.each(subentities, function(each){
                var node = new Node();
                _this.addNode(node);
                node.entity(each);
            });
        };

        _this.next = function () {
            return _this.activeNode();
        };

        _this.activeNode = function () {
            return _.first(_this.subnodes());
        };

        _this.hasNext = function () {
            return !_.isEmpty(_this.subnodes());
        }
    }

    function BreadcrumbModel() {
        var _this = this;

        var rootNode;
        var levels = [];

        _this.initialize = function () {
            rootNode = new Node();
            rootNode.breadcrumb(_this);
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

        _this.initialize();
    }

    return BreadcrumbModel;
});