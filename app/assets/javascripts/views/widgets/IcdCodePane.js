define([
    'View',
    'views/widgets/AlphabeticalSelector',
    'models/AlphabeticalSelectorModel',
    'announcements/OnAlphabeticalItemSelected',
    'views/widgets/SearchField',
    'models/SearchProcessor',
    'views/widgets/CodeVisualisationCard',
    'announcements/OnSearchProcessorFiltered'
], function(
    View,
    AlphabeticalSelector,
    AlphabeticalSelectorModel,
    OnAlphabeticalItemSelected,
    SearchField,
    SearchProcessor,
    CodeVisualisationCard,
    OnSearchProcessorFiltered
){

    function IcdCodePane() {
        var _this = new View('<div class="row full-width"></div>');
        var leftPane = new View('<div class="large-5 columns"></div>');
        var rightPane = new View('<div class="large-7 columns"></div>');

        var searchView;
        var searchModel;

        var selectorView;
        var selectorModel;

        var codeCard;

        _this.render = function () {
            _this.add(_this.leftPane());
            _this.add(_this.rightPane());
            _this.searchModel(_this.newSearchModel());
            _this.selectorModel(_this.newSelectorModel());
            _this.searchView(_this.newSearchView());
            _this.selectorView(_this.newSelectorView());
            _this.codeCard(_this.newCodeCard());
        };

        _this.searchView = function(_searchView) {
            if (_.isUndefined(_searchView)) return searchView;
            searchView = _searchView;
            searchView.class('full-width');
            searchView.model(_this.searchModel());
            _this.leftPane().add(searchView);
        };

        _this.searchModel = function (_searchModel) {
            if (_.isUndefined(_searchModel)) return searchModel;
            searchModel = _searchModel;
            searchModel.ignoreCase();
            searchModel.name(function(item){
                return item.short_code + " "+item.code + " "+item.text_de;
            });
            searchModel.announcer().onSendTo(OnSearchProcessorFiltered, _this.onSearched,_this);
        };

        _this.selectorView = function (_selectorView) {
            if (_.isUndefined(_selectorView)) return selectorView;
            selectorView = _selectorView;
            selectorView.class('full-width');
            selectorView.model(selectorModel);
            _this.leftPane().add(selectorView);
        };

        _this.selectorModel = function (_selectorModel) {
            if (_.isUndefined(_selectorModel)) return selectorModel;
            selectorModel = _selectorModel;
            selectorModel.name(function(item){
                return item.code + " "+item.text_de;
            });
            selectorModel.announcer().onSendTo(OnAlphabeticalItemSelected, _this.onItemSelected,_this);
        };

        _this.codeCard = function (_codeCard) {
            if (_.isUndefined(_codeCard)) return codeCard;
            codeCard = _codeCard;
            codeCard.class('full-width');
            _this.rightPane().add(codeCard);
        };

        _this.leftPane = function () {
            return leftPane;
        };

        _this.rightPane = function () {
            return rightPane;
        };

        _this.onSearched = function (ann) {
            _this.selectorModel().items(ann.candidates());
        };

        _this.onItemSelected = function (ann) {
            _this.codeCard().on(ann.item().type, ann.item().short_code);
        };

        _this.newSearchView = function () {
            return new SearchField();
        };

        _this.newSearchModel = function () {
            return new SearchProcessor();
        };

        _this.newSelectorView = function () {
            return new AlphabeticalSelector();
        };

        _this.newSelectorModel = function () {
            return new AlphabeticalSelectorModel();
        };

        _this.newCodeCard = function () {
            return new CodeVisualisationCard();
        };

        _this.load = function (url) {
            $.getJSON(url, function(candidates){
                _this.searchModel().allCandidates(candidates);
            });
            return _this;
        };

        _this.render();

        return _this;
    }

    return IcdCodePane;

});