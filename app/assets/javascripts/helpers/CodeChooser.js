define(['View'], function (View){

    function CodeChooser(initialCodeType, newCodeCallback){
        var _this = new View('<div></div>');
        var codeType = initialCodeType;

        _this.initialize = function (){
            _this.add('<p>Code auswählen:</p>');
            _this.add('<input id="code_chooser"/>');
        };

        _this.attachClickHandler = function(codeType){
            console.log("test1");
            $('#code_chooser').keyup(function () {
                console.log("test2");
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

        _this.getFirstProperty = function (object){
            for (var prop in object) {
                return object[prop];
            }
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