define([
    'helpers/ServiceProvider'].concat(
    _.map(CODE_CLASSES, function(str){ return CODE_PATH+str })),
    function(ServiceProvider) {

    for (var i = 1, length = arguments.length; i < length; i++) {
        var code = arguments[i];
        console.log(code.ID);
        ServiceProvider.codeBuilder.register(code.ID, code);
    }
});