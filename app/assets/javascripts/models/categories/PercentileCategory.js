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
         * @returns {string}
         */
        _this.name = function () {
            return 'Percentile category';
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

        /**
         * @type {Object}
         */
        _this.asJSON = override(_this, _this.asJSON, function(){
            return _.extend(this.super(), {
                percentile : _this.percentile(),
                amount : _this.amount()
            });
        });

        return _this;
    }

    PercentileCategory.ID = 'percentile';
    return PercentileCategory;

});