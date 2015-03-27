define([
    'Dictionary'
], function(
    Dictionary
){

    function Catalog() {
        var _this = this;

        var catalog = new Dictionary();

        /**
         * @param {function} [callback]
         */
        _this.loadTypes = function (callback) {
            $.getJSON( 'api/v1/codes', function( data ) {
                var codes = ServiceProvider.jsonParser.parse(data);
                _.each(_.keys(codes), function(each){ _this._catalog().put(ServiceProvider.codeBuilder.classFor(each), null)});
                if (!_.isUndefined(callback)) callback();
            })
        };

        /**
         * @param {Class} type
         * @param {String} type.ID
         * @param {function} [callback]
         */
        _this.loadCodeType = function (type, callback) {
            if (_this.isCodeTypeLoaded(type)) return (_.isUndefined(callback)) ? _this : callback();
            $.getJSON( 'api/v1/codes/'+type.ID+'/info', function( data ) {
                var codes = ServiceProvider.jsonParser.parse(data)[type.ID];
                var map = _.object(_.map(codes, function(each){return each.code()}), codes);
                _this._catalog().put(type, map);
                if (!_.isUndefined(callback)) callback();
            })
        };

        /**
         * @param {Class} type
         * @param {String} type.ID
         * @param {string} code
         * @param {function} [callback]
         */
        _this.loadCode = function (type, code, callback) {
            if (!_this.isCodeTypeLoaded(type))
                return _this.loadCodeType(type, function(){ _this.loadCode(type, code, callback)});
            if (_this.isCodeLoaded(type, code)) return (_.isUndefined(callback)) ? _this : callback();
            $.getJSON( 'api/v1/codes/'+type.ID+'/info/'+code, function( data ) {
                var codeObject = _this.code(type, code);
                var codeData = _.first(data.codes[type.ID].codes);
                codeObject.fromJSON(codeData);
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
         * @param {Class} type
         * @param {string} code
         * @returns {boolean}
         */
        _this.isCodeLoaded = function (type, code) {
            if (_this.isCodeTypeLoaded(type)) return false;
            return _this.code(type, code).isLoaded();
        };

        /**
         * @returns {Dictionary}
         * @private
         */
        _this._catalog = function () {
            return catalog;
        };

        /**
         * @param {Class} type
         * @returns {Object}
         */
        _this.codes = function (type) {
            return _this._catalog().get(type)
        };

        /**
         * @param {Class} type
         * @param {string} code
         * @returns {AbstractCode}
         */
        _this.code = function (type, code) {
            return _this.codes(type)[code];
        };

        /**
         * @returns {Array.<Class>}
         */
        _this.types = function () {
            return _this._catalog().keys();
        }
    }
    return Catalog;
});