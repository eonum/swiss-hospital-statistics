define([
    'views/widgets/CodePane',
    'views/widgets/drg/DrgCodeVisualisationCard',
    'models/BreadcrumbModel',
    'views/widgets/Breadcrumb',
    'announcements/OnBreadcrumbSelected'
], function(
    CodePane,
    DrgCodeVisualisationCard,
    BreadcrumbModel,
    Breadcrumb,
    OnBreadcrumbSelected
){

    function DrgCodePane() {
        var _this = new CodePane();

        _this.newSelectorModel = override(_this, _this.newSelectorModel, function () {
            return this.super();
        });

        _this.load = override(_this, _this.load, function(){
            this.super();
            _this.renderBreadcrumb();
            return _this;
        });

        _this.codeOf = function(item) {
            return item.code;
        };

        /**
         * @param candidate
         * @param {string} candidate.code
         * @param {string} candidate.text_de;
         * @returns {string}
         */
        _this.candidateNameOf = function (candidate) {
            return candidate.code + " "+candidate.text_de;
        };

        _this.groupPrefix = function () {
            return 'drg';
        };

        _this.newCodeCard = function () {
            return new DrgCodeVisualisationCard();
        };

        _this.renderBreadcrumb = function () {
            var breadcrumb = new Breadcrumb();
            _this.leftPane().prepend(breadcrumb);

            function chapterLabel(chapter) {
                return _.mapObject(Multiglot.translations.mdc, function(translation){
                    return translation+' '+chapter.code
                })
            }

            function nonterminalLabel(nonterminal) {
                return _.mapObject(Multiglot.translations.base_drg, function(translation){
                    return translation+' '+nonterminal.code
                })
            }

            function terminalLabel(terminal) {
                return _.mapObject(Multiglot.translations.terminal, function(translation){
                    return translation+' '+terminal.code
                })
            }

            function hint(entity) {
                return {
                    de: entity.text_de,
                    fr: entity.text_de,
                    it: entity.text_de
                }
            }

            var breadcrumbModel = new BreadcrumbModel()
                .level()
                    .label(function(){return _this.groupPrefix().toUpperCase();})
                    .next(_.identity)
                    .sameDefault()
                    .select(function(node){ node.select(true) })
                    .end()
                .level()
                    .defaultLabel(function(){ return Multiglot.translations.all_mdcs})
                    .label(chapterLabel)
                    .hint(hint)
                    .next(function(chapter){ return chapter.drg_nonterminals })
                    .sameDefault()
                    .end()
                .level()
                    .defaultLabel(function(){ return Multiglot.translations.all_base_drg })
                    .label(nonterminalLabel)
                    .hint(hint)
                    .next(function(nonterminal){return nonterminal.drg_terminals})
                    .sameDefault()
                    .beLast()
                    .end()
                .level()
                    .defaultLabel(function(){ return Multiglot.translations.all_terminals })
                    .label(terminalLabel)
                    .end();

            breadcrumbModel.announcer().onSendTo(OnBreadcrumbSelected, function(ann){
                _this.searchModel().allCandidates(ann.node().deepest().children())
            }, this);

            _this.retrieveAndDo('/api/v1/groups/drg', function(result){
                breadcrumbModel.on(result);
                breadcrumb.model(breadcrumbModel);
                _this.searchModel().allCandidates(breadcrumbModel.root().deepest().children())
            });
        };

        return _this;
    }

    return DrgCodePane;

});