define([
    'View',
    'views/widgets/top3/TopThreeDiagnosisVisualisation',
    'views/widgets/Selector',
    'models/SelectorModel'
], function(
    View,
    TopThreeDiagnosisVisualisation,
    Selector,
    SelectorModel
){

    function Top3DiagnosesPane() {
        var _this = new View('<div></div>');
        var model = new SelectorModel(); //TODO: shouldn't be able to select multiple years, can't unselect button
        var widget = new Selector().model(model);


        _this.initialize = function () {
            _this.add(new TopThreeDiagnosisVisualisation(800, 400));
            model.add('years').items([2011, 2012, 2013]);
            model.add('hospitals').items([  'Allgemeine Krankenhäuser, Zentrumsversorgung',
                                            'Allgemeine Krankenhäuser, Grundversorgung',
                                            'Spezialkliniken: Psychiatrische Kliniken',
                                            'Spezialkliniken: Rehabilitationskliniken',
                                            'Spezialkliniken: Andere Spezialkliniken']);

            _this.add(widget);
        };

        _this.initialize();

        return _this;
    }

    return Top3DiagnosesPane;
});