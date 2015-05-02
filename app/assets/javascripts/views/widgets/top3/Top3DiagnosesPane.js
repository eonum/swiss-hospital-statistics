define([
    'View',
    'views/widgets/top3/TopThreeDiagnosisVisualisation'
], function(
    View,
    TopThreeDiagnosisVisualisation
){

    function Top3DiagnosesPane() {
        var _this = new View('<div></div>');

        _this.initialize = function () {
            _this.add(new TopThreeDiagnosisVisualisation(800, 400));
        };

        _this.initialize();

        return _this;
    }

    return Top3DiagnosesPane;
});