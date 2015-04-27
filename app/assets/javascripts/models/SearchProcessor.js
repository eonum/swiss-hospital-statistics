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
        var candidates = [];
        var nameLogic = function (candidate) { return candidate.toString(); };
        var filter = new SearchFilter();
        var announcer = new Announcer();

        _this.announcer = function () {
            return announcer;
        };

        _this.ignoreCase = function () {
            _this.filter(new SearchFilterIgnoreCaseDecorator(_this.filter()));
        };

        _this.filter = function (_filter) {
            if (_.isUndefined(_filter)) return filter;
            filter = _filter;
        };

        _this.nameLogic = function (_nameLogic) {
            nameLogic = _nameLogic;
        };

        _this.allCandidates = function (_candidates) {
            if (_.isUndefined(_candidates)) return rawCandidates;
            rawCandidates = _candidates;
        };

        _this.process = function (query) {
            candidates = _.isEmpty(query) ? _this.allCandidates() : _this.filterCandidates(query);
            _this.notifyFiltered(_this.candidates());
        };

        _this.filterCandidates = function (query) {
            return _.filter(_this.allCandidates(), function(candidate){ return _this.filter().isMatches(_this.nameOf(candidate), query) });
        };

        _this.candidates = function () {
            return candidates;
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