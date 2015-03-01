define([
    'Dictionary'
], function(
    Dictionary
){
    function ObjectBuilder() {
        var _this = this;

        var classes = new Dictionary();

        /**
         * @returns {Dictionary}
         * @private
         */
        _this._classes = function () {
            return classes;
        };

        /**
         * @returns {Array.<String>}
         */
        _this.ids = function () {
            return _this._classes().keys();
        };

        /**
         *
         * @param {String} id
         * @param {Class} _class
         */
        _this.register = function (id, _class) {
            _this._classes().put(id, _class);
        };

        /**
         * @param {String} id
         */
        _this.instantiate = function (id) {
            var _class = _this._classes().get(id);
            return new _class();
        };
    }

    return ObjectBuilder;

});