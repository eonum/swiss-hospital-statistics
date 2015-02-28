define([], function() {
    /**
     * Represents single interval defined by
     * to number values: from and to. From parameter
     * is mandatory, while to is optional. In case
     * to is not set interval will be infinite.
     * @param _from - start of interval
     * @param _to - (optional) - end of interval
     * @constructor - creates an infinite or finite
     *  Interval depending on passed parameters
     *  @class Interval
     *  @exports Interval
     *  @module Interval
     */
    function Interval(_from, _to) {
        var _this = this;
        var from = _from;
        var to = _to || Number.POSITIVE_INFINITY;

        /**
         * First value (start) of Interval
         * @returns {Number} - a number
         * representing start of interval
         */
        _this.from = function () {
            return from;
        };

        /**
         * Last value (end) of Interval
         * @returns {Number} - a number
         * representing end of interval
         */
        _this.to = function () {
            return to;
        };

        /**
         * Returns interval duration or Infinity
         * if interval has no end
         * @returns {Number} - an interval
         *                  duration
         */
        _this.duration = function () {
            return _this.to() - _this.from();
        };

        /**
         * @returns {boolean}
         *    - true if interval is infinite
         *    - false if interval is finite
         */
        _this.isInfinite = function () {
            return _this.to() == Number.POSITIVE_INFINITY;
        };

        _this.toString = function () {
            return _this.from()+'-';
        };
    }

    /**
     *
     * @param {Number} obj.from
     * @param {Number} obj.to
     */
    Interval.fromJSON = function (obj) {
        return new Interval(obj.from, obj.to);
    };

    return Interval;
});