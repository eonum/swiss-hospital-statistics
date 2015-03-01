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
         * @returns {Number}
         */
        _this.dad = function () {
            return dad;
        };

        /**
         * @returns {Number}
         */
        _this.sa = function () {
            return sa;
        };

        /**
         * @returns {Number}
         */
        _this.min = function () {
            return min;
        };

        /**
         * @returns {Number}
         */
        _this.max = function () {
            return max;
        };

        /**
         * @returns {string}
         */
        _this.name = function () {
            return 'General interval category';
        };

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

        /**
         * @type {Object}
         */
        _this.asJSON = override(_this, _this.asJSON, function(){
           return _.extend(this.super(), {
               dad : _this.dad(),
               sa : _this.sa(),
               min : _this.min(),
               max : _this.max()
           });
        });

        return _this;
    }

    GeneralIntervalCategory.ID = 'interval';
    return GeneralIntervalCategory;

});