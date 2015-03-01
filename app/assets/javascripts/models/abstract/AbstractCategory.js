define([
    'Dictionary'
], function (
        Dictionary
){

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
         * @returns {Array.<AbstractCategory>}
         */
        _this.at = function (key) {
            if (!_this._categories().isKeyExists(key))
                return _this._categories().put(key, [ ]);
            return _this._categories().get(key);
        };

        /**
         * @returns {string}
         */
        _this.name = function () {
            return 'Abstract category';
        };

        /**
         *
         * @param {Array.<{key: String, value: Object}>} obj.categories
         */
        _this.fromJSON = function (obj) {
            if (!_.has(obj, 'categories')) return;
            _.each(obj.categories, function(category){
                _.each(_.intersection(_.keys(category), ServiceProvider.categoryBuilder.ids()), function(each){
                    _.each (category[each], function(categoryElement){
                        var code = ServiceProvider.categoryBuilder.instantiate(each);
                        code.fromJSON(categoryElement);
                        _this.at(each).push(code);
                    });
                });
            });
        };

        /**
         * @returns {{categories: *}}
         */
        _this.asJSON = function () {
            return {
                name: _this.name(),
                categories: _.map(_this._categories().asObject(), function(value, key){
                    var obj = {};
                    obj[key] = _.map(value, function(each){return each.asJSON()});
                    return obj;
                })
            }
        };
    }
    return AbstractCategory;

});