define([
    'models/abstract/AbstractData',
    'Dictionary'
], function(
    AbstractData,
    Dictionary){
    /**
     * @constructor
     * @class AbstractCode
     * @module AbstractDataset
     */
    function AbstractDataset() {
        var _this = this;

        /** @type {String} */
        var code;
        /** @type {String|Object} */
        var description;
        /** @type {Dictionary} */
        var years = new Dictionary();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Abstract Code';
        };

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
         * @param {String} obj.code
         * @param {String|Object} obj.description
         * @param {Array.<{key:number, value:Object}>} obj.years
         */
        _this.fromJSON = function (obj) {
            code = obj.code;
            description = obj.description;

            if (!_.has(obj, 'years')) return;
            _.mapObject(obj.years, function(each){
                var year = each.year;
                var data = _this.newData(year);
                data.fromJSON(each);
                _this._years().put(year, data);
            });
        };

        /**
         * @returns {boolean}
         */
        _this.isLoaded = function () {
            return !_.isEmpty(_this.years());
        };

        /**
         * @returns {{code: String, description: (String|Object), years: Array.<{year: Number}>}}
         */
        _this.asJSON = function () {
            return {
                name : _this.name(),
                code : _this.code(),
                description : _this.description(),
                years : _.map(_this._years().elements(), function(each){ return each.asJSON() }) }
        };

        /**
         * @returns {String}
         */
        _this.toString = function () {
            return JSON.stringify(_this.asJSON());
        };
    }

    /**
     * @param {String} _description
     * @returns {String}
     */
    AbstractDataset.prototype.typeDescription = function (_description) {
        if (_.isUndefined(_description)) return AbstractDataset.prototype._description;
        AbstractDataset.prototype._description = _description;
        return _description;
    };

    return AbstractDataset;
});