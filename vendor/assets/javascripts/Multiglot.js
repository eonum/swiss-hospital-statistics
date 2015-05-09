define([
    'underscore',
    'jquery',
    'jquery.cookie'
], function(
    _,
    $
){

    function JQueryDataProcessor() {
        var _this = this;

        _this.set = function(html, name, value) {
            html.data(name, value);
        };

        _this.get = function(html, name) {
            return html.data(name);
        };

        _this.type = function () {
            return 'jquery';
        };

        _this.dom = function(element) {
            return element[0];
        };
    }

    function D3DataProcessor() {
        var _this = this;

        _this.set = function(html, name, value) {
            var validValue = value;
            if (_.isFunction(value))
                validValue = value.toString();
            else if(_.isObject(value))
                validValue = JSON.stringify(value);
            html.attr('data-'+name, validValue);
        };

        _this.get = function(html, name) {
            return html.attr('data-'+name);
        };

        _this.type = function () {
            return 'd3';
        };

        _this.dom = function(element) {
            return element[0][0];
        };
    }

    function Multiglot() {

        var _this = this;
        var dataProcessor = new JQueryDataProcessor();

        _this.d3 = function () {
            dataProcessor = new D3DataProcessor();
            return _this;
        };

        _this.jquery = function () {
            dataProcessor = new JQueryDataProcessor();
            return _this;
        };

        _this.on = function(html, id) {
            var builder = new Builder(_this, html);
            if (!_.isUndefined(id)) builder.id(id);
            return builder;
        };

        _this.applyOn = function(html) {
            var type = html.attr('data-'+Multiglot.typeID);
            eval('_this.'+type+'();');

            new ProcessorBuilder(html).build().translate();
        };

        _this.invalidate = function() {
            var elements = $('*').filter(function(){return dataProcessor.get($(this),Multiglot.marker) === true});
            elements.each(function() {
                _this.applyOn($(this));
            });
            return elements.length;
        };

        function Builder(multiglot, html) {
            var _this = this;
            var element = html;
            dataProcessor.set(element, Multiglot.marker, true);
            dataProcessor.dom(element).setAttribute('data-'+Multiglot.typeID, dataProcessor.type().toString());

            _this.id = function(id) {
                if (_.isUndefined(id)) return;
                dataProcessor.set(element, Multiglot.dataID, id);
                return _this;
            };

            _this.attr = function(name) {
                dataProcessor.set(element, Multiglot.attribute, name);
                return _this;
            };

            _this.set = function(func) {
                dataProcessor.set(element, Multiglot.setID, func);
                return _this;
            };

            _this.custom = function(translation) {
                dataProcessor.set(element, Multiglot.customID, translation);
                return _this;
            };

            _this.apply = function() {
                multiglot.applyOn(html);
                return html;
            };
        }

        function Processor(_html) {
            var _this = this;
            var html = _html;

            var applyLogic = function(html, text) { html.html(text) };
            var idLogic = function(html) { return dataProcessor.get(html,Multiglot.dataID) };
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
            var html = _html;

            var processor = new Processor(html);

            _this.hasAttribute = function () {
                return !_.isUndefined(_this.attribute());
            };

            _this.attribute = function() {
                return dataProcessor.get(html, Multiglot.attribute);
            };

            _this.useAttribute = function () {
                var attr = _this.attribute();
                processor.applyLogic(function(html, text) {
                    html.attr(attr, text);
                });
            };

            _this.hasSet = function () {
                return !_.isUndefined(_this.set());
            };

            _this.set = function () {
                return dataProcessor.get(html, Multiglot.setID);
            };

            _this.useSet = function () {
                var setLogic = _this.set();
                if (_.isString(setLogic))
                    setLogic = eval("["+setLogic+"][0]");
                processor.applyLogic(setLogic);
            };

            _this.hasCustom = function () {
                return !_.isUndefined(_this.custom());
            };

            _this.custom = function () {
                return dataProcessor.get(html, Multiglot.customID);
            };

            _this.useCustom = function () {
                processor.translationsLogic(function(){
                    var custom = _this.custom();
                    if (_this.isJSON(custom))
                        custom = $.parseJSON(custom);
                    return custom;
                });
            };

            _this.build = function () {
                if (_this.hasAttribute())
                    _this.useAttribute();

                if (_this.hasCustom())
                    _this.useCustom();

                if (_this.hasSet())
                    _this.useSet();

                return processor;
            };

            _this.isJSON = function(str) {
                if (!_.isString(str)) return false;
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            }
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
    Multiglot.setID = Multiglot.dataID+'-set';
    Multiglot.typeID = Multiglot.dataID+'-type';

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