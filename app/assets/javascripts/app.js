define([
    'views/widgets/TopBar',
    'views/widgets/Tabulator',
    'views/widgets/TabulatorButton',
    'models/TabulatorModel',
    'views/widgets/IcdCodePane',
    'views/widgets/ChopCodePane',
    'views/widgets/DrgCodePane'
], function(
    TopBar,
    Tabulator,
    TabulatorButton,
    TabulatorModel,
    IcdCodePane,
    ChopCodePane,
    DrgCodePane
){

    "use strict";
    function App() {
        var _this = this;

        _this.initialize = function(){
            var topBar = new TopBar();
            topBar.title('Eonum');
            var icdButton = new TabulatorButton();
            var chopButton = new TabulatorButton();
            var drgButton = new TabulatorButton();

            $('header').append(topBar);

            var tabulator = new Tabulator();
            var tabulatorModel = new TabulatorModel();
            $('body').append(tabulator);
            tabulator.model(tabulatorModel);
            topBar.addLeft(icdButton);
            topBar.addLeft(chopButton);
            topBar.addLeft(drgButton);

            var tabIcd = tabulatorModel.addTab('ICD');
            tabIcd.render(function(){return new IcdCodePane().load()});
            icdButton.model(tabIcd);
            var tabChop = tabulatorModel.addTab('CHOP');
            tabChop.render(function(){return new ChopCodePane().load()});
            chopButton.model(tabChop);
            var tabDrg = tabulatorModel.addTab('DRG');
            tabDrg.render(function(){return new DrgCodePane().load()});
            drgButton.model(tabDrg);

            tabulatorModel.selectTab(tabIcd);
        };


        //TODO: dummy-method until development of top-3 is done
        _this.displayTopThreeDiagnosis = function(){

        };
        
        _this.initialize();
    }

    return App
});
