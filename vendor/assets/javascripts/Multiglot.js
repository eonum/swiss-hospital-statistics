define([
    'underscore',
    'jquery',
    'jquery.cookie'
], function(
    _,
    $
){

    function Multiglot() {

        var _this = this;

        _this.on = function(html, id) {
            var builder = new Builder(_this, html);
            if (!_.isUndefined(id)) builder.id(id);
            return builder;
        };

        _this.applyOn = function(html) {
            new ProcessorBuilder(html).build().translate();
        };

        _this.invalidate = function() {
            var elements = $('*').filter(function(){return $(this).data(Multiglot.marker) === true});
            elements.each(function() {
                _this.applyOn($(this));
            });
            return elements.length;
        };

        function Builder(multiglot, html) {
            var _this = this;
            var element = $(html);
            element.data(Multiglot.marker, true);

            _this.id = function(id) {
                if (_.isUndefined(id)) return;
                element.data(Multiglot.dataID, id);
                return _this;
            };

            _this.attr = function(name) {
                element.data(Multiglot.attribute, name);
                return _this;
            };

            _this.apply = function() {
                multiglot.applyOn(html);
                return html;
            };

            _this.custom = function(translation) {
                element.data(Multiglot.customID, translation);
                return _this;
            };
        }

        function Processor(_html) {
            var _this = this;
            var html = $(_html);

            var applyLogic = function(html, text) { html.html(text) };
            var idLogic = function(html) { return html.data(Multiglot.dataID) };
            var translationsLogic = function(html) { return Multiglot.translations[_this.id(html)] };
            var textLogic = function(translations) {
                if (_.isString(translations)) return translations;
                return translations[Multiglot.language]
            };

            _this.id = function(html) {
                return idLogic(html);
            };

            _this.translations = function(html) {
                return translationsLogic(html);
            };

            _this.apply = function(html, text) {
                applyLogic(html, text);
            };

            _this.text = function(translations) {
                return textLogic(translations);
            };

            _this.translate = function() {
                var translations = _this.translations(_this.html());
                if (_.isUndefined(translations)) return;
                _this.apply(_this.html(), _this.text(translations));
            };

            _this.applyLogic = function(func) {
                applyLogic = func;
            };

            _this.translationsLogic = function(func) {
                translationsLogic = func;
            };

            _this.html = function () {
                return html;
            };
        }

        function ProcessorBuilder(_html) {
            var _this = this;
            var html = $(_html);

            var processor = new Processor(html);

            _this.hasAttribute = function () {
                return !_.isUndefined(_this.attribute());
            };

            _this.attribute = function() {
                return html.data(Multiglot.attribute);
            };

            _this.useAttribute = function () {
                var attr = _this.attribute();
                processor.applyLogic(function(html, text) {
                    html.attr(attr, text);
                });
            };

            _this.hasCustom = function () {
                return !_.isUndefined(_this.custom());
            };

            _this.custom = function () {
                return html.data(Multiglot.customID);
            };

            _this.useCustom = function () {
                processor.translationsLogic(function(html){
                    return $(html).data(Multiglot.customID);
                });
            };

            _this.build = function () {
                if (_this.hasAttribute())
                    _this.useAttribute();

                if (_this.hasCustom())
                    _this.useCustom();

                return processor;
            };
        }

        return _this;
    }

    Multiglot.translations = {};
    Multiglot.DE = 'de';
    Multiglot.EN = 'en';
    Multiglot.FR = 'fr';
    Multiglot.IT = 'it';
    Multiglot.cookieID = 'multiglot-language';
    Multiglot.language = $.cookie(Multiglot.cookieID) || 'de';
    Multiglot.dataID = 'multiglot';
    Multiglot.marker = Multiglot.dataID+'-enabled';
    Multiglot.customID = Multiglot.dataID+'-custom';
    Multiglot.attribute = Multiglot.dataID+'-attribute';

    Multiglot.setLanguage = function(lang) {
        $.cookie(Multiglot.cookieID, lang);
        Multiglot.language = lang;
        return new Multiglot().invalidate();
    };

    Multiglot.custom = function(html, translations) {
        return new Multiglot().on(html).custom(translations).apply();
    };

    return Multiglot;
});