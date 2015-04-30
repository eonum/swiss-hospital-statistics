define([
    'views/widgets/CodePane',
    'views/widgets/IcdCodeVisualisationCard',
    'models/BreadcrumbModel',
    'views/widgets/Breadcrumb'
], function(
    CodePane,
    IcdCodeVisualisationCard,
    BreadcrumbModel,
    Breadcrumb
){

    function IcdCodePane() {
        var _this = new CodePane();

        _this.newSelectorModel = override(_this, _this.newSelectorModel, function () {
            return this.super().characterRange();
        });

        _this.load = override(_this, _this.load, function(){
           this.super('/api/v1/codes/icd');
            _this.renderBreadcrumb();
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
                    .label(function(){return _this.groupPrefix();})
                    .next(_.identity)
                    .end()
                .level()
                    .label(function(chapter){return 'Kapitel '+chapter.roman_number + ' ' + chapter.nonterminals})
                    .next(function(chapter){return chapter.icd_chapter_groups})
                    .end()
                .level()
                    .label(function(group) {return 'Gruppe '+group.code})
                    .next(function(group){return group.icd_nonterminals})
                    .end()
                .level()
                    .label(function(nonterminal) {return 'Nonterminal '+nonterminal.code})
                    .end();

            $.getJSON('/api/v1/groups/icd', function(result){
                breadcrumbModel.on(result);
                breadcrumb.model(breadcrumbModel);
            });
        };

        return _this;
    }

    return IcdCodePane;

});