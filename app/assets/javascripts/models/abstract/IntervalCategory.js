define([
    'models/abstract/AbstractCategory',
    'models/Interval'
], function (
    AbstractCategory,
    Interval) {

    function IntervalCategory() {
        var _this = new AbstractCategory();

        /**
         * @type {Interval}
         */
        var interval;

        /**
         * @type {Number}
         */
        var n;

        /**
         * @returns {Interval}
         */
        _this.interval = function () {
            return interval;
        };

        /**
         * @see {@link AbstractCategory.fromJSON}
         * @param {Number} obj.n
         * @param {Object} obj.interval
         * @param {Number} obj.interval.from
         * @param {Number} obj.interval.to
         */
        _this.fromJSON = override(_this, _this.fromJSON, function(obj){
            this.super(obj);
            interval = Interval.fromJSON(obj.interval);
            n = obj.n;
        });

        return _this;
    }
    return IntervalCategory;

});