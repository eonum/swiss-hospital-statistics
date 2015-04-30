define([], function(){
    function OnBreadcrumbSelected(node) {
        var _this = this;

        _this.node = function () {
            return node;
        };
    }
    return OnBreadcrumbSelected;
});