define(['Dictionary'], function(Dictionary){
    /**
     * @class CategoryBuilder
     * @constructor
     */
    function CategoryBuilder(){
        var _this = this;

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
         * @param {String} id
         * @param {AbstractCategory} category
         */
        _this.registerCategory = function (id, category) {
            _this._categories().put(id, category);
        };

        /**
         * @param {String} id
         */
        _this.createCategory = function (id) {
            var category = _this._categories().get(id);
            return new category();
        };
    }

    return CategoryBuilder;
});