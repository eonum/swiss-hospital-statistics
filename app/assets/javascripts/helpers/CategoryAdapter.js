define([
    'helpers/ServiceProvider',
    // define all categories here
    'models/categories/ChopIntervalCategory',
    'models/categories/PercentileCategory'
], function(ServiceProvider) {
    for (var i = 1, length = arguments.length; i < length; i++) {
        var category = arguments[i];
        console.log(category.ID);
        ServiceProvider.categoryBuilder.registerCategory(category.ID, category);
    }
});