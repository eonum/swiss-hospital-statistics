define([
    'views/widgets/CodePane',
    'views/widgets/icd/IcdCodeVisualisationCard',
    'models/BreadcrumbModel',
    'views/widgets/Breadcrumb',
    'announcements/OnBreadcrumbSelected'
], function(
    CodePane,
    IcdCodeVisualisationCard,
    BreadcrumbModel,
    Breadcrumb,
    OnBreadcrumbSelected
){

    function IcdCodePane() {
        var _this = new CodePane();

        _this.newSelectorModel = override(_this, _this.newSelectorModel, function () {
            return this.super().characterRange();
        });

        _this.load = override(_this, _this.load, function(){
            this.super();
            _this.renderBreadcrumb();
            // TODO remove that
            //_this.searchModel().process("a045");
            return _this;
        });

        _this.groupPrefix = function () {
            return 'icd';
        };

        _this.newCodeCard = function () {
            return new IcdCodeVisualisationCard();
        };

        _this.renderBreadcrumb = function () {
            var breadcrumb = new Breadcrumb();
            _this.leftPane().prepend(breadcrumb);

            function chapterLabel(chapter) {
                return _.mapObject(Multiglot.translations.chapter, function(translation){
                    return translation+' '+chapter.roman_number + ' ' + chapter.nonterminals
                })
            }

            function groupLabel(group) {
                return _.mapObject(Multiglot.translations.group, function(translation){
                    return translation+' '+group.code
                })
            }

            function nonterminalLabel(nonterminal) {
                return _.mapObject(Multiglot.translations.nonterminal, function(translation){
                    return translation+' '+nonterminal.code
                })
            }

            function terminalLabel(terminal) {
                return _.mapObject(Multiglot.translations.terminal, function(translation){
                    return translation+' '+terminal.code
                })
            }

            var breadcrumbModel = new BreadcrumbModel()
                .level()
                    .label(function(){return _this.groupPrefix().toUpperCase();})
                    .next(_.identity)
                    .sameDefault()
                    .select(function(node){ node.select(true) })
                    .end()
                .level()
                    .defaultLabel(function(){ return Multiglot.translations.all_chapters })
                    .label(chapterLabel)
                    .next(function(chapter){return chapter.icd_groups})
                    .sameDefault()
                    .end()
                .level()
                    .defaultLabel(function(){ return Multiglot.translations.all_groups })
                    .label(groupLabel)
                    .next(function(group){return group.icd_nonterminals})
                    .sameDefault()
                    .end()
                .level()
                    .defaultLabel(function(){ return Multiglot.translations.all_nonterminals })
                    .label(nonterminalLabel)
                    .next(function(group){return group.icd_terminals})
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

            $.getJSON('/api/v1/groups/icd', function(result){
                breadcrumbModel.on(result);
                breadcrumb.model(breadcrumbModel);
                _this.searchModel().allCandidates(breadcrumbModel.root().deepest().children())
            });
        };

        return _this;
    }

    return IcdCodePane;

});