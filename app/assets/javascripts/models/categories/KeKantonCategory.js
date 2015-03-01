define([
    'models/abstract/AbstractCategory'
], function (AbstractCategory) {

    function KeKantonCategory() {
        var _this = new AbstractCategory();

        /**
         * @returns {string}
         */
        _this.name = function () {
            return 'KE A';
        };

        return _this;
    }

    KeKantonCategory.ID = 'ke_a';
    return KeKantonCategory;
});