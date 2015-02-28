define([
    'helpers/ObjectBuilder'
], function(
    ObjectBuilder
) {
    function ServiceProvider(){}

    /**
     * @type {ObjectBuilder}
     */
    ServiceProvider.categoryBuilder = new ObjectBuilder();
    ServiceProvider.codeBuilder = new ObjectBuilder();

    return ServiceProvider;
});