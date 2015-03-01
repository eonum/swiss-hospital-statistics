/**
 *  Loads and registers all category classes to the builder,
 *  so they could be instantiated by their ID
 */
define(_.map(CATEGORY_CLASSES, function(str){ return CATEGORY_PATH+str }), function() {
    _.each(arguments, function(each){ ServiceProvider.categoryBuilder.register(each.ID, each);});
});