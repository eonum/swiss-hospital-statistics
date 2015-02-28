define([
    'models/abstract/CategorisedCode'
], function(
    CategorisedCode
) {

    function ChopCode() {
        var _this = new CategorisedCode();

        return _this;
    }

    ChopCode.ID = 'chop';
    return ChopCode;
});