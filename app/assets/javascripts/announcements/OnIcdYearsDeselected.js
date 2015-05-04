define([], function(){

    function OnIcdYearsDeselected(years) {
        var _this = this;

        _this.years = function () {
            return years;
        };
    }

    return OnIcdYearsDeselected;
});