define([
    'models/abstract/AbstractData',
    'Dictionary'
], function(
    AbstractData,
    Dictionary){

    /**
     * @param {Number} _year
     * @constructor
     * @class CategorisedData
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
         * @param {Object} key
         * @returns {Array.<AbstractCategory>}
         */
        _this.at = function (key) {
            if (!_this._categories().isKeyExists(key))
                return _this._categories().put(key, [ ]);
            return _this._categories().get(key);
        };

        /**
         * @param {Array.<{key: String, value: Object}>} obj.categories
         */
        _this.fromJSON = function (obj) {
            if (_.isUndefined(obj) || _.isNull(obj)) return null;
            if (!_.has(obj, 'categories')) return;
            _.each(_.intersection(_.keys(obj.categories), ServiceProvider.categoryBuilder.ids()), function(categoryID){
                _.each (obj.categories[categoryID], function(categoryElement){
                    var category = ServiceProvider.categoryBuilder.instantiate(categoryID);
                    category.fromJSON(categoryElement);
                    _this.at(categoryID).push(category);
                });
            });
        };

        /**
         * @type {Function}
         */
        _this.asJSON = override(_this, _this.asJSON, function () {
            return _.extend(this.super(), {
                categories: _.map(_this._categories().asObject(), function(value, key){
                    var obj = {};
                    obj[key] = _.map(value, function(each){return each.asJSON()});
                    return obj;
                })
            });
        });

        return _this;
    }
    return CategorisedData;
});