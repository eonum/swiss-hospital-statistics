define([
    'Announcer',
    'announcements/OnIcdAgesDeselected',
    'announcements/OnIcdAgesSelected',
    'announcements/OnIcdYearsDeselected',
    'announcements/OnIcdYearsSelected'
], function(
    Announcer,
    OnIcdAgesDeselected,
    OnIcdAgesSelected,
    OnIcdYearsDeselected,
    OnIcdYearsSelected
){

    function IcdYearsModel() {
        var _this = this;

        var announcer = new Announcer();

        var years = [];
        var ages = [];

        var selectedYears = [];
        var selectedAges = [];

        _this.announcer = function () {
            return announcer;
        };

        _this.years = function (_years) {
            if (_.isUndefined(_years)) return years;
            years = _years;
            return _this;
        };

        _this.ages = function (_ages) {
            if (_.isUndefined(_ages)) return ages;
            ages = _ages;
            return _this;
        };

        _this.selectYear = function (year) {
            year = _this.asArray(year);
            selectedYears = _this.selectedYears().concat(year);
            _this.notifyYearsSelected(year);
        };

        _this.selectAge = function (age) {
            age = _this.asArray(age);
            selectedAges = _this.selectedAges().concat(age);
            _this.notifyAgesSelected(age);
        };

        _this.deselectYear = function (year) {
            year = _this.asArray(year);
            selectedYears = _.difference(_this.selectedYears(),year);
            _this.notifyYearsDeselected(year);
        };

        _this.deselectAge = function (age) {
            age = _this.asArray(age);
            selectedAges = _.difference(_this.selectedAges(),age);
            _this.notifyAgesDeselected(age);
        };

        _this.toggleYear = function(year) {
            if (_this.isYearSelected(year))
                _this.deselectYear(year);
            else
                _this.selectYear(year);
        };

        _this.toggleAge = function(age) {
            if (_this.isAgeSelected(age))
                _this.deselectAge(age);
            else
                _this.selectAge(age);
        };

        _this.selectedYears = function () {
            return selectedYears;
        };

        _this.selectedAges = function () {
            return selectedAges;
        };

        _this.isYearSelected = function (item) {
            return _.indexOf(_this.selectedYears(), item) >= 0;
        };

        _this.isAgeSelected = function (item) {
            return _.indexOf(_this.selectedAges(), item) >= 0;
        };

        _this.asArray = function (obj) {
            if (_.isArray(obj)) return obj;
            return [ obj ];
        };

        _this.notifyYearsSelected = function(years) {
            _this.announcer().announce(new OnIcdYearsSelected(years));
        };

        _this.notifyYearsDeselected = function(years) {
            _this.announcer().announce(new OnIcdYearsDeselected(years));
        };

        _this.notifyAgesSelected = function(ages) {
            _this.announcer().announce(new OnIcdAgesSelected(ages));
        };

        this.notifyAgesDeselected = function(ages) {
            _this.announcer().announce(new OnIcdAgesDeselected(ages));
        };

        return _this;
    }

    return IcdYearsModel;

});