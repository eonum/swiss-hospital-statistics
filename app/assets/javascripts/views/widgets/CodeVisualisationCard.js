define([
    'View',
    'views/ui/CardPane',
    'views/ui/CardElement',
    'views/ui/ChartChoiceButtonBar',
    'views/ui/BarChartVisualisation',
    'views/ui/OrdinalCurveChartVisualisation',
    'views/ui/PieChartByAgeVisualisation',
    'views/ui/BoxPlotVisualisation',
    'views/ui/TopThreeDiagnosisVisualisation',
    'helpers/CodeChooser'
],function(
    View,
    CardPane,
    CardElement,
    ChartChoiceButtonBar,
    BarChartVisualisation,
    OrdinalCurveChartVisualisation,
    PieChartByAgeVisualisation,
    BoxPlotVisualisation,
    TopThreeDiagnosisVisualisation,
    CodeChooser
){

    function CodeVisualisationCard() {
        var _this = new View('<div></div>');

        var chartCardPane = new CardPane();
        var chartChoiceButtons = new ChartChoiceButtonBar(chartCardPane);

        var barChartVisualisation = new BarChartVisualisation(800, 400);
        var barChartCard = new CardElement("barChart",barChartVisualisation);
        chartCardPane.addCard(barChartCard);
        chartChoiceButtons.addButton("barChart", "Bar Chart");

        var ordinalCurveVisualisation = new OrdinalCurveChartVisualisation(800, 400);
        var ordinalCurveChartCard = new CardElement("ordinalCurve",ordinalCurveVisualisation);
        chartCardPane.addCard(ordinalCurveChartCard);
        chartChoiceButtons.addButton("ordinalCurve", "Ordinal Curve");

        var pieChartVisualisation = new PieChartByAgeVisualisation();
        var pieChartCard = new CardElement("pieChart", pieChartVisualisation);
        chartCardPane.addCard(pieChartCard);
        chartChoiceButtons.addButton("pieChart","Pie Chart");

        var boxPlotVisualisation = new BoxPlotVisualisation(700, 400);
        var boxPlotCard = new CardElement("boxPlot", boxPlotVisualisation);
        chartCardPane.addCard(boxPlotCard);
        chartChoiceButtons.addButton("boxPlot","BoxPlot");

        var topThreeVisualisation = new TopThreeDiagnosisVisualisation(800, 400);
        var topThreeCard = new CardElement("topThreeTable", topThreeVisualisation);
        chartCardPane.addCard(topThreeCard);
        chartChoiceButtons.addButton("topThreeTable", "Top 3 Diagnosen");

        function updateVisualisations(code, datasets){
            var title = code.code + ": " + code.text_de;

            barChartVisualisation.visualiseData(title, datasets);
            ordinalCurveVisualisation.visualiseData(title, datasets);
            pieChartVisualisation.visualiseData(title, datasets);
            boxPlotVisualisation.visualiseData(title, datasets);
        }

        var codeChooser = new CodeChooser("icd", updateVisualisations);

        _this.initialize = function () {
            _this.empty();
            _this.append(chartChoiceButtons);
            _this.append(chartCardPane);
        };

        _this.on = function (type, code) {
            if (!chartCardPane.parent().length)_this.initialize();
            codeChooser.fetchDatasets(type, code, updateVisualisations);
        };

        return _this;
    }

    return CodeVisualisationCard;

});