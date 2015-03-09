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
            var codes = {};
            _.each(_.intersection(_.keys(obj), ServiceProvider.codeBuilder.ids()), function(each) {
                codes[each] = [ ];
                var description = obj[each].description;
                _.each(obj[each].codes, function(codeObj) {
                    var code = ServiceProvider.codeBuilder.instantiate(each);
                    code.typeDescription(description);
                    code.fromJSON(codeObj);
                    codes[each].push(code);
                });
            });
            return codes;
        };
    }

    return JsonParser;

});