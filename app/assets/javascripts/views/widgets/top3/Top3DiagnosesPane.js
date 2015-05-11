define([
    'View',
    'views/widgets/top3/TopThreeDiagnosisVisualisation',
    'views/widgets/Selector',
    'models/SelectorModel',
    'announcements/OnSelectionChanged'
], function(
    View,
    TopThreeDiagnosisVisualisation,
    Selector,
    SelectorModel,
    OnSelectionChanged
){

    function Top3DiagnosesPane() {
        var _this = new View('<div></div>');
        var model = new SelectorModel(); //TODO: shouldn't be able to select multiple years
        var widget = {};

        _this.initialize = function () {
            model.add('years').items([2011, 2012, 2013]);
            model.add('hospitals').items([  'Allgemeine Krankenhäuser, Zentrumsversorgung',
                                            'Allgemeine Krankenhäuser, Grundversorgung',
                                            'Spezialkliniken: Psychiatrische Kliniken',
                                            'Spezialkliniken: Rehabilitationskliniken',
                                            'Spezialkliniken: Andere Spezialkliniken']);
            model.announcer().onSendTo(OnSelectionChanged, _this.onChanged, _this);

            var widget = new Selector().model(model);
            _this.add(widget);
            _this.model(model);

            _this.add(new TopThreeDiagnosisVisualisation(800, 400));
        };

        _this.onChanged = function(ann) {
            //TODO: implement this
            //TODO: shouldn't be able to select multiple years
            console.log(ann.selection());
        };

        _this.initialize();

        return _this;
    }

    return Top3DiagnosesPane;
});