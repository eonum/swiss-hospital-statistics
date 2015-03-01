define([
    'models/abstract/CategorisedCode'
], function(
    CategorisedCode
) {

    function KeCode() {
        var _this = new CategorisedCode();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Ke Code';
        };

        return _this;
    }

    KeCode.ID = 'ke';
    return KeCode;
});