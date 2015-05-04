define([], function(){

    function OnIcdYearsSelected(years) {
        var _this = this;

        _this.years = function () {
            return years;
        };
    }

    return OnIcdYearsSelected;

});