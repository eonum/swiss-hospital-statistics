define([], function(){

    function OnIcdAgesSelected(ages) {
        var _this = this;

        _this.ages = function () {
            return ages;
        };
    }

    return OnIcdAgesSelected;
});