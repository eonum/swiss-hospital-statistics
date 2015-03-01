define([
    'models/abstract/SexCategory',
    'helpers/CategoryAdapter',
    'helpers/CodeAdapter'
], function(){

   "use strict";
    function App() {
        var json = '{"codes":{"chop":{"code":"001200","description":"Inhalation von Stickstoffmonoxyd, Dauer der Behandlung bis unter 48 Stunden","years":[{"categories":[{"interval":[{"categories":[{"percentile":[{"amount":14,"percentile":5},{"amount":14,"percentile":10},{"amount":14,"percentile":25},{"amount":14,"percentile":50},{"amount":14,"percentile":75},{"amount":14,"percentile":90},{"amount":14,"percentile":95}]}],"dad":14,"interval":{"from":0,"to":14},"max":14,"min":14,"sa":0}]}],"year":"2013"}]}}}';

        console.log(json);
        var codes = ServiceProvider.jsonParser.parse(json);

        _.each(codes, function(each){
            console.log(each.toString())});
    }

    return App
});
