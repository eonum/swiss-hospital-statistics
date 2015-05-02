define([
    'views/widgets/TopBar',
    'views/widgets/Tabulator',
    'views/widgets/TabulatorButton',
    'models/TabulatorModel',
    'views/widgets/icd/IcdCodePane',
    'views/widgets/chop/ChopCodePane',
    'views/widgets/drg/DrgCodePane',
    'views/widgets/top3/Top3DiagnosesPane'
], function(
    TopBar,
    Tabulator,
    TabulatorButton,
    TabulatorModel,
    IcdCodePane,
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

            // first we define tabulator model and script 3 tabs
            var tabulatorModel = new TabulatorModel();
            var tabIcd = tabulatorModel.addTab('ICD').render(function(){return new IcdCodePane().load()}).select();
            var tabChop = tabulatorModel.addTab('CHOP').render(function(){return new ChopCodePane().load()});
            var tabDrg = tabulatorModel.addTab('DRG').render(function(){return new DrgCodePane().load()});
            var tabTop3 = tabulatorModel.addTab('Top Diagnosen').render(function(){return new Top3DiagnosesPane()});

            // then create corresponding button views and attach tab models
            topBar.addLeftAll(_.map([tabIcd,tabChop,tabDrg, tabTop3],
                function(tab){return new TabulatorButton().model(tab)}));

            // and finally add everything to the dom
            $('header').append(topBar);
            $('body').append(new Tabulator().model(tabulatorModel));
        };

        _this.initialize();
    }

    return App
});
