//noinspection BadExpressionStatementJS
({
    baseUrl: '.',
    mainConfigFile: 'config.js',
    name: 'almond',
    include: ['application'],
    insertRequire: ['application'],
    out: '../public/javascripts/application.min.js',
    wrap: true,
    //optimize: "none",
    preserveLicenseComments: false,
    fileExclusionRegExp: /^(r|build|application.min)\.js$/
})