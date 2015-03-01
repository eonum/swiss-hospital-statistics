define([
    'helpers/ObjectBuilder',
    'helpers/JsonParser'
], function(
    ObjectBuilder,
    JsonParser
) {
    function ServiceProvider(){}

    /** @type {ObjectBuilder} */
    ServiceProvider.categoryBuilder = new ObjectBuilder();
    /** @type {ObjectBuilder} */
    ServiceProvider.codeBuilder = new ObjectBuilder();
    /** @type {JsonParser} */
    ServiceProvider.jsonParser = new JsonParser();

    return ServiceProvider;
});