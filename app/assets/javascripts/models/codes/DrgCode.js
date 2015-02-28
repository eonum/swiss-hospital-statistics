define([
    'models/abstract/CategorisedCode'
], function(
    CategorisedCode
) {

    function DrgCode() {
        var _this = new CategorisedCode();

        return _this;
    }

    DrgCode.ID = 'drg';
    return DrgCode;
});