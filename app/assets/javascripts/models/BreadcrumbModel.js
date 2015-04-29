define([], function() {

    function Node () {
        var _this = this;
        var parent;
        var subnodes = [];
        var breadcrumb;
        var entity;
        var childrenLogic = function () {return []};

        _this.parent = function (_node) {
            if (_.isUndefined(_node)) return parent;
            parent = _node;
            return _this;
        };

        _this.addNode = function (node) {
            _this.subnodes().push(node);
            node.parent(_this);
        };

        _this.subnodes = function () {
            return subnodes;
        };

        _this.childrenOf = function () {
            return childrenLogic(_this.entity());
        };

        _this.entity = function () {
            return entity;
        };


    }

    function BreadcrumbModel() {
        var _this = this;

        var steps = [];
        var selectedStep;

        _this.selectedStep = function () {
            return selectedStep;
        };

        _this.steps = function () {
            return steps;
        };
    }

    return BreadcrumbModel;
});