define([], function() {
    function OnAlphabeticalGroupCollapsed(group){
        var _this = this;
        _this.group = function () {
            return group;
        };
    }
    return OnAlphabeticalGroupCollapsed;
});