define([
    'models/abstract/CategorisedCode'
], function(
    CategorisedCode
) {

    function IcdCode() {
        var _this = new CategorisedCode();


        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Icd Code';
        };

        return _this;
    }

    IcdCode.ID = 'icd';
    return IcdCode;
});