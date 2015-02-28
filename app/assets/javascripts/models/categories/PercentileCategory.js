define([
    'models/abstract/AbstractCategory'
],function(
    AbstractCategory
){

    function PercentileCategory() {
        var _this = new AbstractCategory();

        /**
         * @type {Number}
         */
        var percentile;
        /**
         * @type {Number}
         */
        var amount;

        /**
         * @returns {Number}
         */
        _this.percentile = function () {
            return percentile;
        };

        /**
         * @returns {Number}
         */
        _this.amount = function () {
            return amount;
        };

        /**
         * @param {Number} obj.percentile
         * @param {Number} obj.amount
         */
        _this.fromJSON = override(_this, _this.fromJSON, function(obj){
            this.super(obj);
            percentile = obj.percentile;
            amount = obj.amount;
        });

        return _this;
    }

    PercentileCategory.ID = 'percentile';
    return PercentileCategory;

});