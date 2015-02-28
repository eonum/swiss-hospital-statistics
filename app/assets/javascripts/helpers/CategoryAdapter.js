define([
    'helpers/ServiceProvider'].concat(
    _.map(CATEGORY_CLASSES, function(str){ return CATEGORY_PATH+str })),
    function(ServiceProvider) {

    for (var i = 1, length = arguments.length; i < length; i++) {
        var category = arguments[i];
        console.log(category.ID);
        ServiceProvider.categoryBuilder.register(category.ID, category);
    }
});