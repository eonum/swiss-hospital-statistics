define([
    'models/abstract/CategorisedCode'
], function(
    CategorisedCode
) {

    function AgeCode() {
        var _this = new CategorisedCode();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Age Code';
        };

        return _this;
    }

    AgeCode.ID = 'age';
    return AgeCode;
});