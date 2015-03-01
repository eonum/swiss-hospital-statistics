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
         * @returns {Number}
         */
        _this.amount = function () {
            return n;
        };

        /**
         * @returns {string}
         */
        _this.name = function () {
            return 'Interval category';
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

        /**
         * @type {Object}
         */
        _this.asJSON = override(_this, _this.asJSON, function(){
            return _.extend(this.super(), {
                interval : _this.interval().asJSON(),
                n : _this.amount()
            });
        });

        return _this;
    }
    return IntervalCategory;

});