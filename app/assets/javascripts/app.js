define([
    'models/categories/SexCategory',
    'helpers/CategoryAdapter',
    'helpers/CodeAdapter'
], function(){

   "use strict";
    function App() {
        console.log('------------ C H O P ---------------');
        console.log('Received from server:');
        var chop = '{"codes":{"chop":{"code":"001200","description":"Inhalation von Stickstoffmonoxyd, Dauer der Behandlung bis unter 48 Stunden","years":[{"categories":[{"interval":[{"categories":[{"percentile":[{"amount":14,"percentile":5},{"amount":14,"percentile":10},{"amount":14,"percentile":25},{"amount":14,"percentile":50},{"amount":14,"percentile":75},{"amount":14,"percentile":90},{"amount":14,"percentile":95}]}],"n":1,"dad":14,"interval":{"from":0,"to":14},"max":14,"min":14,"sa":0}]}],"year":"2013"}]}}}';
        console.log(chop);
        var shopCodes = ServiceProvider.jsonParser.parse(chop);
        console.log('Serialized in Code Models:');
        _.each(shopCodes, function(each){
            console.log(each.toString())});

        console.log();

        console.log('------------ D R G ---------------');
        console.log('Received from server:');
        var drg = '{"codes":{"drg":{"code":"901A","description":"Ausgedehnte OR-Prozedur ohne Bezug zur Hauptdiagnose mit komplizierenden Prozeduren oder Strahlentherapie","years":[{"categories":[{"interval":[{"categories":[{"percentile":[{"amount":5,"percentile":5},{"amount":5.4,"percentile":10},{"amount":12,"percentile":25},{"amount":24,"percentile":50},{"amount":"35.5.0","percentile":75},{"amount":"44.8.0","percentile":90},{"amount":48.6,"percentile":95}]}],"n":23,"dad":26,"interval":{"from":70},"max":85,"min":1,"sa":19}]}],"year":"2013"}]}}}';
        console.log(drg);
        console.log('Serialized in Code Models:');
        var drgCodes = ServiceProvider.jsonParser.parse(drg);
        _.each(drgCodes, function(each) {
            console.log(each.toString())});

        console.log('------------ I C D ---------------');
        console.log('Received from server:');
        var icd = '{"codes":{"icd":{"code":"A010","description":"Typhus abdominalis","years":[{"categories":[{"interval":[{"categories":[{"percentile":[{"amount":2,"percentile":5},{"amount":2,"percentile":10},{"amount":6,"percentile":25},{"amount":6.5,"percentile":50},{"amount":7,"percentile":75},{"amount":9,"percentile":90},{"amount":9,"percentile":95}]}],"n":6,"dad":6.2,"interval":{"from":0,"to":14},"max":9,"min":2,"sa":2.32}]}],"year":"2013"}]}}}';
        console.log(icd);
        console.log('Serialized in Code Models:');
        var icdCodes = ServiceProvider.jsonParser.parse(icd);
        _.each(icdCodes, function(each){
            console.log(each.toString())});

        console.log('------------ A G E ---------------');
        console.log('Received from server:');
        var age = '{"codes":{"age":{"code":"010","description":"Brucellose","years":[{"categories":[{"sex":[{"categories":[{"valueInterval":[{"interval":{"from":20,"to":24},"n":1},{"interval":{"from":30,"to":34},"n":1},{"interval":{"from":35,"to":39},"n":1}]}],"sex":"f"},{"categories":[{"valueInterval":[{"interval":{"from":25,"to":29},"n":2},{"interval":{"from":80,"to":84},"n":1}]}],"sex":"m"}]}],"year":"2013"}]}}}';
        console.log(age);
        console.log('Serialized in Code Models:');
        var ageCodes = ServiceProvider.jsonParser.parse(age);
        _.each(ageCodes, function(each){
            console.log(each.toString())});
    }

    return App
});