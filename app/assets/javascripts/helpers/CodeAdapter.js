/**
 *  Loads and registers all code classes to the builder,
 *  so they could be instantiated by their ID
 */
define(_.map(CODE_CLASSES, function(str){ return CODE_PATH+str }), function() {
    _.each(arguments, function(each){ServiceProvider.codeBuilder.register(each.ID, each);});
});