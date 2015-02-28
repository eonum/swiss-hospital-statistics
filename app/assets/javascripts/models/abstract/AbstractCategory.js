define([
    'helpers/ServiceProvider',
    'Dictionary'
], function (
        ServiceProvider,
        Dictionary){

    /**
     * @constructor
     * @class AbstractCategory
     */
    function AbstractCategory() {
        var _this = this;

        var categories = new Dictionary();

        /**
         * @returns {Dictionary}
         * @private
         */
        _this._categories = function () {
            return categories;
        };

        /**
         * @returns {Array}
         */
        _this.categories = function () {
            return _this._categories().keys();
        };

        /**
         * @param {Object} key
         * @returns {AbstractCategory}
         */
        _this.at = function (key) {
            return _this._categories().get(key);
        };

        /**
         *
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
    return AbstractCategory;

});