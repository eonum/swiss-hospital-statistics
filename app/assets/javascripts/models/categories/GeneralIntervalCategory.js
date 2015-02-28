define([
    'models/abstract/IntervalCategory'
], function(
    IntervalCategory
){

    function GeneralIntervalCategory() {
        var _this = new IntervalCategory();

        /**
         * @type {Number}
         */
        var dad;
        /**
         * @type {Number}
         */
        var sa;
        /**
         * @type {Number}
         */
        var min;
        /**
         * @type {Number}
         */
        var max;

        /**
         * @param {Number} obj.dad
         * @param {Number} obj.sa
         * @param {Number} obj.min
         * @param {Number} obj.max
         */
        _this.fromJSON = override(_this, _this.fromJSON, function(obj){
            this.super(obj);
            dad = obj.dad;
            sa = obj.sa;
            min = obj.min;
            max = obj.max;
        });
    }

    GeneralIntervalCategory.ID = 'interval.general';
    return GeneralIntervalCategory;

});