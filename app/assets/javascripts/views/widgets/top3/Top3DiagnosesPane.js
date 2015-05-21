define([
    'View',
    'views/widgets/top3/TopThreeDiagnosisVisualisation',
    'views/widgets/Selector',
    'models/SelectorModel',
    'announcements/OnSelectionChanged',
    'helpers/CodeChooser'
], function(
    View,
    TopThreeDiagnosisVisualisation,
    Selector,
    SelectorModel,
    OnSelectionChanged,
    CodeChooser
){

    function Top3DiagnosesPane() {
        var _this = new View('<div></div>');
        _this.class('loading');

        var codeChooser = new CodeChooser();
        var model = new SelectorModel();
        var widget = {};

        var visualisation;
        var resultsWithTexts;
        var resultsWithoutTexts;

        _this.initialize = function () {
            $.getJSON('api/v1/top3datasets/', function (result){
                resultsWithoutTexts = result;

                var years = _.uniq(_.map(result, 'year'));
                model.add('years').items(years);
              /*  model.add('hospitals').items([  'Allgemeine Krankenhäuser, Zentrumsversorgung',
                    'Allgemeine Krankenhäuser, Grundversorgung',
                    'Spezialkliniken: Psychiatrische Kliniken',
                    'Spezialkliniken: Rehabilitationskliniken',
                    'Spezialkliniken: Andere Spezialkliniken']);*/
                model.add('hospitals').items([Multiglot.translations.search_placeholder]);
                model.announcer().onSendTo(OnSelectionChanged, _this.onChanged, _this);

                // all codes fetched
                var selector = new Selector();
                // tell selector to support multiglot labels
                selector.setOuterLinkTextLogic(function(link, item, model){
                     if(_.isObject(item)){
                         Multiglot.custom(link, item);
                     }else{
                         link.text(model.label(item));
                     }
                });
                widget = selector.model(model);

                _this.add(widget);
                _this.model(model);

                visualisation = new TopThreeDiagnosisVisualisation();
                _this.add(visualisation);

                _this.addCodesToData(result);
            });
        };

        _this.onChanged = function(ann) {
            var selectedYear = ann.selection().years[0];
            var selectedHospitalType = ann.selection().hospitals[0];
            visualisation.visualiseSelection(selectedYear, selectedHospitalType);
        };

        _this.addCodesToData = function(data){
            resultsWithTexts = [];
            // also fetch code texts
            for(var i = 0; i < data.length; i++){
                _this.attachCodeToDataset(data[i]);
            }

        };

        _this.attachCodeToDataset = function(dataset){
            codeChooser.fetchCode('icd', dataset.code, function (codes){
                resultsWithTexts.push(_.extend(dataset, codes[0]));
                if(resultsWithTexts.length == resultsWithoutTexts.length){
                    _this.initializeVisualisations(resultsWithTexts);
                }
            });
        };

        _this.initializeVisualisations = function(data){
            $(this).removeClass('loading');
            visualisation.setData(resultsWithTexts);
        };

        _this.initialize();

        return _this;
    }

    return Top3DiagnosesPane;
});