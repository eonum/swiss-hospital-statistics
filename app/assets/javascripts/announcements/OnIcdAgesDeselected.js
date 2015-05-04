define([], function(){

    function OnIcdAgesDeselected(ages) {
        var _this = this;

        _this.ages = function () {
            return ages;
        };
    }

    return OnIcdAgesDeselected;
});