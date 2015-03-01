define([], function(){

    function JsonParser(){
        var _this = this;

        /**
         * @param {String} string - json string
         * @returns {Array.<AbstractCode>}
         */
        _this.parse = function (string) {
            var obj = JSON.parse(string);

            if (_.has(obj, 'codes')){
                return _this.createCodes(obj['codes']);
            }
        };

        /**
         *
         * @param {Array.<Object>} obj
         * @returns {Array.<AbstractCode>}
         */
        _this.createCodes = function (obj) {
            return _.map(_.intersection(_.keys(obj), ServiceProvider.codeBuilder.ids()), function(each){
                var code = ServiceProvider.codeBuilder.instantiate(each);
                code.fromJSON(obj[each]);
                return code;
            });
        };
    }

    return JsonParser;

});