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
    'IcdCode',
    'AgeCode',
    'KeCode'
];

var CATEGORY_PATH = 'models/categories/';
var CATEGORY_CLASSES = [
    'GeneralIntervalCategory',
    'PercentileCategory',
    'SexCategory',
    'ValueIntervalCategory',
    'KeKantonCategory',
    'KeKantonStatisticCategory',
    'KeRegionCategory',
    'KeRegionStatisticCategory'
];

// better to make them global for convenience
var _;
var $;
var ServiceProvider;

requirejs([
    'jquery-adapter',
    'underscore',
    'helpers/ServiceProvider',
    'i18n',
    'i18n/translations',
    'turbolinks',
    'foundation',
    'Polymorphism'
], function(jquery, underscore, _serviceProvider) {
    $ = jquery;
    _ = underscore;
    ServiceProvider = _serviceProvider;
    requirejs(['app'], function (App) {
        new App();
    })
});