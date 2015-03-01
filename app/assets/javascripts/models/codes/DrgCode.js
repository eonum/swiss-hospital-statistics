define([
    'models/abstract/CategorisedCode'
], function(
    CategorisedCode
) {

    function DrgCode() {
        var _this = new CategorisedCode();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Drg Code';
        };

        return _this;
    }

    DrgCode.ID = 'drg';
    return DrgCode;
});