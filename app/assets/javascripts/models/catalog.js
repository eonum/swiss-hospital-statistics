define([
    'Dictionary'
], function(
    Dictionary
){

    function Catalog() {
        var _this = this;

        var codes = new Dictionary();

        /**
         * @param {function} [callback]
         */
        _this.loadTypes = function (callback) {
            $.getJSON( 'api/v1/codes', function( data ) {
                var codes = ServiceProvider.jsonParser.parse(data);
                _.each(_.keys(codes), function(each){ _this._codes().put(ServiceProvider.codeBuilder.classFor(each), null)});
                if (!_.isUndefined(callback)) callback();
            })
        };

        /**
         *
         * @param {Class} type
         * @param {String} type.ID
         * @param {function} [callback]
         */
        _this.loadCodeType = function (type, callback) {
            if (_this.isCodeTypeLoaded(type)) return (_.isUndefined(callback)) ? _this : callback();
            $.getJSON( 'api/v1/codes/'+type.ID+'/info', function( data ) {
                var codes = ServiceProvider.jsonParser.parse(data)[type.ID];
                var map = _.object(_.map(codes, function(each){return each.code()}), codes);
                _this._codes().put(type, map);
                if (!_.isUndefined(callback)) callback();
            })
        };

        /**
         * @param {Class} type
         * @returns {boolean}
         */
        _this.isCodeTypeLoaded = function (type) {
            var codes = _this.codes(type);
            return !_.isUndefined(codes) && !_.isNull(codes)
        };

        /**
         *
         * @returns {Dictionary}
         * @private
         */
        _this._codes = function () {
            return codes;
        };

        _this.codes = function (type) {
            return _this._codes().get(type)
        };

        /**
         * @returns {Array.<Class>}
         */
        _this.types = function () {
            return _this._codes().keys();
        }
    }
    return Catalog;
});