define([], function() {
    function OnAlphabeticalItemDeselected(item){
        var _this = this;
        _this.item = function () {
            return item;
        };
    }
    return OnAlphabeticalItemDeselected;
});