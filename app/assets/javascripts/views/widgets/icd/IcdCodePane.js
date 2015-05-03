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
           this.super('/api/v1/codes/icd');
            _this.renderBreadcrumb();
            // TODO remove that
            //_this.searchModel().process("b0");
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

            var breadcrumbModel = new BreadcrumbModel()
                .level()
                    .label(function(){return _this.groupPrefix().toUpperCase();})
                    .next(_.identity)
                    .sameDefault()
                    .end()
                .level()
                    .defaultLabel(function(){return 'Alle Kapitel'})
                    .label(function(chapter){return 'Kapitel '+chapter.roman_number + ' ' + chapter.nonterminals})
                    .next(function(chapter){return chapter.icd_chapter_groups})
                    .sameDefault()
                    .end()
                .level()
                    .defaultLabel(function(){return 'Alle Gruppen'})
                    .label(function(group) {return 'Gruppe '+group.code})
                    .next(function(group){return group.icd_nonterminals})
                    .sameDefault()
                    .end()
                .level()
                    .defaultLabel(function(){return 'Alle Nonterminals'})
                    .label(function(nonterminal) {return 'Nonterminal '+nonterminal.code})
                    .end();

            var searchFilter = function (candidates) {
                var nonterminals = _.flatten([_.last(breadcrumbModel.selected().path()).entity()]);
                var lastTrueIndex = 0;
                function match(candidate, nonterminal) {
                    return _s(candidate.code).startsWith(nonterminal.code);
                }
                function isMatches (candidate) {
                    for (var i = lastTrueIndex; i < nonterminals.length; i++) {
                        if (match(candidate, nonterminals[i])) {
                            lastTrueIndex = i;
                            return true;
                        }
                    }
                    return false;
                }
                return _.filter(candidates, isMatches);
            };

            breadcrumbModel.announcer().onSendTo(OnBreadcrumbSelected, function(){
                _this.searchModel().allCandidatesLogic(searchFilter);
            }, this);

            $.getJSON('/api/v1/groups/icd', function(result){
                breadcrumbModel.on(result);
                breadcrumb.model(breadcrumbModel);
            });
        };

        return _this;
    }

    return IcdCodePane;

});