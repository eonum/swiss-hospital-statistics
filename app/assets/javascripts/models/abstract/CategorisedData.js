define([
    'models/abstract/AbstractData',
    'helpers/ServiceProvider',
    'Dictionary'
], function(
    AbstractData,
    ServiceProvider,
    Dictionary){

    /**
     * @param {Number} _year
     * @constructor
     */
    function CategorisedData(_year) {

        var _this = new AbstractData(_year);

        /**
         * @type {Dictionary}
         */
        var categories = new Dictionary();

        /**
         *
         * @returns {Dictionary}
         * @private
         */
        _this._categories = function () {
            return categories;
        };

        /**
         *
         * @returns {Array}
         */
        _this.categories = function () {
            return _this._categories().keys();
        };

        /**
         *
         * @param key
         * @returns {AbstractCategory}
         */
        _this.at = function (key) {
            return _this._categories().get(key);
        };

        /**
         * @param {Array.<{key: String, value: Object}>} obj.categories
         */
        _this.fromJSON = function (obj) {
            for (var i = 0, length = obj.categories.length; i < length; i++) {
                var key = obj.categories[i].key;
                var category = ServiceProvider.categoryBuilder.createCategory(key);
                category.fromJSON(obj.categories[i].value);
                _this._categories().put(key, category);
            }
        };
    }
    return CategorisedData;
});