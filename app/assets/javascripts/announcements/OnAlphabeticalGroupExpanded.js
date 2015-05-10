define([], function() {
    function OnAlphabeticalGroupExpanded(group){
        var _this = this;
        _this.group = function () {
            return group;
        };
    }
    return OnAlphabeticalGroupExpanded;
});