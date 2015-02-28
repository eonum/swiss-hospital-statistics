define([
    'models/abstract/CategorisedCode'
], function(
    CategorisedCode
) {

    function IcdCode() {
        var _this = new CategorisedCode();

        return _this;
    }

    IcdCode.ID = 'icd';
    return IcdCode;
});