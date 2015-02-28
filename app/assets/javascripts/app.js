define([
    'models/abstract/SexCategory',
    'helpers/ServiceProvider',
    'Polymorphism',
    'helpers/CategoryAdapter',
    'helpers/CodeAdapter'
], function(
    SexCategory,
    ServiceProvider){

   "use strict";
    function App() {
        console.log(ServiceProvider);
        new SexCategory();
    }

    return App
});
