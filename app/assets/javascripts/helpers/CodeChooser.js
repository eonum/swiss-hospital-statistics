define([], function (){

    /**
     *
     * @param initialCodeType
     * @param newCodeCallback
     * @returns {View}
     * @constructor
     * @class {CodeChooser}
     */
    function CodeChooser(initialCodeType){
        var _this = this;


        //returns the value of the first property of an object
        _this.getFirstProperty = function (object){
            for (var prop in object) {
                return object[prop];
            }
        };

        _this.fetchCode = function (codeType, code, resultCallback){
            $.getJSON("/api/v1/codes/" + codeType + "/specific/" + code, function(result){
                resultCallback(result);
            });
        };

        _this.fetchDatasets = function (codeType, code, resultCallback){
            _this.fetchCodeAndDatasets(codeType, code, resultCallback);
        };

        _this.fetchCodeAndDatasets = function (codeType, code, resultCallback){
            _this.fetchCode(codeType, code, function(resultCodes){
                $.getJSON("/api/v1/codes/" + codeType + "/datasets/" + code, function (data) {
                    var codeType = _this.getFirstProperty(data.codes);
                    var datasets = codeType.codes;
                    resultCallback(resultCodes[0], datasets);
                });
            });
        };

        /**
         *
         * @param {Object[]} codes
         * @param {string} codes.type
         * @param {string} codes.code
         * @param callback
         */
        _this.fetchAllCodeAndDatasets = function(codes, callback) {
            var cache = { };
            var results = [];
            $.when.apply($, _.map(codes, function(each){
                return $.get('/api/v1/codes/' + each.type + '/specific/' + each.code, function(result) {
                    cache[each.type+'_'+each.code] = result;
                });
            })).then(function() {
                $.when.apply($, _.map(codes, function(each){
                    return $.get('/api/v1/codes/' + each.type + '/datasets/' + each.code, function(result) {
                        var id = each.type+'_'+each.code;
                        var codeType = _this.getFirstProperty(result.codes);
                        var datasets = codeType.codes;
                        results.push({code: cache[id], datasets: datasets});
                    });
                })).then(function(){
                    callback(results);
                });
            });
        };

        _this.appendTo = function (element) {
            element.append(_this);
            _this.attachInputHandler(codeType);
        };
    }

    return CodeChooser;
});