// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//

var CODE_PATH = 'models/codes/';
var CODE_CLASSES = [
    'ChopCode',
    'DrgCode',
    'IcdCode'
];

var CATEGORY_PATH = 'models/categories/';
var CATEGORY_CLASSES = [
    'GeneralIntervalCategory',
    'PercentileCategory'
];

// better to make them global for convenience
var _;
var $;

requirejs([
    'jquery-adapter',
    'app',
    'underscore',
    'helpers/ServiceProvider',
    'i18n',
    'i18n/translations',
    'turbolinks',
    'foundation'], function(jquery, App, underscore){
    $ = jquery;
    _ = underscore;
    new App();
});