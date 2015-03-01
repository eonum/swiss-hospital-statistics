define([
    'models/abstract/AbstractCategory'
], function (AbstractCategory) {

    function KeRegionStatisticCategory() {
        var _this = new AbstractCategory();

        /** @type {String} */
        var regionCode;
        /** @type {String} */
        var regionName;
        /** @type {Number} */
        var birthCount;
        /** @type {Number} */
        var cesareanCount;
        /** @type {Number} */
        var cesareanPercent;
        /** @type {Number} */
        var averageAge;
        /** @type {Number} */
        var averageCesareanAge;

        /**
         * @returns {String}
         */
        _this.regionCode = function () {
            return regionCode;
        };

        /**
         * @returns {String}
         */
        _this.regionName = function () {
            return regionName;
        };

        /**
         * @returns {Number}
         */
        _this.birthCount = function () {
            return birthCount;
        };

        /**
         * @returns {Number}
         */
        _this.cesareanCount = function () {
            return cesareanCount;
        };

        /**
         * @returns {Number}
         */
        _this.cesareanPercent = function () {
            return cesareanPercent;
        };

        /**
         * @returns {Number}
         */
        _this.averageAge = function () {
            return averageAge;
        };

        /**
         * @returns {Number}
         */
        _this.averageCesareanAge = function () {
            return averageCesareanAge;
        };

        /**
         * @returns {string}
         */
        _this.name = function () {
            return 'KE Region';
        };

        _this.fromJSON = override(_this, _this.fromJSON,
            /**
             * @param {String} obj.code
             * @param {String} obj.name
             * @param {Number} obj.births
             * @param {Number} obj.cesareans;
             * @param {Number} obj.cesareansPercent
             * @param {Number} obj.age;
             * @param {Number} obj.cesareanAge
             */
            function (obj){
                this.super();
                regionCode = obj.code;
                regionName = obj.name;
                birthCount = obj.births;
                cesareanCount = obj.cesareans;
                cesareanPercent = obj.cesareansPercent;
                averageAge = obj.age;
                averageCesareanAge = obj.cesareanAge
        });

        /**
         * @type {Object}
         */
        _this.asJSON = override(_this, _this.asJSON, function(){
            return _.extend(this.super(), {
                code : _this.regionCode(),
                name : _this.regionName(),
                births : _this.birthCount(),
                cesareans : _this.cesareanCount(),
                cesareansPercent : _this.cesareanPercent(),
                age : _this.averageAge(),
                cesareanAge : _this.averageCesareanAge()
            });
        });

        return _this;
    }

    KeRegionStatisticCategory.ID = 'ke_region';
    return KeRegionStatisticCategory;
});