define([
    'Announcer',
    'models/SearchFilter',
    'models/SearchFilterIgnoreCaseDecorator',
    'announcements/OnSearchProcessorFiltered'
], function (
    Announcer,
    SearchFilter,
    SearchFilterIgnoreCaseDecorator,
    OnSearchProcessorFiltered
){

    function SearchProcessor() {
        var _this = this;
        var rawCandidates = [];
        var allCandidates = [];
        var candidates = [];
        var nameLogic = function (candidate) { return candidate.toString(); };
        var allCandidatesLogic = _.identity;
        var filter = new SearchFilter();
        var announcer = new Announcer();
        var query = "";

        _this.announcer = function () {
            return announcer;
        };

        _this.ignoreCase = function () {
            _this.filter(new SearchFilterIgnoreCaseDecorator(_this.filter()));
            return _this;
        };

        _this.filter = function (_filter) {
            if (_.isUndefined(_filter)) return filter;
            filter = _filter;
        };

        _this.name = function (_nameLogic) {
            nameLogic = _nameLogic;
            return _this;
        };

        _this.allCandidates = function (_candidates) {
            if (_.isUndefined(_candidates)) return allCandidates;
            rawCandidates = _candidates;
            allCandidates = allCandidatesLogic(rawCandidates);
            _this.process(_this.query());
        };

        _this.allCandidatesLogic = function(_func) {
            allCandidatesLogic = _func;
            _this.allCandidates(rawCandidates);
        };

        _this.process = function (_query) {
            query = _query;
            candidates = _.isEmpty(_query) ? _this.allCandidates() : _this.filterCandidates(_query);
            _this.notifyFiltered(_this.candidates());
        };

        _this.filterCandidates = function (query) {
            return _.filter(_this.allCandidates(), function(candidate){ return _this.filter().isMatches(_this.nameOf(candidate), query) });
        };

        _this.candidates = function () {
            return candidates;
        };

        _this.query = function () {
            return query;
        };

        _this.nameOf = function (candidate) {
            return nameLogic(candidate);
        };

        _this.on = function (object) {
            _this.allCandidates(object);
        };

        _this.notifyFiltered = function (_candidates) {
            _this.announcer().announce(new OnSearchProcessorFiltered(_candidates));
        };
    }

    return SearchProcessor;
});