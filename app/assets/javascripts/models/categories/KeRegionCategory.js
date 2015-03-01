define([
    'models/abstract/AbstractCategory'
], function (AbstractCategory) {

    function KeRegionCategory() {
        var _this = new AbstractCategory();

        /**
         * @returns {string}
         */
        _this.name = function () {
            return 'KE B';
        };

        return _this;
    }

    KeRegionCategory.ID = 'ke_b';
    return KeRegionCategory;
});