define([], function(){

    function OnSelected(item) {
        var _this = this;

        _this.item = function () {
            return item;
        };
    }

    return OnSelected;
});