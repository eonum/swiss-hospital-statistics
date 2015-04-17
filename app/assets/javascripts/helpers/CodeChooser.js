define(['View'], function (View){

    function CodeChooser(initialCodeType, newCodeCallback){
        var _this = new View('<div></div>');
        var codeType = initialCodeType;

        _this.initialize = function (){
            _this.add('<p>Code auswählen:</p>');
            _this.add('<input id="code_chooser"/>');
        };

        _this.attachClickHandler = function(codeType){
            $('#code_chooser').keyup(function () {
                var text = $('#code_chooser').val();
                if(text.length >= 4){
                    $.getJSON( "/api/v1/codes/"+ codeType + "/info/" + text, function( data ) {
                        var codeType = _this.getFirstProperty(data.codes);
                        var datasets = codeType.codes;
                        newCodeCallback(datasets);
                        //$("#code_chooser").focus();
                    });
                }
            });
        };

        //returns the value of the first property of an object
        _this.getFirstProperty = function (object){
            for (var prop in object) {
                return object[prop];
            }
        };

        _this.fetchDatasets = function (codeType, code, resultCallback){
            $.getJSON( "/api/v1/codes/"+ codeType + "/info/" + code, function( data ) {
                var codeType = _this.getFirstProperty(data.codes);
                var datasets = codeType.codes;
                resultCallback(datasets);
            });
        };

        _this.appendTo = function (element) {
            element.append(_this);
            _this.attachClickHandler(codeType);
        };

        _this.initialize();

        return _this;
    }

    return CodeChooser;
});