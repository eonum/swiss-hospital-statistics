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

            var breadcrumbModel = new BreadcrumbModel()
                .level()
                    .label(function(){return _this.groupPrefix().toUpperCase();})
                    .next(_.identity)
                    .sameDefault()
                    .end()
                .level()
                    .defaultLabel(function(){return 'Alle Kapitel'})
                    .label(function(chapter){return 'Kapitel '+chapter.roman_number + ' ' + chapter.nonterminals})
                    .next(function(chapter){return chapter.icd_groups})
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
                    .next(function(group){return group.icd_terminals})
                    .sameDefault()
                    .beLast()
                    .end()
                .level()
                    .defaultLabel(function(){return 'Alle Terminals'})
                    .label(function(terminal) {return 'Terminal '+terminal.code})
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