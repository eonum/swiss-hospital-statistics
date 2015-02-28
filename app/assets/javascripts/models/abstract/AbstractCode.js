define([
    'models/abstract/AbstractData',
    'Dictionary'
], function(
    AbstractData,
    Dictionary){
    /**
     * @constructor
     * @class AbstractCode
     * @module AbstractCode
     */
    function AbstractCode() {
        var _this = this;

        /**
         * @type {String}
         */
        var code;
        /**
         * @type {String|Object}
         */
        var description;
        /**
         * @type {Dictionary}
         */
        var years = new Dictionary();

        /**
         * @returns {String}
         */
        _this.code = function () {
            return code;
        };

        /**
         * @returns {String|Object}
         */
        _this.description = function () {
            return description;
        };

        /**
         * @returns {Dictionary}
         * @private
         */
        _this._years = function() {
            return years;
        };

        /**
         *
         * @param year
         * @returns {AbstractData}
         */
        _this.at = function (year) {
            return _this._years().get(year);
        };

        /**
         * @returns {Array.<Number>}
         */
        _this.years = function () {
            return _this._years().keys();
        };

        /**
         * @param {Number} year
         * @returns {AbstractData}
         */
        _this.newData = function (year) {
            return new AbstractData(year);
        };

        /**
         *
         * @param {String} obj.code
         * @param {String|Object} obj.description
         * @param {Array.<{key:number, value:Object}>} obj.years
         */
        _this.fromJSON = function (obj) {
            code = obj.code;
            description = obj.description;
            for (var i = 0, length = obj.years.length; i < length; i++) {
                var year = obj.years[i].key;
                var data = _this.newData(year);
                data.fromJSON(obj.years[i].value);
                _this._years().add(year, data);
            }
        };
    }
    return AbstractCode;
});