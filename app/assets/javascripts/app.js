define([
    'models/abstract/SexCategory',
    'helpers/ServiceProvider',
    'jquery',
    'Polymorphism',
    'helpers/CategoryAdapter'
], function(
    SexCategory,
    ServiceProvider,
    $){

   "use strict";
    function App() {
        console.log(ServiceProvider);
        new SexCategory();
    }

    return App
});
