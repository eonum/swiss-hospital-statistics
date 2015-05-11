define([], function(){

    function OnDeselected(item) {
        var _this = this;

        _this.item = function () {
            return item;
        };
    }

    return OnDeselected;
});