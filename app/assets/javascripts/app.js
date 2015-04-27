
define([
    'views/ui/CatalogChoiceButtonBar',
    'models/AlphabeticalSelectorModel',
    'views/widgets/AlphabeticalSelector',
    'views/widgets/CodeVisualisationCard',
    'views/widgets/SearchField',
    'announcements/OnAlphabeticalItemSelected'
], function(
    CatalogChoiceButtonBar,
    AlphabeticalSelectorModel,
    AlphabeticalSelector,
    CodeVisualisationCard,
    SearchField,
    OnAlphabeticalItemSelected
){

    "use strict";
    function App() {
        var _this = this;

        var catalogChoiceButtons = new CatalogChoiceButtonBar();

        _this.initialize = function(){
            _this.addCatalogChoiceButtons();
            _this.visualise();
        };

        _this.addCatalogChoiceButtons = function(){
            catalogChoiceButtons.addButton("ICD", function(){window.alert("Hi! I'm the ICD catalog!")});
            catalogChoiceButtons.addButton("CHOP", function(){window.alert("Hi! I'm the CHOP catalog!")});
            catalogChoiceButtons.addButton("DRG", function(){window.alert("Hi! I'm the DRG catalog!")});
            $('body').append(catalogChoiceButtons);
        };

        _this.visualise = function () {
            var pane = $('<div class="row full-width"></div>');
            var leftPane = $('<div class="large-5 columns"></div>');
            var rightPane = $('<div class="large-7 columns"></div>');
            pane.append(leftPane);
            pane.append(rightPane);

            $('body').append(pane);

            var selectorModel = new AlphabeticalSelectorModel();
            selectorModel.nameLogic(function(item){
                return item.code + " "+item.text_de;
            });

            selectorModel.announcer().onSendTo(OnAlphabeticalItemSelected, function(ann) {
                codeCard.on(ann.item().type, ann.item().short_code);
            },_this);


            var selectorView = new AlphabeticalSelector();
            selectorView.class('full-width');
            selectorView.model(selectorModel);

            leftPane.append(selectorView);

            $.getJSON("/api/v1/codes/icd", function(result){
                selectorModel.items(result);
            });

            var codeCard = new CodeVisualisationCard();
            codeCard.class('full-width');
            rightPane.append(codeCard);

            var search = new SearchField();
            search.class('full-width');
            leftPane.prepend(search);
        };


        //TODO: dummy-method until development of top-3 is done
        _this.displayTopThreeDiagnosis = function(){

        };
        
        _this.initialize();
    }

    return App
});
