define([
    'View',
    'views/widgets/AlphabeticalSelector',
    'models/AlphabeticalSelectorModel',
    'announcements/OnAlphabeticalItemSelected',
    'views/widgets/SearchField',
    'models/SearchProcessor',
    'views/widgets/CodeVisualisationCard',
    'announcements/OnSearchProcessorFiltered',
    'announcements/OnLabelsCloudAdded'
], function(
    View,
    AlphabeticalSelector,
    AlphabeticalSelectorModel,
    OnAlphabeticalItemSelected,
    SearchField,
    SearchProcessor,
    CodeVisualisationCard,
    OnSearchProcessorFiltered,
    OnLabelsCloudAdded
){

    function CodePane() {
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
            selectorModel.announcer().onSendTo(OnAlphabeticalItemSelected, _this.onItemSelected,_this);
            selectorModel.cloud().announcer().onSendTo(OnLabelsCloudAdded, function(ann){
                if (!_this.selectorModel().isItemSelected())
                    _this.selectorModel().selectItem(ann.item());
            }, _this);
            selectorModel.cloud().label(function(item){ return _this.codeOf(item) });
        };

        _this.codeOf = function(item) {
            return item.short_code;
        };

        _this.codeCard = function (_codeCard) {
            if (_.isUndefined(_codeCard)) return codeCard;
            codeCard = _codeCard;
            codeCard.model(_this.selectorModel());
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
            _this.codeCard().on(_this.groupPrefix(), _this.codeOf(ann.item()));
        };

        _this.newSearchView = function () {
            return new SearchField();
        };

        _this.newSearchModel = function () {
            return new SearchProcessor().name(_this.candidateNameOf).ignoreCase();
        };

        _this.newSelectorView = function () {
            return new AlphabeticalSelector();
        };

        _this.newSelectorModel = function () {
            return new AlphabeticalSelectorModel().name(_this.listNameOf).prefix(_this.groupPrefix).firstCharacter(_this.firstCharacterOf);
        };

        _this.newCodeCard = function () {
            return new CodeVisualisationCard();
        };

        _this.load = function (url) {
            _this.render();
            if (_.isUndefined(url)) return;
            $.getJSON(url, function(candidates){
                _this.searchModel().allCandidates(_.sortBy(candidates, 'code'));
            });
            return _this;
        };

        /**
         * @param item
         * @param {string} item.code
         * @param {string} item.text_de;
         * @returns {Object}
         */
        _this.listNameOf = function (item) {
            return {
                de: (_this.codeOf(item) + " "+item.text_de),
                fr: (_this.codeOf(item) + " "+item.text_fr),
                it: (_this.codeOf(item) + " "+item.text_it)
            }
        };

        /**
         * @param candidate
         * @param {string} candidate.short_code
         * @param {string} candidate.code
         * @param {string} candidate.text_de;
         * @returns {string}
         */
        _this.candidateNameOf = function (candidate) {
            return candidate.short_code + " "+candidate.code + " "+candidate.text_de+" "+candidate.text_fr+" "+candidate.text_it;
        };

        _this.firstCharacterOf = function(item) {
            return _this.codeOf(item).charAt(0);
        };

        _this.groupPrefix = function () {
            return 'group';
        };

        return _this;
    }

    return CodePane;

});