define([], function() {
    function OnAlphabeticalItemMarked(item){
        var _this = this;
        _this.item = function () {
            return item;
        };
    }
    return OnAlphabeticalItemMarked;
});