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
            // we use topbar to have tab buttons there
            var topBar = new TopBar().title('Eonum');

            // first we define tabulator model and script 3 tabs
            var tabulatorModel = new TabulatorModel();
            var tabIcd = tabulatorModel.addTab('ICD').render(function(){return new IcdCodePane().load()}).select();
            var tabChop = tabulatorModel.addTab('CHOP').render(function(){return new ChopCodePane().load()});
            var tabDrg = tabulatorModel.addTab('DRG').render(function(){return new DrgCodePane().load()});

            // then create corresponding button views and attach tab models
            topBar.addLeftAll([
                new TabulatorButton().model(tabIcd),
                new TabulatorButton().model(tabChop),
                new TabulatorButton().model(tabDrg)]);

            // and finally add everything to the dom
            $('header').append(topBar);
            $('body').append(new Tabulator().model(tabulatorModel));
        };

        _this.initialize();
    }

    return App
});
