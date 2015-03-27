define([
    'models/abstract/CategorisedCode'
], function(
    CategorisedCode
) {

    function ChopCode() {
        var _this = new CategorisedCode();

        /**
         * @returns {string}
         */
        _this.name = function() {
            return 'Chop Code';
        };

        return _this;
    }

    ChopCode.ID = 'chop';
    return ChopCode;
});