define([
    'models/abstract/IntervalCategory'
], function(
    IntervalCategory
){

    function ValueIntervalCategory() {
        var _this = new IntervalCategory();

        /**
         * @returns {string}
         */
        _this.name = function () {
            return 'Value interval category';
        };

        return _this;
    }

    ValueIntervalCategory.ID = 'valueInterval';
    return ValueIntervalCategory;

});