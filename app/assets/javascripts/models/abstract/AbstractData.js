define([], function(){
    /**
     *
     * @param {Number} _year
     * @constructor
     * @class AbstractData
     */
    function AbstractData(_year) {
        var _this = this;

        /**
         * @type {Number}
         */
        var year = _year;

        /**
         * A year, data of which I hold
         * @returns {Number}
         */
        _this.year = function () {
            return year;
        };

        /**
         * @param obj
         */
        _this.fromJSON = function (obj) {

        };

        /**
         * @returns {{year: Number}}
         */
        _this.asJSON = function () {
            return {
                year : _this.year()
            };
        };
    }
    return AbstractData;
});