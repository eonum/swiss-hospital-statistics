define([
    'views/widgets/TopBar',
    'views/widgets/Tabulator',
    'views/widgets/TabulatorButton',
    'models/TabulatorModel',
    'views/widgets/icd/IcdCodePane',
    'views/widgets/icd-years/IcdYearsPane',
    'views/widgets/chop/ChopCodePane',
    'views/widgets/drg/DrgCodePane',
    'views/widgets/top3/Top3DiagnosesPane'
], function(
    TopBar,
    Tabulator,
    TabulatorButton,
    TabulatorModel,
    IcdCodePane,
    IcdYearsPane,
    ChopCodePane,
    DrgCodePane,
    Top3DiagnosesPane
){

    "use strict";
    function App() {
        var _this = this;

        _this.initialize = function(){
            // we use topbar to have tab buttons there
            var topBar = new TopBar().title('Eonum');

            // first we define tabulator model and script 3 tabs. select first one by default
            var tabulatorModel = new TabulatorModel();
            var tabIcd = tabulatorModel.addTab('ICD').render(function(){return new IcdCodePane().load()}).select();
            var tabYearIcd = tabulatorModel.addTab('ICD pro Jahr').render(function(){return new IcdYearsPane().load()});
            var tabChop = tabulatorModel.addTab('CHOP').render(function(){return new ChopCodePane().load()});
            var tabDrg = tabulatorModel.addTab('DRG').render(function(){return new DrgCodePane().load()});
            var tabTop3 = tabulatorModel.addTab('Top Diagnosen').render(function(){return new Top3DiagnosesPane()});

            // then create corresponding button views and attach tab models
            topBar.addLeftAll(_.map([tabIcd,tabYearIcd,tabChop,tabDrg, tabTop3],
                function(tab){return new TabulatorButton().model(tab)}));

            // and finally add everything to the dom
            $('body').append($('<header></header>')).find('header').append(topBar);
            $('body').append(new Tabulator().styled(function(tab){tab.class('absolute')}).model(tabulatorModel));
        };

        _this.initialize();
    }

    return App
});
