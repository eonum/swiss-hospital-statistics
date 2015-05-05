// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//

// better to make them global for convenience
var _;
var _s;
var $;

requirejs([
    'jquery-adapter',
    'underscore',
    'underscore.string',
    'app',
    'foundation-adapter',
    'Polymorphism'
], function(jquery, underscore, underscoreString, App) {
    $ = jquery;
    _ = underscore;
    _s = underscoreString;

    new App();
});