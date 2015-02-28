define([
    'models/abstract/AbstractCode'
], function(
    AbstractCode
) {

    function CategorisedCode () {
        var _this = new AbstractCode();

        /**
         * @param {Number} year
         * @returns {CategorisedCode}
         */
        _this.newData = function (year) {
            return new CategorisedCode(year);
        };

        return _this;
    }
    return CategorisedCode;
});