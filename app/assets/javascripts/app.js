
define([
    'views/ui/CardElement',
    'views/ui/CardPane',
    'views/abstract/AbstractSwissMap',
    'views/PieChart',
    'views/SeriesChart',
    'views/CardBoardView',
    'views/CardView',
    'views/abstract/AbstractSeriesChart',
    'views/ui/CodeTableView',
    'views/ui/CodeButtonBarView',
    'views/ui/ChartChoiceButtonBar',
    'views/ui/PieChartByAgeVisualisation',
    'views/ui/BarChartVisualisation',
    'views/ui/BoxPlotVisualisation',
    'views/BarChart',
    'views/BoxPlot',
    'views/OrdinalCurveChart',
    'views/ui/OrdinalCurveChartVisualisation',
    'helpers/CodeChooser',
    'views/ui/CatalogChoiceButtonBar',
    'views/ui/TopThreeDiagnosisVisualisation'
], function(CardElement, CardPane, AbstractSwissMap, PieChart, SeriesChart, CardBoardView, CardView, AbstractSeriesChart,
            CodeTableView, CodeButtonBarView, ChartChoiceButtonBar, PieChartByAgeVisualisation,BarChartVisualisation,
            BoxPlotVisualisation, BarChart, BoxPlot, OrdinalCurveChart, OrdinalCurveChartVisualisation, CodeChooser, CatalogChoiceButtonBar, TopThreeDiagnosisVisualisation){

    "use strict";
    function App() {
        var _this = this;

        var catalogChoiceButtons = new CatalogChoiceButtonBar();
        var chartCardPane = new CardPane();
        var chartChoiceButtons = new ChartChoiceButtonBar(chartCardPane);

        _this.initialize = function(){
            _this.addCatalogChoiceButtons();
            $('body').append(chartChoiceButtons);
            _this.visualise();
            $('body').append(chartCardPane);
        };

        _this.addCatalogChoiceButtons = function(){
            catalogChoiceButtons.addButton("ICD", function(){window.alert("Hi! I'm the ICD catalog!")});
            catalogChoiceButtons.addButton("CHOP", function(){window.alert("Hi! I'm the CHOP catalog!")});
            catalogChoiceButtons.addButton("DRG", function(){window.alert("Hi! I'm the DRG catalog!")});
            $('body').append(catalogChoiceButtons);
        };

        
        _this.visualise = function () {
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

            var topThreeVisualisation = new TopThreeDiagnosisVisualisation(800, 500);
            var topThreeCard = new CardElement("topThreeTable", topThreeVisualisation);
            chartCardPane.addCard(topThreeCard);
            chartChoiceButtons.addButton("topThreeTable", "Top Three Diagnosis");

            function updateVisualisations(code, datasets){
                var title = code.code + ": " + code.text_de;

                barChartVisualisation.visualiseData(title, datasets);
                ordinalCurveVisualisation.visualiseData(title, datasets);
                pieChartVisualisation.visualiseData(title, datasets);
                boxPlotVisualisation.visualiseData(title, datasets);
            }

            var codeChooser = new CodeChooser("icd", updateVisualisations);
            codeChooser.appendTo($('body'));

            codeChooser.fetchDatasets("icd", "A045", updateVisualisations);
        };


        //TODO: dummy-method until development of top-3 is done
        _this.displayTopThreeDiagnosis = function(){

        };
        
        _this.initialize();
    }

    return App
});
