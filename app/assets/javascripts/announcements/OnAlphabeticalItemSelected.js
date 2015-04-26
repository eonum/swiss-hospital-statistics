define([], function() {
    function OnAlphabeticalItemSelected(item){
        var _this = this;
        _this.item = function () {
            return item;
        };
    }
    return OnAlphabeticalItemSelected;
});