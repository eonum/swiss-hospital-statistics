define([], function() {
    function OnAlphabeticalItemUnmarked(item){
        var _this = this;
        _this.item = function () {
            return item;
        };
    }
    return OnAlphabeticalItemUnmarked;
});