define(['helpers/CategoryBuilder'], function(CategoryBuilder) {
    function ServiceProvider(){}

    /**
     * @type {CategoryBuilder}
     */
    ServiceProvider.categoryBuilder = new CategoryBuilder();

    return ServiceProvider;
});